/**
 * Loads "davo-bot 2000" (the floating launcher) site-wide.
 *
 * Production: the widget bundle (/ask/widget.js) and its API (/ask/api/ask) are
 * served by the ralph RAG/MCP server behind an Apache proxy at
 * davidawindham.com/ask/. Local dev: they're served directly by the ralph HTTP
 * server on http://localhost:3001 (routes /ask/widget.js and /api/ask), so the
 * dev site loads them cross-origin from there.
 *
 * The widget auto-initializes from this script tag's data-* attributes (it reads
 * document.currentScript.dataset). We FIRST check that the widget URL really is
 * JavaScript before injecting it: where the backend isn't reachable, the request
 * returns the SPA's HTML fallback, and injecting that throws "Unexpected token
 * '<'". The content-type probe makes this a silent no-op until the widget is
 * actually being served. window.__dawaskLoaded (set by the widget) keeps it to a
 * single instance across Docusaurus SPA navigation.
 *
 * NOTE: for it to *answer* in dev, the ralph server must include
 * http://localhost:3000 in ALLOWED_ORIGINS (the /api/ask CORS allowlist). The
 * button itself appears regardless (/ask/widget.js has open CORS).
 */
if (typeof document !== 'undefined' && typeof fetch !== 'undefined') {
  const local = /^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/.test(window.location.hostname);
  const WIDGET_URL = local ? 'http://localhost:3001/ask/widget.js' : '/ask/widget.js';
  const API_URL = local ? 'http://localhost:3001/api/ask' : '/ask/api/ask';

  const inject = () => {
    if (document.getElementById('dawask-script')) return; // already injected
    const s = document.createElement('script');
    s.id = 'dawask-script';
    s.src = WIDGET_URL;
    s.setAttribute('data-api-url', API_URL);
    s.setAttribute('data-mode', 'launcher');
    document.body.appendChild(s);
  };

  fetch(WIDGET_URL, {method: 'GET', cache: 'no-store'})
    .then((r) => {
      const ct = (r.headers.get('content-type') || '').toLowerCase();
      if (r.ok && ct.includes('javascript')) inject();
    })
    .catch(() => {}); // backend not reachable → no widget, no error
}
