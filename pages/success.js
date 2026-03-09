import React, { useEffect, useState } from 'react';

const PLAN_NAMES = { member: 'Member', pro: 'Pro', business: 'Business' };
const PLAN_PRICES = { member: '$3', pro: '$19', business: '$99' };

export default function Success() {
  const [plan, setPlan]       = useState('member');
  const [billing, setBilling] = useState('monthly');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('plan'))    setPlan(params.get('plan'));
    if (params.get('billing')) setBilling(params.get('billing'));
  }, []);

  const planName  = PLAN_NAMES[plan]  || 'Member';
  const planPrice = PLAN_PRICES[plan] || '$3';

  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#0F1117', fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', flexDirection: 'column' }}>

      {/* NAV */}
      <nav style={{ borderBottom: '1px solid #E2E8F0', padding: '0 32px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', height: 60 }}>
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <span style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 20, fontWeight: 700, color: '#0F1117' }}>Shady</span>
            <span style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 20, fontWeight: 300, fontStyle: 'italic', color: '#3B6EF0' }}>Scanner</span>
          </a>
        </div>
      </nav>

      {/* BODY */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 32px' }}>
        <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>

          {/* Checkmark */}
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#DCFCE7', border: '2px solid #BBF7D0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 12 }}>You're in</div>
          <h1 style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, fontStyle: 'italic', letterSpacing: '-1.5px', color: '#0F1117', margin: '0 0 16px', lineHeight: 1.05 }}>
            Welcome to {planName}.
          </h1>
          <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.7, margin: '0 0 32px' }}>
            Your {planName} subscription ({planPrice}/{billing === 'annual' ? 'year' : 'mo'}) is active. Check your email for a confirmation — then head back to the scanner and run unlimited checks.
          </p>

          {/* What's next */}
          <div style={{ background: '#F8F9FC', border: '1px solid #E2E8F0', borderRadius: 14, padding: '24px', textAlign: 'left', marginBottom: 28 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 14 }}>What's next</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                ['Scan your domain', 'Run a full 14-point check on any domain, as many times as you want.'],
                ['Check your email', 'A welcome receipt is on its way. Weekly score reports start this Monday.'],
                ['Need more help?', 'Use the chat widget on any page to ask questions about your results.'],
              ].map(([title, desc]) => (
                <div key={title} style={{ display: 'flex', gap: 12 }}>
                  <span style={{ color: '#3B6EF0', fontSize: 14, flexShrink: 0, marginTop: 2 }}>→</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0F1117', marginBottom: 2 }}>{title}</div>
                    <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/" style={{ background: 'linear-gradient(135deg, #3B6EF0, #6C5CE7)', color: '#fff', padding: '13px 28px', borderRadius: 9, textDecoration: 'none', fontWeight: 700, fontSize: 15, boxShadow: '0 4px 16px rgba(59,110,240,0.3)' }}>
              Run a scan →
            </a>
            <a href="/tips" style={{ background: '#F8F9FC', border: '1px solid #E2E8F0', color: '#475569', padding: '13px 24px', borderRadius: 9, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
              Browse security tips
            </a>
          </div>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid #E2E8F0', padding: '24px 32px', textAlign: 'center' }}>
        <span style={{ fontSize: 12, color: '#94A3B8' }}>© 2026 <a href="https://thevoiceofcash.com" style={{ color: '#64748B', textDecoration: 'none' }}>The Voice of Cash</a> · ShadyScanner.com</span>
      </footer>

      <style jsx global>{`* { box-sizing: border-box; margin: 0; padding: 0; } body { background: #fff; }`}</style>
    </div>
  );
}
