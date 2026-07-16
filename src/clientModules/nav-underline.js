/**
 * Site offcanvas top-nav — mirrors the parent site (davidawindham.com).
 * The "David A. Windham" brand (a .dw-brand in the navbar) opens a slide-down
 * bar with About/Desk/Studio/Work and a "magic line" underline that follows the
 * hovered item. Injected at <body> level (not inside the navbar) because the
 * navbar's hideOnScroll transform would otherwise trap the fixed-position panel.
 * Toggled by JS (click/Enter/Space, backdrop, Esc, or a #nav deep-link) rather
 * than :target, which keeps it robust across Docusaurus SPA navigation and
 * avoids a broken-anchor on #nav. Event delegation on document survives navbar
 * re-renders.
 */
if (typeof document !== 'undefined') {
  const OFFCANVAS_HTML =
    '<div class="dw-offcanvas" id="dw-nav" role="dialog" aria-label="Site navigation">' +
      '<nav class="dw-offcanvas-nav">' +
        '<ul class="dw-nav">' +
          '<li><a href="https://davidawindham.com/about">About</a></li>' +
          '<li><a href="https://davidawindham.com/desk">Desk</a></li>' +
          '<li><a href="https://davidawindham.com/studio">Studio</a></li>' +
          '<li><a href="https://davidawindham.com/work">Work</a></li>' +
          '<span class="dw-nav-underline" aria-hidden="true"></span>' +
        '</ul>' +
      '</nav>' +
    '</div>' +
    '<a href="#" class="dw-offcanvas-backdrop" tabindex="-1" aria-hidden="true"></a>';

  function ensureInjected() {
    if (document.getElementById('dw-nav')) return;
    const root = document.createElement('div');
    root.className = 'dw-offcanvas-root';
    root.innerHTML = OFFCANVAS_HTML;
    document.body.appendChild(root);
  }
  const panel = () => document.getElementById('dw-nav');
  const isOpen = () => { const o = panel(); return !!o && o.classList.contains('dw-open'); };
  function setOpen(open) {
    ensureInjected();
    const o = panel();
    if (!o) return;
    o.classList.toggle('dw-open', open);
    document.querySelectorAll('.dw-brand').forEach((b) => b.setAttribute('aria-expanded', String(open)));
  }

  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!t || !t.closest) return;
    if (t.closest('.dw-brand')) { e.preventDefault(); setOpen(!isOpen()); return; }
    if (t.closest('.dw-offcanvas-backdrop')) { e.preventDefault(); setOpen(false); return; }
    if (t.closest('.dw-offcanvas .dw-nav a')) setOpen(false); // let the link navigate away
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) { setOpen(false); return; }
    const t = e.target;
    if (t && t.closest && t.closest('.dw-brand') && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setOpen(!isOpen());
    }
  });

  // magic-line underline
  function positionUnderline(a) {
    const ul = a.closest('ul.dw-nav');
    if (!ul) return;
    const line = ul.querySelector('.dw-nav-underline');
    const li = a.closest('li');
    if (!line || !li) return;
    line.style.left = li.offsetLeft + 'px';
    line.style.width = li.offsetWidth + 'px';
    line.style.top = li.offsetTop + li.offsetHeight + 'px';
    line.style.opacity = '1';
  }
  document.addEventListener('mouseover', (e) => {
    const t = e.target;
    const a = t && t.closest && t.closest('ul.dw-nav li a');
    if (a) positionUnderline(a);
  });
  document.addEventListener('mouseout', (e) => {
    const t = e.target;
    const ul = t && t.closest && t.closest('ul.dw-nav');
    if (ul && (!e.relatedTarget || !ul.contains(e.relatedTarget))) {
      const line = ul.querySelector('.dw-nav-underline');
      if (line) line.style.opacity = '0';
    }
  });

  function boot() {
    ensureInjected();
    if (window.location.hash === '#nav') setOpen(true); // deep-link to open
  }
  window.addEventListener('hashchange', () => { if (window.location.hash === '#nav') setOpen(true); });
  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
}
