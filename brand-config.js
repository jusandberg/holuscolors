(() => {
  const SOURCE_BRAND_NAME = 'Hōlus Nutrition Counselling';

  const BRAND_CONFIG = Object.freeze({
    name: 'hōlus.',
    formalName: 'Hōlus Nutrition Counselling',
    descriptor: 'Nutrition Counselling',
    tagline: 'Nutrition in context.',
    digestName: 'Hōlus Digest',
    favicon: 'favicon.svg'
  });

  // Booking destinations. Add a Jane URL later if bookings move there. Until then,
  // booking links use the guided contact page and preselect the relevant enquiry.
  const BOOKING = Object.freeze({
    email: 'hello@holus.ca',
    consultationUrl: null,
    introChatUrl: null,
    contactPageUrl: '/contact/'
  });

  // Formspree setup: add only the public form ID (the part after /f/) once the
  // Hōlus form is created. Never put a password or private API key here.
  const CONTACT = Object.freeze({
    formspreeId: null,
    replyEmail: 'hello@holus.ca'
  });

  const projectPath = '/holus-nutrition';
  const isProjectPage = () => window.location.hostname.endsWith('.github.io')
    && window.location.pathname.startsWith(`${projectPath}/`);

  const sitePath = (path) => (function(p){if(!p||p[0]!=='/'||p.startsWith('//'))return p;var m=p.match(/^([^?#]*)(.*)$/),b=(window.__HB||'')+m[1].slice(1);if(b===''||/\/$/.test(b))b+='index.html';return b+m[2];})(path);

  const topicFromSubject = (subject) => {
    const value = subject.toLowerCase();
    if (value.includes('15-minute')) return 'intro-chat';
    if (value.includes('follow-up')) return 'follow-up';
    if (value.includes('package')) return 'package';
    if (value.includes('test')) return 'testing';
    return 'initial-consultation';
  };

  const contactHref = (topic) => {
    const params = topic ? `?topic=${encodeURIComponent(topic)}` : '';
    return sitePath(`${BOOKING.contactPageUrl}${params}`);
  };

  const applyBooking = (root = document) => {
    const prefix = `mailto:${BOOKING.email}?subject=`;
    root.querySelectorAll(`a[href^="${prefix}"]:not([data-direct-email])`).forEach((link) => {
      const subject = decodeURIComponent(link.getAttribute('href').slice(prefix.length)).toLowerCase();
      const isChat = subject.includes('15-minute');
      const url = isChat
        ? (BOOKING.introChatUrl || BOOKING.consultationUrl || contactHref('intro-chat'))
        : (BOOKING.consultationUrl || contactHref(topicFromSubject(subject)));
      link.setAttribute('href', url);
      if (/^https?:\/\//i.test(url) && !url.startsWith(window.location.origin)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
      } else {
        link.removeAttribute('target');
        link.removeAttribute('rel');
      }
    });

    root.querySelectorAll(`.footer-links a[href="mailto:${BOOKING.email}"]:not([data-direct-email])`).forEach((link) => {
      link.setAttribute('href', contactHref());
    });
  };

  const wordmarkMarkup = (includeDescriptor = true) => `
    <span class="brand-lockup">
      <span class="brand-wordmark" aria-label="${BRAND_CONFIG.name}">${BRAND_CONFIG.name}</span>
      ${includeDescriptor ? `<span class="brand-descriptor">${BRAND_CONFIG.descriptor}</span>` : ''}
    </span>`;

  const applyProjectPageLinks = (root = document) => {
    if (!isProjectPage()) return;

    root.querySelectorAll('a[href^="/"]').forEach((link) => {
      const href = link.getAttribute('href');
      if (href.startsWith(`${projectPath}/`)) return;
      link.setAttribute('href', `${projectPath}${href}`);
    });
  };

  const applyBranding = (root = document) => {
    root.querySelectorAll('.brand').forEach((brand) => {
      brand.setAttribute('aria-label', `${BRAND_CONFIG.name} ${BRAND_CONFIG.descriptor} home`);
      brand.innerHTML = wordmarkMarkup(true);
    });

    root.querySelectorAll('[data-brand-wordmark]').forEach((element) => {
      element.innerHTML = wordmarkMarkup(element.getAttribute('data-brand-wordmark') !== 'name-only');
    });

    if (root.title) root.title = root.title.replaceAll(SOURCE_BRAND_NAME, BRAND_CONFIG.name);
    root.querySelectorAll('meta[content], [aria-label]').forEach((element) => {
      const attribute = element.hasAttribute('content') ? 'content' : 'aria-label';
      element.setAttribute(attribute, element.getAttribute(attribute).replaceAll(SOURCE_BRAND_NAME, BRAND_CONFIG.formalName));
    });

    applyProjectPageLinks(root);
    applyBooking(root);
  };

  window.BRAND_CONFIG = BRAND_CONFIG;
  window.BOOKING = BOOKING;
  window.CONTACT = CONTACT;
  window.applyBooking = applyBooking;
  window.brandWordmarkMarkup = wordmarkMarkup;
  window.applyBranding = applyBranding;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyBranding(document), { once: true });
  } else {
    applyBranding(document);
  }
})();
