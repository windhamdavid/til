import React from 'react';
import Link from '@docusaurus/Link';
import recent from '@site/src/data/recent.json';

// The latest entries from each section index's `## Log`, generated at build time
// by scripts/build-recent.mjs. Rendered as a right-hand column on the home page.
const SECTIONS = [
  {key: 'docs', label: 'Docs', href: '/docs/'},
  {key: 'notes', label: 'Notes', href: '/notes/'},
  {key: 'lists', label: 'Lists', href: '/lists/'},
];

export default function Recent() {
  return (
    <aside className="til-recent" aria-label="Recent activity">
      <div className="til-recent-head">Recently</div>
      {SECTIONS.map(({key, label, href}) => (
        <section key={key} className="til-recent-block">
          <h3 className="til-recent-title">
            <Link to={href}>{label}</Link>
          </h3>
          <ul>
            {(recent[key] || []).map((it, i) => (
              <li key={i}>
                <span className="til-recent-date">{it.date}</span>
                <Link to={it.url}>{it.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </aside>
  );
}
