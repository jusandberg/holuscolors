// Scroll reveal: content below the first screen fades up gently as it scrolls into view.
// Items in the same section arrive one after another. Nothing is hidden if motion is reduced or JS is off.
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var css = document.createElement('style');
  css.textContent = '.rv{opacity:0;transform:translateY(26px);transition:opacity .7s ease,transform .8s cubic-bezier(.2,.7,.2,1)}.rv.rv-in{opacity:1;transform:none}';
  document.head.appendChild(css);
  var sections = document.querySelectorAll('main > section, body > section, main > div > section');
  var items = [];
  sections.forEach(function (sec) {
    if (sec.closest('header, footer, nav')) return;
    var host = sec.querySelector(':scope > .section-shell') || sec;
    var kids = [].slice.call(host.children).filter(function (el) {
      if (el.matches('script, style, .hf, .reveal, [hidden]')) return false;
      var cs = getComputedStyle(el);
      return cs.position !== 'absolute' && cs.position !== 'fixed' && cs.display !== 'none';
    });
    kids.forEach(function (el, i) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92) return; // already on screen: leave it be
      el.classList.add('rv');
      el.style.transitionDelay = Math.min(i, 4) * 0.08 + 's';
      items.push(el);
    });
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('rv-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  items.forEach(function (el) { io.observe(el); });
  // Jumping to a link (#section) shows that content straight away.
  function showTarget() {
    var t = location.hash && document.getElementById(location.hash.slice(1));
    if (!t) return;
    items.forEach(function (el) { if (el.contains(t) || t.contains(el)) el.classList.add('rv-in'); });
  }
  showTarget(); window.addEventListener('hashchange', showTarget);
})();
