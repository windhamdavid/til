import React, {useEffect, useRef, useState, useCallback} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {useHistory} from '@docusaurus/router';
import {useColorMode} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import graph from '@site/src/data/graph.json';

// Color per section. Tweak to taste.
const GROUP_COLORS = {
  docs: '#4f9bff',
  notes: '#34c759',
  lists: '#ffcc00',
  posts: '#ff6b6b',
  page: '#b07cff',
  index: '#9aa0a6',
};
const GROUPS = [
  ['docs', 'Docs'],
  ['notes', 'Notes'],
  ['lists', 'Lists'],
  ['posts', 'Posts'],
  ['page', 'Pages'],
  ['index', 'Index/hubs'],
];

function GraphInner() {
  // Required client-side only (canvas lib touches window) — safe inside BrowserOnly.
  const ForceGraph2D = require('react-force-graph-2d').default;
  const history = useHistory();
  const {colorMode} = useColorMode();
  const {siteConfig: {baseUrl}} = useDocusaurusContext();
  const dark = colorMode === 'dark';

  const wrapRef = useRef(null);
  const fgRef = useRef(null);
  const [size, setSize] = useState({width: 800, height: 600});

  // Fill from the graph's top edge to the bottom of the viewport, full width.
  useEffect(() => {
    const measure = () => {
      const el = wrapRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      setSize({width: el.offsetWidth, height: Math.max(420, window.innerHeight - top - 12)});
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Clone so the lib's mutations (x/y) don't freeze the imported JSON module.
  const data = useRef({
    nodes: graph.nodes.map((n) => ({...n})),
    links: graph.links.map((l) => ({...l})),
  }).current;

  const onClick = useCallback(
    (node) => {
      if (!node?.id || node.partial) return;                   // hub nodes have no published page
      const base = baseUrl.replace(/\/$/, '');                 // '/til'
      const path = node.id.startsWith(base + '/') ? node.id : base + node.id;
      history.push(path);                                       // → /til/docs/…
    },
    [history, baseUrl],
  );

  const paintNode = useCallback(
    (node, ctx, scale) => {
      const r = Math.max(2, Math.sqrt(node.val) * 1.7);
      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
      ctx.fillStyle = GROUP_COLORS[node.group] || '#888';
      ctx.fill();
      if (scale > 1.8) {
        // Only draw labels when zoomed in, to avoid clutter.
        ctx.font = `${10 / scale}px sans-serif`;
        ctx.fillStyle = dark ? '#e6e6e6' : '#222';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + r + 9 / scale);
      }
    },
    [dark],
  );

  return (
    <>
      <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', margin: '0 0 8px'}}>
        {GROUPS.map(([key, label]) => (
          <span key={key} style={{display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14}}>
            <span style={{width: 12, height: 12, borderRadius: '50%', background: GROUP_COLORS[key], display: 'inline-block'}} />
            {label}
          </span>
        ))}
        <span style={{fontSize: 13, opacity: 0.7}}>· click a node to open the page · scroll to zoom · drag to pan</span>
      </div>
      <div
        ref={wrapRef}
        style={{border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: 8, overflow: 'hidden'}}
      >
        <ForceGraph2D
          ref={fgRef}
          graphData={data}
          width={size.width}
          height={size.height}
          backgroundColor={dark ? '#2b2f37' : '#ffffff'}
          nodeLabel="label"
          nodeColor={(n) => GROUP_COLORS[n.group] || '#888'}
          nodeRelSize={4}
          nodeCanvasObject={paintNode}
          nodePointerAreaPaint={(node, color, ctx) => {
            const r = Math.max(4, Math.sqrt(node.val) * 1.7);
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
            ctx.fill();
          }}
          linkColor={() => (dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.18)')}
          linkDirectionalArrowLength={3}
          linkDirectionalArrowRelPos={1}
          onNodeClick={onClick}
          cooldownTicks={120}
        />
      </div>
    </>
  );
}

export default function KnowledgeGraph() {
  return (
    <BrowserOnly fallback={<p><em>Loading graph…</em></p>}>
      {() => <GraphInner />}
    </BrowserOnly>
  );
}
