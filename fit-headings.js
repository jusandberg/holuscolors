// Site rule: every heading sits on one line, and so does a one-sentence intro under it.
// Headings shrink only as much as needed to fit; intros go on one line only when they fit as they are.
(function () {
  var MIN = 16;
  function heads() {
    return document.querySelectorAll('main h1, main h2, body > section h1, body > section h2');
  }
  function textWidth(el) {
    var r = document.createRange(); r.selectNodeContents(el);
    return r.getBoundingClientRect().width;
  }
  function fitHeading(h) {
    h.style.fontSize = ''; h.style.whiteSpace = ''; h.style.maxWidth = 'none';
    var avail = h.clientWidth - parseFloat(getComputedStyle(h).paddingLeft) - parseFloat(getComputedStyle(h).paddingRight);
    if (!avail) return; // hidden for now
    h.style.whiteSpace = 'nowrap';
    var need = textWidth(h);
    if (need > avail + 0.5) {
      var size = Math.floor(parseFloat(getComputedStyle(h).fontSize) * (avail / need) * 10) / 10 - 0.2;
      if (size < MIN) { h.style.whiteSpace = ''; h.style.fontSize = MIN + 'px'; }
      else h.style.fontSize = size + 'px';
    }
  }
  function fitIntro(h) {
    var p = h.nextElementSibling;
    if (!p || p.tagName !== 'P' || p.classList.contains('eyebrow')) return;
    var text = p.textContent.trim();
    if (/[.!?]\s+\S/.test(text)) return; // more than one sentence: leave as a paragraph
    p.style.whiteSpace = ''; p.style.maxWidth = '';
    var mw = getComputedStyle(p).maxWidth;
    p.style.maxWidth = 'none';
    var avail = p.clientWidth;
    if (!avail) { p.style.maxWidth = ''; return; }
    p.style.whiteSpace = 'nowrap';
    if (textWidth(p) > avail + 0.5) { p.style.whiteSpace = ''; p.style.maxWidth = mw === 'none' ? '' : ''; }
  }
  function run() {
    heads().forEach(function (h) {
      if (h.closest('header.site-header, footer, nav')) return;
      fitHeading(h); fitIntro(h);
    });
  }
  var t;
  function soon() { clearTimeout(t); t = setTimeout(run, 60); }
  run();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
  window.addEventListener('load', run);
  window.addEventListener('resize', soon);
  document.addEventListener('click', soon); // tabs and cards that reveal new headings
})();
