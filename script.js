const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
});

// Small home icon at the start of the menu (not shown on the homepage itself)
(function () {
  if (!navigation || navigation.querySelector('.nav-home') || document.querySelector('#home.hero')) return;
  const home = document.createElement('a');
  home.className = 'nav-home';
  home.href = document.querySelector('.brand')?.getAttribute('href') || '/';
  home.setAttribute('aria-label', 'Home');
  home.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/></svg><span class="nav-home-label">Home</span>';
  navigation.prepend(home);
})();

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  });
});

// Phones: keep a small Book button in the header so booking is one tap away while scrolling
(function () {
  const shell = document.querySelector('.nav-shell');
  const book = navigation?.querySelector('.button');
  if (!shell || !book || shell.querySelector('.header-book')) return;
  const quick = book.cloneNode(false);
  quick.className = 'button button-small header-book';
  quick.textContent = 'Book';
  quick.setAttribute('aria-label', book.textContent.trim() || 'Book a consultation');
  shell.insertBefore(quick, menuButton);
})();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const whoTiles = [...document.querySelectorAll('.who-tile')];
const whoPanel = document.querySelector('.who-panel');

whoTiles.forEach((tile) => {
  tile.addEventListener('click', () => {
    whoTiles.forEach((item) => item.setAttribute('aria-selected', String(item === tile)));
    if (!whoPanel) return;
    const icon = tile.querySelector('svg');
    const panelIcon = whoPanel.querySelector('.who-panel-icon');
    if (icon && panelIcon) panelIcon.innerHTML = icon.outerHTML;
    whoPanel.querySelector('h3').textContent = tile.dataset.title;
    whoPanel.querySelector('p').textContent = tile.dataset.description;
  });
});

// Floating food imagery. To remove: delete this block and the matching block at the end of styles.css.
// Each float peeks in from the left (l) or right (r) edge of the screen; sides alternate down the page.
// [section, image, desktop side, desktop top, desktop size px, phone side, phone top, phone size px, tilt deg]
(function () {
  const FLOATS = {
    home: [['#home', 'strawberry', 'r', '1rem', 100, 'r', '8rem', 64, -14], ['#method', 'berries', 'l', 'calc(100% - 9rem)', 92, 'r', '1.4rem', 56, 0], ['#contact', 'grapes-light', 'r', '3rem', 120, 'r', '1rem', 66, 12], ['#contact', 'mint-light', 'l', '52%', 110, 'l', '88%', 52, -18]],
    'nutritional-counselling': [['.page-hero', 'cherries', 'r', '3rem', 96, 'r', '6.4rem', 58, -8], ['.services', 'pineapple', 'r', '2.5rem', 84, 'r', '1.6rem', 50, 12], ['.expect', 'lemon', 'l', 'calc(100% - 7rem)', 84, 'l', '1.6rem', 50, -12], ['.expect', 'carrot', 'r', '4rem', 104, 'r', '2rem', 60, -16]],
    faq: [['#faq', 'fig', 'r', '2rem', 96, 'r', '1.6rem', 60, 10]],
    about: [['.ab-hero', 'cherries', 'r', '4rem', 92, 'r', '9rem', 58, -10], ['.ab-quote', 'lemon', 'l', 'calc(100% - 8rem)', 88, 'r', '2.4rem', 54, 20]],
    'nutrition-behaviour-change': [['.behaviour-relationship', 'watermelon', 'r', '3rem', 110, 'r', '1rem', 64, -14], ['.behaviour-factors', 'fig', 'l', 'calc(100% - 10rem)', 100, 'r', '1.6rem', 58, -14]],
    digest: [['.next-step', 'carrot', 'r', '.5rem', 80, 'r', '0rem', 50, 0]],
  };

  const script = document.currentScript;
  const assetBase = new URL('assets/', script ? script.src : location.href);
  const parts = location.pathname.split('/').filter(Boolean);
  const last = parts[parts.length - 1] || '';
  const _key0 = /home\.html$/.test(last) || parts.length <= 1 && !document.querySelector('.page-hero') ? 'home' : last.replace(/\.html$/, '');
  const _segs = parts.filter(x => x !== 'index.html'); const key = (document.getElementById('home') && !document.querySelector('.page-hero')) ? 'home' : (_segs[_segs.length - 1] || '').replace(/\.html$/, '');
  const list = FLOATS[key];
  if (!list) return;
  function place() {
    list.forEach(([selector, image, side, top, size, pside, ptop, phone, tilt], n) => {
      const host = document.querySelector(selector);
      if (!host || host.querySelector('.hf[data-n="' + n + '"]')) return;
      host.classList.add('hf-host');
      const img = document.createElement('img');
      img.className = 'hf hf-' + side + ' hfm-' + pside;
      img.dataset.n = n;
      img.src = new URL('float-' + image + '.svg', assetBase).href;
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      img.decoding = 'async';
      img.style.cssText = `--t:${top};--tm:${ptop};--w:${size}px;--wm:${phone}px;--r:${tilt}deg`;
      host.appendChild(img);
    });
  }
  place();
  window.addEventListener('load', () => { setTimeout(place, 50); setTimeout(place, 1200); });
})();

