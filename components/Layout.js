import React from 'react';
const NAV = [['/', 'Scanner'], ['/tips', 'Tips'], ['/blog', 'Blog'], ['/pricing', 'Pricing']];

export function Nav({ active }) {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border)', padding: '0 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>Shady</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 300, fontStyle: 'italic', color: 'var(--accent)' }}>Scanner</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {NAV.map(([href, label]) => (
            <a key={href} href={href} style={{ color: active === href ? 'var(--text)' : 'var(--mid)', textDecoration: 'none', fontSize: 13, fontWeight: 500, padding: '6px 14px', borderRadius: 6, transition: 'color 0.15s', borderBottom: active === href ? '2px solid var(--accent)' : '2px solid transparent' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color = active === href ? 'var(--text)' : 'var(--mid)'}
            >{label}</a>
          ))}
          <a href="#member" style={{ marginLeft: 10, background: 'var(--accent)', color: '#fff', fontSize: 13, fontWeight: 700, padding: '7px 18px', borderRadius: 7, textDecoration: 'none' }}>Join $3/mo →</a>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 32px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 13, color: 'var(--dim)' }}>© 2026 <a href="https://thevoiceofcash.com" style={{ color: 'var(--mid)', textDecoration: 'none' }}>The Voice of Cash</a> · ShadyScanner.com</span>
        <div style={{ display: 'flex', gap: 20 }}>
          {[['/', 'Scanner'], ['/tips', 'Tips'], ['/blog', 'Blog'], ['/pricing', 'Pricing'], ['https://thevoiceofcash.com/consultation', 'Get Help']].map(([href, label]) => (
            <a key={label} href={href} style={{ color: 'var(--dim)', textDecoration: 'none', fontSize: 12 }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--mid)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--dim)'}
            >{label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children, active }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Nav active={active} />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}
