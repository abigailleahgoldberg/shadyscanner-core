import React from 'react';
import { Layout } from '../../components/Layout';
import { tips } from '../../content/tips-data';

export async function getStaticPaths() {
  return { paths: tips.map(tip => ({ params: { slug: tip.slug } })), fallback: false };
}
export async function getStaticProps({ params }) {
  const tip = tips.find(t => t.slug === params.slug) || null;
  const idx = tips.findIndex(t => t.slug === params.slug);
  return { props: { tip, prev: idx > 0 ? tips[idx - 1] : null, next: idx < tips.length - 1 ? tips[idx + 1] : null } };
}

function renderMd(text) {
  if (!text) return [];
  const lines = text.split('\n');
  const els = [];
  let inCode = false, codeLines = [], i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('```')) {
      if (inCode) {
        els.push(<pre key={`c${i}`} style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', padding: '16px 20px', borderRadius: 10, overflowX: 'auto', margin: '12px 0', fontSize: 13, lineHeight: 1.7, color: '#3B6EF0' }}><code>{codeLines.join('\n')}</code></pre>);
        codeLines = []; inCode = false;
      } else { inCode = true; }
      i++; continue;
    }
    if (inCode) { codeLines.push(line); i++; continue; }
    const fmt = s => s.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#0F1117">$1</strong>').replace(/\\`(.*?)\\`/g, '<code style="color:#3B6EF0;background:#F1F5F9;padding:1px 6px;border-radius:4px;font-size:0.9em">$1</code>').replace(/`(.*?)`/g, '<code style="color:#3B6EF0;background:#F1F5F9;padding:1px 6px;border-radius:4px;font-size:0.9em">$1</code>');
    if (line.startsWith('## ')) {
      els.push(<h2 key={i} style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: '1.5rem', fontWeight: 700, color: '#0F1117', margin: '36px 0 14px', letterSpacing: '-0.3px' }}>{line.slice(3)}</h2>);
    } else if (line.startsWith('- ')) {
      const items = []; let j = i;
      while (j < lines.length && lines[j].startsWith('- ')) { items.push(lines[j].slice(2)); j++; }
      els.push(<ul key={i} style={{ paddingLeft: '1.4rem', margin: '10px 0', color: '#64748B', lineHeight: 1.8 }}>{items.map((it, k) => <li key={k} style={{ marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: fmt(it) }} />)}</ul>);
      i = j; continue;
    } else if (line.match(/^\d+\. /)) {
      const items = []; let j = i;
      while (j < lines.length && lines[j].match(/^\d+\. /)) { items.push(lines[j].replace(/^\d+\. /, '')); j++; }
      els.push(<ol key={i} style={{ paddingLeft: '1.4rem', margin: '10px 0', color: '#64748B', lineHeight: 1.8 }}>{items.map((it, k) => <li key={k} style={{ marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: fmt(it) }} />)}</ol>);
      i = j; continue;
    } else if (line.trim() === '') {
      els.push(<div key={i} style={{ height: '0.4rem' }} />);
    } else {
      els.push(<p key={i} style={{ color: '#64748B', lineHeight: 1.8, margin: '4px 0', fontSize: 15 }} dangerouslySetInnerHTML={{ __html: fmt(line) }} />);
    }
    i++;
  }
  return els;
}

export default function TipArticle({ tip, prev, next }) {
  if (!tip) return <Layout><div style={{ padding: '4rem', textAlign: 'center', color: 'var(--red)' }}>Not found.</div></Layout>;
  return (
    <Layout active="/tips">
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '56px 32px 96px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40, fontSize: 13, color: '#94A3B8' }}>
          <a href="/tips" style={{ color: '#3B6EF0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>← All Tips</a>
          <span>/</span>
          <span>{tip.category}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#3B6EF0', background: 'rgba(91,140,249,0.1)', border: '1px solid rgba(91,140,249,0.2)', padding: '3px 10px', borderRadius: 4, textTransform: 'uppercase' }}>{tip.category}</span>
          <h1 style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, color: '#0F1117', margin: '16px 0 20px', letterSpacing: '-1px', lineHeight: 1.1 }}>{tip.title}</h1>
          <p style={{ fontSize: 17, color: '#64748B', lineHeight: 1.7, borderLeft: '3px solid #CBD5E1', paddingLeft: 18, margin: 0 }}>{tip.detail}</p>
        </div>

        <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 40 }}>
          {renderMd(tip.article)}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 60, background: 'linear-gradient(135deg, rgba(91,140,249,0.07), rgba(139,124,248,0.07))', border: '1px solid #CBD5E1', borderRadius: 16, padding: '40px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: '1.6rem', fontWeight: 700, fontStyle: 'italic', color: '#0F1117', marginBottom: 10 }}>Get your site properly hardened.</h3>
          <p style={{ color: '#64748B', fontSize: 14, margin: '0 0 24px', lineHeight: 1.7 }}>The Voice of Cash delivers professional security audits and hands-on implementation.</p>
          <a href="https://thevoiceofcash.com/consultation" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #3B6EF0, var(--accent2))', color: '#fff', padding: '12px 28px', borderRadius: 9, textDecoration: 'none', fontWeight: 700, fontSize: 14, boxShadow: '0 4px 20px rgba(91,140,249,0.3)' }}>
            Speak to a Specialist →
          </a>
        </div>

        {/* Prev/Next */}
        <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {prev ? (
            <a href={`/tips/${prev.slug}`} style={{ textDecoration: 'none', background: '#F8F9FC', border: '1px solid #E2E8F0', borderRadius: 10, padding: '16px 18px', display: 'block', transition: 'border-color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#CBD5E1'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}>
              <div style={{ fontSize: 10, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>← Previous</div>
              <div style={{ color: '#3B6EF0', fontSize: 13, fontWeight: 600 }}>{prev.title}</div>
            </a>
          ) : <div />}
          {next ? (
            <a href={`/tips/${next.slug}`} style={{ textDecoration: 'none', background: '#F8F9FC', border: '1px solid #E2E8F0', borderRadius: 10, padding: '16px 18px', display: 'block', textAlign: 'right', transition: 'border-color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#CBD5E1'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}>
              <div style={{ fontSize: 10, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Next →</div>
              <div style={{ color: '#3B6EF0', fontSize: 13, fontWeight: 600 }}>{next.title}</div>
            </a>
          ) : <div />}
        </div>
      </section>
    </Layout>
  );
}
