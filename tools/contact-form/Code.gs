/**
 * hōlus. website contact form — Google Apps Script web app.
 *
 * Receives the Contact page form, emails it to you (reply goes straight to the
 * person), and keeps a copy in a Google Sheet. See SETUP.md for the steps.
 *
 * Only general enquiries: the form asks people not to include health information.
 */

// ---- Settings: change these two if needed ----
var SEND_TO = 'hello@holus.ca';          // where enquiries are emailed
var SHEET_NAME = 'Website enquiries';     // tab name in the linked Google Sheet (created if missing)

var TOPICS = {
  'intro-chat': 'Free 15-minute introductory chat',
  'initial-consultation': 'Initial consultation',
  'follow-up': 'Follow-up for an existing client',
  'package': 'Personalized nutrition package',
  'testing': 'Nutrition testing question',
  'general': 'General question'
};

function doPost(e) {
  try {
    var p = (e && e.parameter) || {};

    // Spam trap: real people never fill the hidden "_gotcha" field.
    if (p._gotcha) return reply_(true);

    var name = clean_(p.first_name, 60);
    var email = clean_(p.email, 120);
    var topic = TOPICS[p.topic] ? p.topic : '';
    var message = clean_(p.message, 1000);

    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !topic || message.length < 20 || p.consent !== 'yes') {
      return reply_(false, 'Please check the form and try again.');
    }

    // Light rate limit: the same email address can send at most 3 enquiries an hour.
    var cache = CacheService.getScriptCache();
    var key = 'n_' + email.toLowerCase();
    var count = Number(cache.get(key) || 0);
    if (count >= 3) return reply_(true); // already received several; don't email again
    cache.put(key, String(count + 1), 3600);

    MailApp.sendEmail({
      to: SEND_TO,
      replyTo: email,
      subject: 'Website enquiry: ' + TOPICS[topic] + ' (' + name + ')',
      body: 'Name: ' + name + '\nEmail: ' + email + '\nTopic: ' + TOPICS[topic] + '\n\n' + message +
            '\n\n—\nSent from the contact form on holus.ca. Reply to this email to answer ' + name + ' directly.'
    });

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) {
      var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
      if (sheet.getLastRow() === 0) sheet.appendRow(['Received', 'First name', 'Email', 'Topic', 'Message']);
      sheet.appendRow([new Date(), name, email, TOPICS[topic], message]);
    }

    return reply_(true);
  } catch (err) {
    console.error(err);
    return reply_(false, 'Something went wrong. Please email hello@holus.ca.');
  }
}

// Visiting the web app URL in a browser shows this, so you can check it is live.
function doGet() {
  return ContentService.createTextOutput('hōlus. contact form is running.');
}

function clean_(v, max) {
  return String(v || '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
}

function reply_(ok, error) {
  return ContentService.createTextOutput(JSON.stringify(ok ? { ok: true } : { ok: false, error: error }))
    .setMimeType(ContentService.MimeType.JSON);
}
