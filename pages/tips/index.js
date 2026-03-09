import React from 'react';
import { Layout } from '../../components/Layout';
import { tips } from '../../content/tips-data';

const CAT_COLORS = { PASSWORDS:'#DB2777',SESSIONS:'#16A34A',MOBILE:'#2563EB',EMAIL:'#D97706',GITHUB:'#7C3AED',CDN:'#3B6EF0',VPC:'#0891B2',SOCIAL:'#DC2626',BROWSER:'#EA580C',HARDWARE:'#7C3AED',RECOVERY:'#16A34A',API:'#0891B2',ROUTER:'#D97706',METADATA:'#16A34A',PHISHING:'#DC2626',BACKUPS:'#0891B2',DNS:'#2563EB',ENCRYPTION:'#7C3AED' };

export default function Tips() {
  return (
    <Layout active="/tips">
      <section style={{ padding: '72px 32px 48px', borderBottom: '1px solid #E2E8F0', background: '#F8F9FC' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 16 }}>Stay Safe Tips</div>
          <h1 style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-2px', lineHeight: 1.0, color: '#0F1117', maxWidth: 700 }}>
            {tips.length} ways to stop<br /><strong style={{ fontWeight: 800, fontStyle: 'italic' }}>being an easy target.</strong>
          </h1>
          <p style={{ fontSize: 16, color: '#64748B', marginTop: 20, maxWidth: 480, lineHeight: 1.7 }}>Practical, no-BS security habits. Each one takes less than a day to implement.</p>
        </div>
      </section>
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
          {tips.map((tip, i) => {
            const c = CAT_COLORS[tip.category] || '#3B6EF0';
            return (
              <a key={tip.id} href={`/tips/${tip.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', transition: 'box-shadow 0.15s, transform 0.15s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: c, background: c + '15', padding: '3px 10px', borderRadius: 4, textTransform: 'uppercase' }}>{tip.category}</span>
                    <span style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 18, fontWeight: 700, color: '#E2E8F0' }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h2 style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: '1.1rem', fontWeight: 700, color: '#0F1117', marginBottom: 10, lineHeight: 1.3, flex: 1 }}>{tip.title}</h2>
                  <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, margin: '0 0 16px' }}>{tip.detail}</p>
                  <div style={{ fontSize: 11, fontWeight: 700, color: c, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Read article →</div>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