// Venn diagram: play the entrance when it scrolls into view.
window.holusAnimateVenn = (root = document) => {
  const venn = root.querySelector('.venn');
  if (!venn || venn.classList.contains('venn-anim')) return;
  const view = root.defaultView || window;
  if (!('IntersectionObserver' in view)) return;
  venn.classList.add('venn-anim');
  const io = new view.IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) { venn.classList.add('venn-in'); io.disconnect(); }
  }, { threshold: 0.35 });
  io.observe(venn);
};
window.holusAnimateVenn(document);

// Homepage "how it works" network: animate once it scrolls into view.
(function () {
  const network = document.querySelector('.holus-network-visual');
  if (!network) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { network.classList.add('is-visible'); return; }
  const io = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) return; network.classList.add('is-visible'); io.disconnect(); }, { threshold: .3 });
  io.observe(network);
})();

// Guided general-enquiry form. The form remains safely hidden until a valid
// Formspree ID is configured in brand-config.js. Local preview mode is visual
// only and never transmits what is typed.
(function () {
  const form = document.querySelector('[data-enquiry-form]');
  if (!form) return;

  const fallback = document.querySelector('[data-form-fallback]');
  const success = document.querySelector('[data-form-success]');
  const status = form.querySelector('[data-form-status]');
  const submit = form.querySelector('button[type="submit"]');
  const submitLabel = form.querySelector('[data-submit-label]');
  const message = form.querySelector('textarea[name="message"]');
  const counter = form.querySelector('[data-message-count]');
  const topic = form.querySelector('select[name="topic"]');
  const formId = String(window.CONTACT?.formspreeId || '').trim();
  const isConfigured = /^[a-z0-9_-]{6,}$/i.test(formId);
  const isLocal = ['127.0.0.1', 'localhost'].includes(window.location.hostname);
  const isPreview = isLocal && new URLSearchParams(window.location.search).get('preview') === 'form';

  if (!isConfigured && !isPreview) return;

  fallback?.setAttribute('hidden', '');
  form.removeAttribute('hidden');
  if (isConfigured) form.action = `https://formspree.io/f/${formId}`;

  const allowedTopics = new Set([...topic.options].map((option) => option.value).filter(Boolean));
  const requestedTopic = new URLSearchParams(window.location.search).get('topic');
  if (allowedTopics.has(requestedTopic)) topic.value = requestedTopic;

  const updateCount = () => {
    if (counter && message) counter.textContent = String(message.value.length);
  };
  message?.addEventListener('input', updateCount);
  updateCount();

  if (isPreview && status) {
    status.textContent = 'Local preview: the form is active for testing, but nothing will be sent.';
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    if (submitLabel) submitLabel.textContent = 'Sending…';
    if (status) status.textContent = isPreview ? 'Testing the form…' : 'Sending your enquiry…';

    if (isPreview) {
      window.setTimeout(() => {
        form.hidden = true;
        success.hidden = false;
        success.querySelector('h2').textContent = 'The form is working.';
        success.querySelector('p:not(.eyebrow)').textContent = 'This was a local preview. No message or personal information was sent.';
        success.focus();
      }, 450);
      return;
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error(`Form submission failed with ${response.status}`);

      form.reset();
      updateCount();
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (error) {
      submit.disabled = false;
      form.removeAttribute('aria-busy');
      if (submitLabel) submitLabel.textContent = 'Send enquiry';
      if (status) status.textContent = 'That didn’t send. Your message is still here—please try again or email hello@holus.ca.';
      console.error(error);
    }
  });
})();

