import React from 'react';

const NAV = [['/', 'Scanner'], ['/tips', 'Tips'], ['/blog', 'Blog'], ['/pricing', 'Pricing']];

const PLANS = [
  {
    name: 'Free',
    price: '0',
    period: null,
    tagline: 'Try it, no strings.',
    description: 'Run up to 5 scans on a single site per IP. No account, no credit card — just results.',
    features: [
      '14-point security scan',
      'Dynamic Shady Score',
      'Pass / Warn / Fail results',
      '5 scans per IP limit',
      'Single domain at a time',
    ],
    cta: 'Run a free scan',
    href: '/',
    highlight: false,
    accent: '#64748B',
  },
  {
    name: 'Member',
    price: '3',
    period: '/mo',
    tagline: 'The no-brainer plan.',
    description: 'Unlimited scans, weekly score reports, and full history. Cancel anytime.',
    features: [
      'Unlimited domain scans',
      'Weekly security score reports',
      'Score history & trends',
      'All 14 indicators tracked',
      'Priority email support',
    ],
    cta: 'Join for $3/month',
    href: '/join',
    highlight: false,
    accent: '#3B6EF0',
  },
  {
    name: 'Pro',
    price: '19',
    period: '/mo',
    tagline: 'For serious operators.',
    description: 'Multi-domain monitoring, deeper audits, and weekly reports across your entire stack.',
    features: [
      'Everything in Member',
      'Up to 10 domains monitored',
      'Weekly audit across all domains',
      'Priority support queue',
      'Score comparison dashboard',
    ],
    cta: 'Get Pro',
    href: '/join?plan=pro',
    highlight: true,
    badge: 'Most Popular',
    accent: '#3B6EF0',
  },
  {
    name: 'Business',
    price: '99',
    period: '/mo',
    tagline: 'A human in your corner.',
    description: 'Unlimited domains, full-service hardening, and a live specialist from The Voice of Cash.',
    features: [
      'Everything in Pro',
      'Unlimited domains',
      'Dedicated security specialist',
      'Monthly strategy call',
      'Custom hardening playbook',
    ],
    cta: 'Get Business',
    href: 'https://thevoiceofcash.com/consultation',
    highlight: false,
    accent: '#6C5CE7',
  },
];

