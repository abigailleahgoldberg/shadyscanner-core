import React from 'react';

const posts = [
  { id: 1, title: '6 Steps to Stop Being Shady Online', date: '2026-03-09', snippet: 'Audit your headers, rotate your keys, and stay clean.' },
  { id: 2, title: 'Why Your Developer Is Lying To You About Security', date: '2026-03-08', snippet: 'Most devs focus on the look, not the locks. We show you the difference.' },
  { id: 4, title: 'SSL: It Is Not Just a Padlock—It Is Your Lifeblood', date: '2026-03-07', snippet: 'A deep dive into why TLS 1.3 is no longer optional.' },
  { id: 5, title: 'The DMARC Trap: Why Your Emails Are Going to Spam', date: '2026-03-06', snippet: 'Email security is domain security. Learn to fix it.' },
  { id: 6, title: 'HSTS: The Header That Saves Your Site From Hijacking', date: '2026-03-05', snippet: 'Force HTTPS everywhere and stop man-in-the-middle attacks cold.' },
  { id: 3, title: 'Is Your Website Shady? The Truth About Port Scanning', date: '2026-03-09', snippet: 'Open ports are open doors for bad actors. Close them.' }
];

export default function Blog() {
  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      color: '#00ff41',
      minHeight: '100vh',
      fontFamily: 'monospace',
      padding: '2rem'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>THE SHADY SCANNER REPORT</h1>
        <p style={{ color: '#888' }}>WU-TANG AI CLAN // SHADYSCANNER.COM OFFICIAL BLOG</p>
        <nav style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <a href="/" style={{ color: '#00ff41', textDecoration: 'none' }}>[ SCANNER ]</a>
          <a href="/blog" style={{ color: '#fff', textDecoration: 'none', borderBottom: '2px solid #00ff41' }}>[ THE SHADY SCANNER REPORT ]</a>
          <a href="/tips" style={{ color: '#00ff41', textDecoration: 'none' }}>[ STAY SAFE TIPS ]</a>
        </nav>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gap: '2rem' }}>
          {posts.map(post => (
            <div key={post.id} style={{ 
              border: '1px solid #333', 
              padding: '2rem', 
              backgroundColor: '#111'
            }}>
              <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{post.title}</h2>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>{post.date}</p>
              <p style={{ color: '#ccc', margin: '1rem 0' }}>{post.snippet}</p>
              <a href="#" style={{ color: '#00ff41' }}>READ FULL REPORT →</a>
            </div>
          ))}
        </div>
      </main>

      <footer style={{ marginTop: '4rem', textAlign: 'center', padding: '2rem', borderTop: '1px solid #333' }}>
        <h3>NEED EXPERT OVERSIGHT?</h3>
        <a 
          href="https://thevoiceofcash.com/consultation" 
          style={{ 
            display: 'inline-block',
            marginTop: '1rem', 
            color: '#000',
            backgroundColor: '#00ff41', 
            padding: '1rem 2rem',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          SPEAK TO A HUMAN
        </a>
      </footer>
    </div>
  );
}
