(function (root, factory) {
  const isCommonJs = typeof module === 'object' && module.exports;
  const index = isCommonJs ? require('./search-index.js') : (root.HOLUS_SEARCH_INDEX || []);
  const api = factory(index, root);

  if (isCommonJs) {
    module.exports = api;
  }

  root.HolusSiteSearch = api;

  if (root.document) {
    if (root.document.readyState === 'loading') {
      root.document.addEventListener('DOMContentLoaded', function () {
        api.init(root.document);
      }, { once: true });
    } else {
      api.init(root.document);
    }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (defaultIndex, root) {
  'use strict';

  const STOP_WORDS = new Set([
    'a', 'an', 'and', 'are', 'about', 'can', 'do', 'for', 'from', 'how', 'i',
    'in', 'is', 'it', 'my', 'of', 'on', 'or', 'the', 'to', 'what', 'when',
    'where', 'with', 'you', 'your'
  ]);

  function normalizeText(value) {
    return String(value == null ? '' : value)
      .normalize('NFKD')
      .replace(/\p{M}+/gu, '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/([a-z])([0-9])/g, '$1 $2')
      .replace(/([0-9])([a-z])/g, '$1 $2')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()
      .replace(/\s+/g, ' ');
  }

  function tokenizeQuery(query) {
    const normalized = normalizeText(query);
    if (!normalized) return [];

    const raw = normalized.split(' ');
    const meaningful = raw.filter(function (token) {
      return !STOP_WORDS.has(token);
    });

    return meaningful.length ? meaningful : raw;
  }

  function words(value) {
    const normalized = normalizeText(value);
    return normalized ? normalized.split(' ') : [];
  }

  function fieldMatch(fieldWords, token) {
    return fieldWords.some(function (word) {
      if (word === token) return true;
      return token.length >= 3 && word.startsWith(token);
    });
  }

  function prepareRecord(record) {
    const keywordText = (record.keywords || []).join(' ');
    const title = normalizeText(record.title);
    const summary = normalizeText(record.summary);
    const type = normalizeText(record.type);
    const keywords = normalizeText(keywordText);

    return {
      record: record,
      title: title,
      titleWords: words(title),
      summary: summary,
      summaryWords: words(summary),
      type: type,
      typeWords: words(type),
      keywords: keywords,
      keywordWords: words(keywords),
      keywordPhrases: (record.keywords || []).map(normalizeText),
      haystack: [title, summary, type, keywords].join(' ')
    };
  }

  function tokenScore(prepared, token) {
    let score = 0;

    if (prepared.titleWords.includes(token)) score += 38;
    else if (fieldMatch(prepared.titleWords, token)) score += 25;

    if (prepared.keywordWords.includes(token)) score += 22;
    else if (fieldMatch(prepared.keywordWords, token)) score += 15;

    if (prepared.summaryWords.includes(token)) score += 9;
    else if (fieldMatch(prepared.summaryWords, token)) score += 5;

    if (prepared.typeWords.includes(token)) score += 5;
    return score;
  }

  function searchRecords(query, options) {
    const settings = options || {};
    const records = Array.isArray(settings.records) ? settings.records : defaultIndex;
    const limit = Number.isFinite(settings.limit) ? Math.max(0, settings.limit) : 20;
    const normalizedQuery = normalizeText(query);

    if (normalizedQuery.length < 2 || limit === 0) return [];

    const tokens = tokenizeQuery(query);
    if (!tokens.length) return [];

    return records
      .map(prepareRecord)
      .filter(function (prepared) {
        return tokens.every(function (token) {
          return fieldMatch(prepared.titleWords, token)
            || fieldMatch(prepared.keywordWords, token)
            || fieldMatch(prepared.summaryWords, token)
            || fieldMatch(prepared.typeWords, token);
        });
      })
      .map(function (prepared) {
        let score = 0;

        if (prepared.title === normalizedQuery) score += 220;
        else if (prepared.title.startsWith(normalizedQuery)) score += 150;
        else if (prepared.title.includes(normalizedQuery)) score += 70;

        if (prepared.keywordPhrases.includes(normalizedQuery)) score += 90;
        else if (prepared.keywords.includes(normalizedQuery)) score += 38;

        if (prepared.summary.includes(normalizedQuery)) score += 28;
        tokens.forEach(function (token) {
          score += tokenScore(prepared, token);
        });
        if (prepared.record.url === '/') score += 10;

        return { record: prepared.record, score: score };
      })
      .sort(function (a, b) {
        return b.score - a.score
          || a.record.title.localeCompare(b.record.title, 'en-CA');
      })
      .slice(0, limit)
      .map(function (entry) {
        return entry.record;
      });
  }

  function isEditableTarget(target) {
    if (!target || !target.closest) return false;
    return Boolean(target.closest('input, textarea, select, [contenteditable="true"]'));
  }

  function makeElement(doc, tag, className, text) {
    const element = doc.createElement(tag);
    if (className) element.className = className;
    if (text != null) element.textContent = text;
    return element;
  }

  function closeMobileMenu(doc) {
    doc.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
    doc.querySelector('.site-nav')?.classList.remove('is-open');
  }

  const PROJECT_PATH = '/holus-nutrition';

  function sitePath(path) { return (function(p){if(!p||p[0]!=='/'||p.startsWith('//'))return p;var m=p.match(/^([^?#]*)(.*)$/),b=(window.__HB||'')+m[1].slice(1);if(b===''||/\/$/.test(b))b+='index.html';return b+m[2];})(path); }

  function renderResults(doc, list, status, query, limit) {
    const results = searchRecords(query, { limit: limit });
    const cleanQuery = String(query || '').trim();
    list.replaceChildren();

    if (!cleanQuery) {
      status.textContent = 'Start typing to search services, nutrition topics, FAQs and policies.';
      return results;
    }

    if (normalizeText(cleanQuery).length < 2) {
      status.textContent = 'Enter at least two characters.';
      return results;
    }

    if (!results.length) {
      status.textContent = 'No results for “' + cleanQuery + '”. Try a broader word, such as protein, services or insurance.';
      return results;
    }

    status.textContent = results.length + (results.length === 1 ? ' result' : ' results') + ' for “' + cleanQuery + '”.';

    results.forEach(function (result) {
      const item = makeElement(doc, 'li', 'holus-search-result');
      const link = makeElement(doc, 'a', 'holus-search-result-link');
      const meta = makeElement(doc, 'span', 'holus-search-result-type', result.type);
      const title = makeElement(doc, 'strong', 'holus-search-result-title', result.title);
      const summary = makeElement(doc, 'span', 'holus-search-result-summary', result.summary);
      const arrow = makeElement(doc, 'span', 'holus-search-result-arrow', '→');

      arrow.setAttribute('aria-hidden', 'true');
      link.href = sitePath(result.url);
      link.append(meta, title, summary, arrow);
      item.append(link);
      list.append(item);
    });

    return results;
  }

  function injectStyles(doc) {
    if (doc.getElementById('holus-site-search-styles')) return;

    const style = doc.createElement('style');
    style.id = 'holus-site-search-styles';
    style.textContent = `
      .site-search-trigger{display:inline-flex;align-items:center;gap:.45rem;color:var(--black,#000);font:600 .86rem Manrope,sans-serif;text-decoration:none;white-space:nowrap}
      .site-search-trigger svg{width:1.05rem;height:1.05rem;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round}
      .site-search-trigger:hover{color:var(--sage-deep,#4b5d49)}
      .holus-search-dialog{width:min(calc(100% - 2rem),46rem);max-height:min(84vh,48rem);margin:auto;padding:0;color:var(--black,#000);background:var(--paper,#fff);border:1px solid var(--line,#dfe4de);border-radius:1.25rem;box-shadow:0 28px 80px rgba(24,35,45,.22)}
      .holus-search-dialog::backdrop{background:rgba(24,35,45,.44);backdrop-filter:blur(4px)}
      .holus-search-panel{display:flex;max-height:min(84vh,48rem);flex-direction:column}
      .holus-search-head{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.25rem 1.35rem;border-bottom:1px solid var(--line,#dfe4de)}
      .holus-search-head h2{margin:0;font:700 1.15rem/1.2 Manrope,sans-serif;letter-spacing:-.025em}
      .holus-search-close{display:grid;width:2.6rem;height:2.6rem;flex:0 0 auto;place-items:center;padding:0;color:var(--ink,#243341);background:var(--mist,#eef2ed);border:0;border-radius:50%;cursor:pointer;font-size:1.35rem;line-height:1}
      .holus-search-form{padding:1.15rem 1.35rem .75rem}
      .holus-search-label{display:block;margin:0 0 .5rem;color:var(--sage-deep,#4b5d49);font:700 .72rem/1.2 Manrope,sans-serif;letter-spacing:.1em;text-transform:uppercase}
      .holus-search-field{position:relative}
      .holus-search-field svg{position:absolute;top:50%;left:1rem;width:1.15rem;height:1.15rem;fill:none;stroke:var(--sage-deep,#4b5d49);stroke-width:1.8;transform:translateY(-50%);pointer-events:none}
      .holus-search-input{width:100%;min-height:3.35rem;padding:.8rem 1rem .8rem 2.9rem;color:var(--black,#000);background:var(--mist,#eef2ed);border:1px solid transparent;border-radius:999px;font:500 1rem/1.3 Inter,Arial,sans-serif}
      .holus-search-input:focus{background:#fff;border-color:var(--sage,#71836d);outline:3px solid rgba(113,131,109,.18);outline-offset:1px}
      .holus-search-hint{margin:.55rem .2rem 0;color:var(--muted,#596166);font-size:.78rem}
      .holus-search-status{min-height:1.4rem;margin:0;padding:.35rem 1.55rem .75rem;color:var(--muted,#596166);font-size:.86rem}
      .holus-search-results{overflow:auto;margin:0;padding:0 1.35rem 1.35rem;list-style:none}
      .holus-search-result{border-top:1px solid var(--line,#dfe4de)}
      .holus-search-result-link{position:relative;display:grid;gap:.24rem;padding:1rem 2rem 1rem 0;color:inherit;text-decoration:none}
      .holus-search-result-link:hover .holus-search-result-title{color:var(--sage-deep,#4b5d49)}
      .holus-search-result-type{color:var(--sage-deep,#4b5d49);font:700 .67rem/1.2 Manrope,sans-serif;letter-spacing:.1em;text-transform:uppercase}
      .holus-search-result-title{font:700 1.02rem/1.3 Manrope,sans-serif;letter-spacing:-.018em;transition:color .18s ease}
      .holus-search-result-summary{max-width:58ch;color:var(--muted,#596166);font-size:.88rem;line-height:1.55}
      .holus-search-result-arrow{position:absolute;top:50%;right:.25rem;color:var(--sage-deep,#4b5d49);transform:translateY(-50%)}
      .holus-search-popular{display:flex;flex-wrap:wrap;gap:.5rem;padding:0 1.35rem 1rem}
      .holus-search-popular[hidden]{display:none}
      .holus-search-popular a{padding:.45rem .8rem;color:var(--ink,#243341);background:var(--cloud,#f7f8f6);border:1px solid var(--line,#dfe4de);border-radius:999px;font:600 .78rem/1.2 Manrope,sans-serif;text-decoration:none}
      .holus-search-popular a:hover{border-color:var(--sage,#71836d)}
      @media(max-width:900px){.site-nav>.site-search-trigger{justify-content:flex-start;padding:.7rem .35rem;font-size:1rem}.holus-search-dialog{width:min(calc(100% - 1rem),46rem);max-height:calc(100dvh - 1rem);border-radius:1rem}.holus-search-panel{max-height:calc(100dvh - 1rem)}}
      @media(max-width:520px){.holus-search-head,.holus-search-form{padding-inline:1rem}.holus-search-status{padding-inline:1.2rem}.holus-search-results{padding-inline:1rem}.holus-search-popular{padding-inline:1rem}.holus-search-result-summary{font-size:.84rem}}
      @media(prefers-reduced-motion:reduce){.holus-search-result-title{transition:none}}
    `;
    doc.head.append(style);
  }

  function buildPopularLinks(doc) {
    const wrap = makeElement(doc, 'div', 'holus-search-popular');
    const links = [
      ['Services', '/nutritional-counselling/'],
      ['Protein', '/digest/#n-protein'],
      ['GLP-1 support', '/glp1-nutrition-support/'],
      ['FAQ', '/faq/']
    ];

    links.forEach(function (entry) {
      const link = makeElement(doc, 'a', '', entry[0]);
      link.href = sitePath(entry[1]);
      wrap.append(link);
    });
    return wrap;
  }

  function createDialog(doc) {
    const existing = doc.getElementById('site-search-dialog');
    if (existing) return existing;

    const dialog = makeElement(doc, 'dialog', 'holus-search-dialog');
    dialog.id = 'site-search-dialog';
    dialog.setAttribute('aria-labelledby', 'site-search-title');

    const panel = makeElement(doc, 'div', 'holus-search-panel');
    const head = makeElement(doc, 'div', 'holus-search-head');
    const heading = makeElement(doc, 'h2', '', 'Search Hōlus');
    const close = makeElement(doc, 'button', 'holus-search-close', '×');
    heading.id = 'site-search-title';
    close.type = 'button';
    close.setAttribute('aria-label', 'Close search');
    close.dataset.searchClose = '';
    head.append(heading, close);

    const form = makeElement(doc, 'form', 'holus-search-form');
    form.action = sitePath('/search/');
    form.method = 'get';
    form.setAttribute('role', 'search');

    const label = makeElement(doc, 'label', 'holus-search-label', 'What are you looking for?');
    label.htmlFor = 'site-search-input';

    const field = makeElement(doc, 'div', 'holus-search-field');
    const icon = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const circle = doc.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const line = doc.createElementNS('http://www.w3.org/2000/svg', 'path');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('aria-hidden', 'true');
    circle.setAttribute('cx', '10.8');
    circle.setAttribute('cy', '10.8');
    circle.setAttribute('r', '6.3');
    line.setAttribute('d', 'm15.5 15.5 4 4');
    icon.append(circle, line);

    const input = makeElement(doc, 'input', 'holus-search-input');
    input.id = 'site-search-input';
    input.type = 'search';
    input.placeholder = 'Try protein, insurance or GLP-1';
    input.autocomplete = 'off';
    input.spellcheck = true;
    input.setAttribute('aria-describedby', 'site-search-hint');
    field.append(icon, input);

    const hint = makeElement(doc, 'p', 'holus-search-hint', 'General website search. Your search stays in this browser.');
    hint.id = 'site-search-hint';
    form.append(label, field, hint);

    const status = makeElement(doc, 'p', 'holus-search-status');
    status.dataset.searchStatus = '';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('aria-atomic', 'true');

    const popular = buildPopularLinks(doc);
    popular.dataset.searchPopular = '';

    const results = makeElement(doc, 'ol', 'holus-search-results');
    results.dataset.searchResults = '';

    panel.append(head, form, status, popular, results);
    dialog.append(panel);
    doc.body.append(dialog);
    return dialog;
  }

  function makeSearchTrigger(doc) {
    const link = makeElement(doc, 'a', 'site-search-trigger');
    link.href = sitePath('/search/');
    link.dataset.holusSearchTrigger = '';
    link.setAttribute('aria-haspopup', 'dialog');
    link.setAttribute('aria-controls', 'site-search-dialog');

    const icon = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const circle = doc.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const line = doc.createElementNS('http://www.w3.org/2000/svg', 'path');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('aria-hidden', 'true');
    circle.setAttribute('cx', '10.8');
    circle.setAttribute('cy', '10.8');
    circle.setAttribute('r', '6.3');
    line.setAttribute('d', 'm15.5 15.5 4 4');
    icon.append(circle, line);
    link.append(icon, makeElement(doc, 'span', '', 'Search'));
    return link;
  }

  function wireSearchDialog(doc) {
    const navigation = doc.querySelector('.site-nav');
    if (!navigation) return null;

    let trigger = navigation.querySelector('[data-holus-search-trigger]');
    if (!trigger) {
      trigger = makeSearchTrigger(doc);
      const booking = navigation.querySelector('.button');
      navigation.insertBefore(trigger, booking || null);
    }

    const dialog = createDialog(doc);
    const input = dialog.querySelector('.holus-search-input');
    const status = dialog.querySelector('[data-search-status]');
    const results = dialog.querySelector('[data-search-results]');
    const popular = dialog.querySelector('[data-search-popular]');
    const close = dialog.querySelector('[data-search-close]');
    const form = dialog.querySelector('form');
    let inputTimer = 0;
    let opener = null;

    function update() {
      const query = input.value;
      renderResults(doc, results, status, query, 8);
      popular.hidden = Boolean(String(query).trim());
    }

    function openSearch() {
      if (typeof dialog.showModal !== 'function') {
        root.location.href = sitePath('/search/');
        return;
      }
      closeMobileMenu(doc);
      opener = doc.activeElement;
      if (!dialog.open) dialog.showModal();
      update();
      root.requestAnimationFrame(function () {
        input.focus();
        input.select();
      });
    }

    trigger.addEventListener('click', function (event) {
      if (typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      openSearch();
    });

    input.addEventListener('input', function () {
      root.clearTimeout(inputTimer);
      inputTimer = root.setTimeout(update, 200);
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      root.clearTimeout(inputTimer);
      update();
    });

    close.addEventListener('click', function () {
      dialog.close();
    });

    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener('close', function () {
      if (opener && typeof opener.focus === 'function') opener.focus();
      opener = null;
    });

    return { dialog: dialog, input: input, open: openSearch, trigger: trigger };
  }

  function wireSearchPage(doc) {
    const rootElement = doc.querySelector('[data-holus-search-page]');
    if (!rootElement) return null;

    const form = rootElement.querySelector('[data-search-page-form]');
    const input = rootElement.querySelector('[data-search-page-input]');
    const status = rootElement.querySelector('[data-search-status]');
    const results = rootElement.querySelector('[data-search-results]');
    const popular = rootElement.querySelector('[data-search-popular]');
    if (!form || !input || !status || !results) return null;

    form.action = sitePath('/search/');
    rootElement.querySelectorAll('a[href^="/"]').forEach(function (link) {
      link.setAttribute('href', sitePath(link.getAttribute('href')));
    });

    let inputTimer = 0;

    function currentQuery() {
      const hash = new URL(root.location.href).hash.replace(/^#/, '');
      return new URLSearchParams(hash).get('q') || '';
    }

    function render(query) {
      input.value = query;
      renderResults(doc, results, status, query, 20);
      if (popular) popular.hidden = Boolean(String(query).trim());
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const query = input.value.trim();
      const url = new URL(root.location.href);
      const hash = new URLSearchParams();
      url.search = '';
      if (query) hash.set('q', query);
      url.hash = hash.toString();
      root.history.pushState({ holusSearch: query }, '', url);
      render(query);
    });

    input.addEventListener('input', function () {
      root.clearTimeout(inputTimer);
      inputTimer = root.setTimeout(function () {
        renderResults(doc, results, status, input.value, 20);
        if (popular) popular.hidden = Boolean(input.value.trim());
      }, 200);
    });

    root.addEventListener('popstate', function () {
      render(currentQuery());
    });

    root.addEventListener('hashchange', function () {
      render(currentQuery());
    });

    render(currentQuery());
    return { input: input, render: render };
  }

  function init(doc) {
    if (!doc || !doc.documentElement || doc.documentElement.dataset.holusSearchReady === 'true') return;
    doc.documentElement.dataset.holusSearchReady = 'true';
    injectStyles(doc);

    const page = wireSearchPage(doc);
    const dialog = wireSearchDialog(doc);

    root.addEventListener('keydown', function (event) {
      if (event.defaultPrevented || event.isComposing || isEditableTarget(event.target)) return;

      const commandK = (event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'k';
      const slash = !event.ctrlKey && !event.metaKey && !event.altKey && event.key === '/';
      if (!commandK && !slash) return;

      event.preventDefault();
      closeMobileMenu(doc);
      if (page && page.input) {
        page.input.focus();
        page.input.select();
      } else if (dialog) {
        dialog.open();
      } else {
        root.location.href = sitePath('/search/');
      }
    });
  }

  return Object.freeze({
    init: init,
    normalizeText: normalizeText,
    searchRecords: searchRecords,
    sitePath: sitePath,
    tokenizeQuery: tokenizeQuery
  });
});
