# Connect the Contact form with Google Apps Script

About 10 minutes, once. Free with a Google account.

1. In Google Drive, create a new **Google Sheet** called "hōlus. website enquiries".
2. In that sheet: **Extensions → Apps Script**.
3. Delete what's there, paste everything from `Code.gs`, and click **Save**.
4. Check `SEND_TO` at the top is the address you want enquiries sent to.
5. Click **Deploy → New deployment**. Choose type **Web app**.
   - Description: `Website contact form`
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**, then **Authorize access** and allow it (Google will warn it's an unverified app because you wrote it; choose Advanced → Go to project).
7. Copy the **Web app URL**. It looks like `https://script.google.com/macros/s/…/exec`.
8. Paste it into `brand-config.js` as `appsScriptUrl: 'https://script.google.com/macros/s/…/exec'` (or send it to Claude to do).

That's it. The form appears on the Contact page and each enquiry arrives by email (reply goes straight to the person) and is saved in the sheet.

To check it's live, open the Web app URL in a browser: it should say "hōlus. contact form is running."

**If you change the script later:** Deploy → Manage deployments → edit (pencil) → Version: New version → Deploy. The URL stays the same.
