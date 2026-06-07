import React from 'react';
import Layout from '@theme/Layout';
import KnowledgeGraph from '@site/src/components/KnowledgeGraph';

export default function GraphPage() {
  return (
    <Layout title="Graph" description="A force-directed graph of how this site's pages link to each other.">
      <main style={{padding: '1rem 1.25rem 0'}}>
        <h1 style={{marginBottom: '0.25rem'}}>Graph</h1>
        <p style={{marginBottom: '0.75rem', maxWidth: 820}}>
          How the pages here link to one another — rebuilt with <code>npm run graph</code>.
        </p>
        <KnowledgeGraph />
      </main>
    </Layout>
  );
}