// Stable deep links for search results without duplicating page markup.
(function () {
  const services = document.querySelector('.services');
  if (services) {
    services.id ||= 'appointments-pricing';
    const cards = services.querySelectorAll('.price-card');
    ['initial-consultation', 'follow-up', 'personalized-package', 'intro-chat'].forEach((id, index) => {
      if (cards[index]) cards[index].id ||= id;
    });
  }
  const testing = document.querySelector('.lab-tests');
  if (testing) testing.id ||= 'testing';
  const testIds = ['gi-map', 'food-sensitivity', 'htma', 'nutrigenomics', 'dutch', 'histamine-dao-zonulin'];
  const desktopTests = [...document.querySelectorAll('.lab-cards .lab-card')];
  const mobileTests = [...document.querySelectorAll('.lab-acc .lab-item')];
  const phoneTests = window.matchMedia('(max-width: 760px)');

  const assignTestAnchors = () => {
    [...desktopTests, ...mobileTests].forEach((item) => item.removeAttribute('id'));
    const targets = phoneTests.matches ? mobileTests : desktopTests;
    testIds.forEach((id, index) => {
      if (targets[index]) targets[index].id = id;
    });
  };
  assignTestAnchors();

  const revealHashTarget = () => {
    if (!window.location.hash) return;
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (!target) return;
    if (target.classList.contains('nutri-card')) {
      const nutrientId = target.dataset.id;
      document.querySelectorAll('.nutri-card').forEach((card) => { card.hidden = card !== target; });
      const nutrientButton = document.querySelector(`.nutri-stickers button[data-id="${CSS.escape(nutrientId)}"]`);
      const nutrientList = nutrientButton?.closest('.nutri-stickers');
      const nutrientType = nutrientList?.dataset.type;
      document.querySelectorAll('.nutri-stickers').forEach((list) => { list.hidden = list !== nutrientList; });
      document.querySelectorAll('.nutri-tabs button').forEach((tab) => {
        tab.setAttribute('aria-pressed', String(tab.dataset.type === nutrientType));
      });
      document.querySelectorAll('.nutri-stickers button').forEach((button) => {
        button.setAttribute('aria-pressed', String(button === nutrientButton));
      });
    }
    const details = target.matches('details') ? target : target.closest('details');
    if (details) details.open = true;
    window.requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  };

  revealHashTarget();
  window.addEventListener('hashchange', revealHashTarget);
  phoneTests.addEventListener?.('change', () => {
    assignTestAnchors();
    revealHashTarget();
  });
})();

// Load the small, dependency-free public-site search after the shared page
// interactions are ready. Keeping the curated index separate makes it easy to
// review what is public and ensures the private Practice Hub is never searched.
(function () {
  const sharedScript = document.currentScript;
  if (!sharedScript || document.querySelector('script[data-holus-search-loader], script[src*="site-search.js"]')) return;
  const base = new URL('.', sharedScript.src);

  const load = (filename) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = new URL(`${filename}?v=3`, base).href;
    script.defer = true;
    script.dataset.holusSearchLoader = filename;
    script.addEventListener('load', resolve, { once: true });
    script.addEventListener('error', reject, { once: true });
    document.head.append(script);
  });

  load('search-index.js')
    .then(() => load('site-search.js'))
    .catch((error) => console.error('Hōlus search could not load.', error));
})();