export default function Pricing() {
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
              <a key={href} href={href} style={{ color: href === '/pricing' ? '#0F1117' : '#64748B', fontWeight: href === '/pricing' ? 600 : 500, textDecoration: 'none', fontSize: 13, padding: '6px 14px', borderRadius: 6, borderBottom: href === '/pricing' ? '2px solid #3B6EF0' : '2px solid transparent' }}
                onMouseEnter={e => e.currentTarget.style.color = '#0F1117'}
                onMouseLeave={e => e.currentTarget.style.color = href === '/pricing' ? '#0F1117' : '#64748B'}
              >{label}</a>
            ))}
            <a href="/join" style={{ marginLeft: 10, background: '#3B6EF0', color: '#fff', fontSize: 13, fontWeight: 700, padding: '7px 18px', borderRadius: 7, textDecoration: 'none' }}>Join $3/mo →</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '72px 32px 56px', borderBottom: '1px solid #E2E8F0', background: '#F8F9FC', textAlign: 'center' }}>
        <div style={{ maxWidth: 620, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 16 }}>Pricing</div>
          <h1 style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 'clamp(2.4rem, 6vw, 4rem)', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-2px', lineHeight: 1.0, color: '#0F1117', marginBottom: 16 }}>
            Pick your<br /><strong style={{ fontWeight: 800, fontStyle: 'italic' }}>protection level.</strong>
          </h1>
          <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.7 }}>
            Every plan includes the full 14-point diagnostic. Start free — upgrade when you're ready.
          </p>
        </div>
      </section>

      {/* PLANS GRID */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 32px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 14, alignItems: 'start' }}>
          {PLANS.map((plan) => (
            <div key={plan.name} style={{
              background: '#fff',
              border: plan.highlight ? '2px solid #3B6EF0' : '1px solid #E2E8F0',
              borderRadius: 18,
              padding: '32px 28px',
              display: 'flex', flexDirection: 'column',
              boxShadow: plan.highlight ? '0 8px 40px rgba(59,110,240,0.14)' : '0 1px 4px rgba(0,0,0,0.04)',
              position: 'relative',
              transform: plan.highlight ? 'translateY(-4px)' : 'none',
            }}>
              {plan.badge && (
                <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #3B6EF0, #6C5CE7)', color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 14px', borderRadius: 99, whiteSpace: 'nowrap', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {plan.badge}
                </div>
              )}

              {/* Plan name + tagline */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: plan.accent, textTransform: 'uppercase', marginBottom: 6 }}>{plan.name}</div>
                <div style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 15, fontWeight: 500, fontStyle: 'italic', color: '#475569', marginBottom: 16 }}>{plan.tagline}</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, marginBottom: 10 }}>
                  <span style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 52, fontWeight: 800, color: '#0F1117', lineHeight: 1 }}>${plan.price}</span>
                  {plan.period && <span style={{ fontSize: 14, color: '#94A3B8', fontWeight: 500, marginBottom: 8 }}>{plan.period}</span>}
                  {!plan.period && <span style={{ fontSize: 14, color: '#94A3B8', fontWeight: 500, marginBottom: 8 }}>&nbsp;forever</span>}
                </div>
                <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, margin: 0 }}>{plan.description}</p>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: '#F1F5F9', margin: '0 0 20px' }} />

              {/* Features */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                    <span style={{ color: '#16A34A', flexShrink: 0, marginTop: 1, fontSize: 13 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a href={plan.href} style={{
                display: 'block', textAlign: 'center',
                background: plan.highlight ? 'linear-gradient(135deg, #3B6EF0, #6C5CE7)' : '#F8F9FC',
                color: plan.highlight ? '#fff' : '#0F1117',
                border: plan.highlight ? 'none' : '1px solid #E2E8F0',
                padding: '13px 20px', borderRadius: 10, textDecoration: 'none',
                fontWeight: 700, fontSize: 14,
                boxShadow: plan.highlight ? '0 4px 16px rgba(59,110,240,0.3)' : 'none',
                transition: 'all 0.15s',
              }}
                onMouseEnter={e => {
                  if (plan.highlight) { e.currentTarget.style.boxShadow = '0 8px 24px rgba(59,110,240,0.45)'; e.currentTarget.style.transform = 'translateY(-1px)'; }
                  else { e.currentTarget.style.background = '#F1F5F9'; }
                }}
                onMouseLeave={e => {
                  if (plan.highlight) { e.currentTarget.style.boxShadow = '0 4px 16px rgba(59,110,240,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }
                  else { e.currentTarget.style.background = '#F8F9FC'; }
                }}
              >{plan.cta} →</a>
            </div>
          ))}
        </div>

        {/* FAQ / compare row */}
        <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
          {[
            ['Can I cancel anytime?', 'Yes — no contracts, no lock-ins. Cancel from your account in one click.'],
            ['What counts as a "scan"?', 'Each domain URL you submit is one scan. Subdomains and www. variants each count separately.'],
            ['Is Business really human support?', 'Yes. A security specialist from The Voice of Cash handles your account personally.'],
          ].map(([q, a]) => (
            <div key={q} style={{ background: '#F8F9FC', border: '1px solid #E2E8F0', borderRadius: 14, padding: '22px 24px' }}>
              <div style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 15, fontWeight: 700, color: '#0F1117', marginBottom: 8 }}>{q}</div>
              <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>{a}</div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #E2E8F0', padding: '28px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#94A3B8' }}>© 2026 <a href="https://thevoiceofcash.com" style={{ color: '#64748B', textDecoration: 'none' }}>The Voice of Cash</a> · ShadyScanner.com</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['/', 'Scanner'], ['/tips', 'Tips'], ['/blog', 'Blog'], ['/pricing', 'Pricing'], ['https://thevoiceofcash.com/consultation', 'Get Help']].map(([href, label]) => (
              <a key={label} href={href} style={{ color: '#94A3B8', textDecoration: 'none', fontSize: 12 }}
                onMouseEnter={e => e.currentTarget.style.color = '#64748B'}
                onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
              >{label}</a>
            ))}
          </div>
        </div>
      </footer>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fff; }
        @media (max-width: 600px) {
          div[style*="translateY(-4px)"] { transform: none !important; }
        }
      `}</style>
    </div>
  );
}
