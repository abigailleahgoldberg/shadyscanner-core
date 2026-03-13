import React, { useState } from 'react';

const NAV = [['/', 'Scanner'], ['/tips', 'Tips'], ['/blog', 'Blog'], ['/pricing', 'Pricing']];

const FEATURES = [
  'Unlimited domain scans — no daily cap',
  'Weekly security score reports by email',
  'Full scan history & score trends over time',
  'All 14 security indicators tracked',
  'Priority email support (24h response)',
  'Early access to new scan checks',
];

const PLAN_LABELS = {
  member: { name: 'Member', monthly: '$3', annual: '$30', monthlyFull: '$3/month', annualFull: '$30/year' },
  pro:    { name: 'Pro',    monthly: '$19', annual: '$190', monthlyFull: '$19/month', annualFull: '$190/year' },
};

export default function Join() {
  const [billing,  setBilling]  = useState('monthly');
  const [plan,     setPlan]     = useState('member');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  const monthly = billing === 'monthly';
  const labels  = PLAN_LABELS[plan] || PLAN_LABELS.member;
  const price   = monthly ? labels.monthly : labels.annual;
  const period  = monthly ? '/month' : '/year';
  const sub     = monthly ? 'Billed monthly. Cancel anytime.' : 'Billed once per year. Cancel anytime.';
  const badge   = !monthly ? 'Save 17% — 2 months free' : null;

  // Purchasing is temporarily disabled — coming soon
  const handleCheckout = async () => {
    // Stripe checkout disabled until launch
    // setLoading(true);
    // setError(null);
    // try {
    //   const res  = await fetch('/api/stripe-checkout', {
    //     method:  'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body:    JSON.stringify({ plan, billing }),
    //   });
    //   const data = await res.json();
    //   if (data.url) {
    //     window.location.href = data.url;
    //   } else {
    //     setError(data.error || 'Something went wrong. Please try again.');
    //     setLoading(false);
    //   }
    // } catch (e) {
    //   setError('Network error — please try again.');
    //   setLoading(false);
    // }
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#0F1117', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #E2E8F0', padding: '0 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <span style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 20, fontWeight: 700, color: '#0F1117' }}>Shady</span>
            <span style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 20, fontWeight: 300, fontStyle: 'italic', color: '#3B6EF0' }}>Scanner</span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {NAV.map(([href, label]) => (
              <a key={href} href={href} style={{ color: '#64748B', textDecoration: 'none', fontSize: 13, fontWeight: 500, padding: '6px 14px', borderRadius: 6 }}
                onMouseEnter={e => e.currentTarget.style.color = '#0F1117'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
              >{label}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <section style={{ padding: '64px 32px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 16 }}>ShadyScanner Membership</div>
          <h1 style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-2px', lineHeight: 1.05, color: '#0F1117', margin: '0 0 16px' }}>
            Clean up your<br /><strong style={{ fontWeight: 800 }}>digital presence.</strong>
          </h1>
          <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.7, margin: '0 0 32px' }}>
            Unlimited scans. Weekly reports. Full history. Start in under a minute.
          </p>
        </div>
      </section>

      {/* PLAN SELECTOR */}
      <section style={{ padding: '0 32px', textAlign: 'center', marginBottom: 0 }}>
        <div style={{ display: 'inline-flex', background: '#F1F5F9', borderRadius: 99, padding: 4, gap: 2, marginBottom: 20 }}>
          {[['member', 'Member — $3/mo'], ['pro', 'Pro — $19/mo']].map(([key, label]) => (
            <button key={key} onClick={() => setPlan(key)} style={{
              padding: '8px 22px', borderRadius: 99, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: plan === key ? '#fff' : 'transparent',
              color: plan === key ? '#0F1117' : '#94A3B8',
              boxShadow: plan === key ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s', fontFamily: "'Inter', system-ui, sans-serif",
            }}>{label}</button>
          ))}
        </div>
      </section>

      {/* BILLING TOGGLE */}
      <section style={{ padding: '0 32px 48px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', background: '#F1F5F9', borderRadius: 99, padding: 4, gap: 2, marginBottom: 40 }}>
          {[['monthly', 'Monthly'], ['annual', 'Annual']].map(([key, label]) => (
            <button key={key} onClick={() => setBilling(key)} style={{
              padding: '8px 24px', borderRadius: 99, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              background: billing === key ? '#fff' : 'transparent',
              color: billing === key ? '#0F1117' : '#94A3B8',
              boxShadow: billing === key ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s', fontFamily: "'Inter', system-ui, sans-serif",
            }}>{label}</button>
          ))}
        </div>

        {/* PRICE CARD */}
        <div style={{ maxWidth: 420, margin: '0 auto' }}>
          <div style={{ background: '#fff', border: '2px solid #3B6EF0', borderRadius: 20, padding: '36px 40px', boxShadow: '0 8px 40px rgba(59,110,240,0.12)', position: 'relative' }}>
            {badge && (
              <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #3B6EF0, #6C5CE7)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 99, whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>
                {badge}
              </div>
            )}

            {/* Price */}
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#3B6EF0', textTransform: 'uppercase', marginBottom: 8 }}>{labels.name}</div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 2 }}>
                <span style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 64, fontWeight: 800, color: '#0F1117', lineHeight: 1 }}>{price}</span>
                <span style={{ fontSize: 16, color: '#94A3B8', marginTop: 14, fontWeight: 500 }}>{period}</span>
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 8 }}>{sub}</div>
            </div>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28, textAlign: 'left' }}>
              {FEATURES.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ color: '#16A34A', fontSize: 15, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 14, color: '#475569', lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', color: '#DC2626', fontSize: 13, marginBottom: 16, textAlign: 'left' }}>
                {error}
              </div>
            )}

            {/* CTA — Purchasing disabled, coming soon */}
            <button disabled style={{
              display: 'block', width: '100%',
              background: '#E2E8F0',
              color: '#94A3B8', border: '1px solid #CBD5E1',
              padding: '16px', borderRadius: 10,
              fontWeight: 700, fontSize: 16, cursor: 'not-allowed',
              fontFamily: "'Inter', system-ui, sans-serif",
            }}>
              ⏳ Coming Soon
            </button>

            {/* Coming soon note */}
            <div style={{ textAlign: 'center', marginTop: 14, padding: '12px 16px', background: '#F8F9FC', border: '1px solid #E2E8F0', borderRadius: 8 }}>
              <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>
                Purchasing will be available soon. Stay tuned.
              </p>
            </div>
          </div>

          {/* Annual savings note */}
          {!monthly && (
            <div style={{ background: '#F8F9FC', border: '1px solid #E2E8F0', borderRadius: 12, padding: '14px 20px', marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748B' }}>vs. monthly billing</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#16A34A' }}>{plan === 'pro' ? 'You save $38/year' : 'You save $6/year'}</span>
            </div>
          )}
        </div>

        {/* Human fallback */}
        <div style={{ marginTop: 40, maxWidth: 420, marginLeft: 'auto', marginRight: 'auto', padding: '20px 24px', background: '#F8F9FC', border: '1px solid #E2E8F0', borderRadius: 14 }}>
          <p style={{ fontSize: 14, color: '#64748B', margin: '0 0 10px', lineHeight: 1.6 }}>
            <strong style={{ color: '#0F1117' }}>Running 10+ domains or need a full security audit?</strong><br />
            Our specialists at The Voice of Cash can handle it personally.
          </p>
          <a href="https://thevoiceofcash.com/consultation" style={{ fontSize: 13, fontWeight: 700, color: '#3B6EF0', textDecoration: 'none' }}>
            Speak to a security specialist →
          </a>
        </div>
      </section>

      {/* TRUST ROW */}
      <section style={{ borderTop: '1px solid #E2E8F0', padding: '40px 32px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
          {[['🔒', 'Stripe Encrypted', 'Payment secured by Stripe'], ['📧', 'Instant Access', 'Activate within minutes'], ['↩', 'Cancel Anytime', 'No questions asked']].map(([icon, title, desc]) => (
            <div key={title} style={{ textAlign: 'center', minWidth: 120 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0F1117', marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #E2E8F0', padding: '28px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#94A3B8' }}>© 2026 <a href="https://thevoiceofcash.com" style={{ color: '#64748B', textDecoration: 'none' }}>The Voice of Cash</a> · ShadyScanner.com</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['/', 'Scanner'], ['/tips', 'Tips'], ['/blog', 'Blog'], ['/pricing', 'Pricing']].map(([href, label]) => (
              <a key={label} href={href} style={{ color: '#94A3B8', textDecoration: 'none', fontSize: 12 }}
                onMouseEnter={e => e.currentTarget.style.color = '#64748B'}
                onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
              >{label}</a>
            ))}
          </div>
        </div>
      </footer>

      <style jsx global>{`* { box-sizing: border-box; margin: 0; padding: 0; } body { background: #fff; }`}</style>
    </div>
  );
}
