import React from 'react';
import { Layout } from '../../components/Layout';

const posts = [
  { id: 1, category: 'Guide', title: '6 Steps to Stop Being Shady Online', date: 'Mar 9, 2026', snippet: 'Audit your headers, rotate your keys, and stay clean. The complete checklist every site owner needs.' },
  { id: 2, category: 'Opinion', title: 'Why Your Developer Is Lying To You About Security', date: 'Mar 8, 2026', snippet: 'Most devs focus on the look, not the locks. Here is what they are not telling you.' },
  { id: 4, category: 'Deep Dive', title: 'SSL: Not Just a Padlock — It Is Your Lifeblood', date: 'Mar 7, 2026', snippet: 'A deep dive into why TLS 1.3 is no longer optional for any business with an online presence.' },
  { id: 5, category: 'Email', title: 'The DMARC Trap: Why Your Emails Are Going to Spam', date: 'Mar 6, 2026', snippet: 'Email security is domain security. Fix your DMARC or keep wondering why the leads stop coming.' },
  { id: 6, category: 'Headers', title: 'HSTS: The Header That Saves Your Site From Hijacking', date: 'Mar 5, 2026', snippet: 'Force HTTPS everywhere and stop man-in-the-middle attacks cold. One header, massive impact.' },
  { id: 3, category: 'Scanning', title: 'Is Your Website Shady? The Truth About Port Scanning', date: 'Mar 4, 2026', snippet: 'Open ports are open doors for bad actors. Learn what your attack surface actually looks like.' },
];

const CAT_COLORS = { Guide:'#16A34A', Opinion:'#DC2626', 'Deep Dive':'#7C3AED', Email:'#D97706', Headers:'#2563EB', Scanning:'#DB2777' };

export default function Blog() {
  return (
    <Layout active="/blog">
      <section style={{ padding: '72px 32px 48px', borderBottom: '1px solid #E2E8F0', background: '#F8F9FC' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 16 }}>The Shady Scanner Report</div>
          <h1 style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-2px', lineHeight: 1.0, color: '#0F1117', maxWidth: 700 }}>
            Security intel,<br /><strong style={{ fontWeight: 800, fontStyle: 'italic' }}>straight from the source.</strong>
          </h1>
          <p style={{ fontSize: 16, color: '#64748B', marginTop: 20, maxWidth: 480, lineHeight: 1.7 }}>Guides, breakdowns, and field notes on keeping your digital presence secure.</p>
        </div>
      </section>
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px 96px' }}>
        <div style={{ display: 'grid', gap: 2 }}>
          {posts.map((post, i) => {
            const c = CAT_COLORS[post.category] || '#3B6EF0';
            return (
              <a key={post.id} href="#" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, padding: '28px 0', borderBottom: '1px solid #E2E8F0', transition: 'opacity 0.15s', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <div style={{ width: 48, height: 48, background: '#F8F9FC', border: '1px solid #E2E8F0', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 16, fontWeight: 700, color: '#CBD5E1' }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: c, background: c + '15', border: `1px solid ${c}30`, padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase' }}>{post.category}</span>
                      <span style={{ fontSize: 12, color: '#94A3B8' }}>{post.date}</span>
                    </div>
                    <h2 style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 700, color: '#0F1117', marginBottom: 8, letterSpacing: '-0.3px', lineHeight: 1.2 }}>{post.title}</h2>
                    <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, margin: 0 }}>{post.snippet}</p>
                  </div>
                  <span style={{ color: '#CBD5E1', fontSize: 20, flexShrink: 0, paddingTop: 4 }}>→</span>
                </div>
              </a>
            );
          })}
        </div>
        <div style={{ marginTop: 64, background: 'linear-gradient(135deg, #EFF6FF, #F5F3FF)', border: '1px solid #BFDBFE', borderRadius: 18, padding: '44px 48px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, fontStyle: 'italic', color: '#0F1117', marginBottom: 10 }}>Ready to fix the vulnerabilities?</h3>
          <p style={{ color: '#64748B', fontSize: 15, margin: '0 0 24px', lineHeight: 1.7, maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>Run a free scan or book a consultation with the team at The Voice of Cash.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/" style={{ background: 'linear-gradient(135deg, #3B6EF0, #6C5CE7)', color: '#fff', padding: '12px 28px', borderRadius: 9, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>Run Free Scan →</a>
            <a href="https://thevoiceofcash.com/consultation" style={{ background: '#fff', border: '1px solid #CBD5E1', color: '#475569', padding: '12px 28px', borderRadius: 9, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>Speak to a Specialist</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
