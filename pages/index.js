import React, { useState, useEffect, useRef } from 'react';

const NAV = [['/', 'Scanner'], ['/tips', 'Tips'], ['/blog', 'Blog'], ['/pricing', 'Pricing']];
const FEATURES = [
  { cat: 'SSL', color: '#16A34A', title: 'SSL & Encryption', desc: 'Certificate validity, TLS version, HSTS enforcement, redirect chains.' },
  { cat: 'EMAIL', color: '#2563EB', title: 'Email Security', desc: 'SPF, DKIM, and DMARC — stops spoofed emails dead in their tracks.' },
  { cat: 'HEADERS', color: '#7C3AED', title: 'Security Headers', desc: 'CSP, X-Frame-Options, referrer policy. The invisible armor layer.' },
  { cat: 'DNS', color: '#0891B2', title: 'DNS Integrity', desc: 'DNSSEC validation. Catches poisoning and misconfigured nameservers.' },
  { cat: 'EXPOSURE', color: '#DB2777', title: 'Exposure Audit', desc: 'Server fingerprinting, open SSH, robots.txt leaks, security.txt.' },
  { cat: 'CDN', color: '#D97706', title: 'CDN & WAF', desc: 'Cloudflare detection — is your origin IP shielded at the edge?' },
];

function ScoreRing({ score, size = 130 }) {
  const r = (size / 2) - 12;
  const circ = 2 * Math.PI * r;
  const color = score >= 80 ? '#16A34A' : score >= 55 ? '#D97706' : '#DC2626';
  const label = score >= 85 ? 'Secure' : score >= 70 ? 'Fair' : score >= 50 ? 'At Risk' : 'Vulnerable';
  const [pct, setPct] = useState(0);
  useEffect(() => { const t = setTimeout(() => setPct(score), 80); return () => clearTimeout(t); }, [score]);
  const dash = circ - (pct / 100) * circ;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E2E8F0" strokeWidth={9} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={9}
          strokeDasharray={circ} strokeDashoffset={dash} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1), stroke 0.3s' }} />
        <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central"
          style={{ transform: `rotate(90deg)`, transformOrigin: `${size/2}px ${size/2}px`,
            fontFamily: "'Editorial New', Georgia, serif", fill: color, fontSize: size * 0.23, fontWeight: 700 }}>
          {score}
        </text>
      </svg>
      <span style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'system-ui' }}>{label}</span>
    </div>
  );
}

function ScanBar({ scanning, step, total }) {
  if (!scanning) return null;
  const pct = Math.round((step / total) * 100);
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, fontSize: 12, color: '#64748B' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3B6EF0', display: 'inline-block', animation: 'pulse 1s infinite' }} />
          Running {total} checks…
        </span>
        <span style={{ color: '#3B6EF0', fontWeight: 600 }}>{pct}%</span>
      </div>
      <div style={{ background: '#E2E8F0', borderRadius: 99, height: 3 }}>
        <div style={{ height: '100%', borderRadius: 99, width: `${pct}%`, background: 'linear-gradient(90deg, #3B6EF0, #6C5CE7)', transition: 'width 0.5s ease' }} />
      </div>
    </div>
  );
}

function Pill({ status }) {
  const s = {
    pass: { bg: '#DCFCE7', color: '#16A34A', border: '#BBF7D0', label: 'Pass' },
    warn: { bg: '#FEF3C7', color: '#D97706', border: '#FDE68A', label: 'Warn' },
    fail: { bg: '#FEE2E2', color: '#DC2626', border: '#FECACA', label: 'Fail' },
  }[status] || { bg: '#FEF3C7', color: '#D97706', border: '#FDE68A', label: 'Warn' };
  return <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 99, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>{s.label}</span>;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(0);
  const TOTAL = 14;
  const resultsRef = useRef(null);

  const scan = async (e) => {
    e?.preventDefault();
    const domain = url.trim().replace(/^https?:\/\//, '').split('/')[0];
    if (!domain || scanning) return;
    setScanning(true); setResult(null); setError(null); setStep(0);
    const iv = setInterval(() => setStep(n => Math.min(n + 1, TOTAL - 1)), 650);
    try {
      const res = await fetch(`/api/scan?url=${encodeURIComponent(domain)}`);
      const data = await res.json();
      clearInterval(iv); setStep(TOTAL);
      if (data.error && !data.indicators) setError(data.error);
      else { setResult(data); setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100); }
    } catch { clearInterval(iv); setError('Scan failed — check the domain and try again.'); }
    finally { setScanning(false); }
  };

  const fails  = result?.indicators.filter(i => i.status === 'fail') || [];
  const warns  = result?.indicators.filter(i => i.status === 'warn') || [];
  const passes = result?.indicators.filter(i => i.status === 'pass') || [];

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
              <a key={href} href={href} style={{ color: '#64748B', textDecoration: 'none', fontSize: 13, fontWeight: 500, padding: '6px 14px', borderRadius: 6, transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#0F1117'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
              >{label}</a>
            ))}
            <span style={{ marginLeft: 10, background: "#E2E8F0", color: "#94A3B8", fontSize: 13, fontWeight: 700, padding: "7px 18px", borderRadius: 7, cursor: "not-allowed" }}>Coming Soon</span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '80px 32px 64px', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: 64, alignItems: 'end' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 20 }}>Free Security Diagnostic</div>
            <h1 style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-3px', lineHeight: 0.92, margin: '0 0 28px', color: '#0F1117' }}>
              Is your<br />website<br /><strong style={{ fontWeight: 800 }}>shady?</strong>
            </h1>
            <p style={{ fontSize: 17, color: '#64748B', lineHeight: 1.7, maxWidth: 440, margin: '0 0 40px' }}>
              We check 14 security signals in under 15 seconds — SSL, DNS, email spoofing, exposed ports, and more. Free. No signup.
            </p>
            <form onSubmit={scan} style={{ maxWidth: 560 }}>
              <div style={{ display: 'flex', gap: 8, background: '#F8F9FC', border: '1px solid #CBD5E1', borderRadius: 12, padding: '7px 7px 7px 18px', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                onFocusCapture={e => { e.currentTarget.style.borderColor = '#3B6EF0'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,110,240,0.1)'; }}
                onBlurCapture={e => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <input type="text" placeholder="yourdomain.com" value={url} onChange={e => setUrl(e.target.value)} disabled={scanning}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#0F1117', fontSize: 16, fontFamily: 'inherit', padding: '8px 0' }} />
                <button type="submit" disabled={scanning || !url} style={{
                  background: !url || scanning ? '#CBD5E1' : 'linear-gradient(135deg, #3B6EF0, #6C5CE7)',
                  color: '#fff', border: 'none', borderRadius: 8, padding: '11px 24px', fontSize: 14,
                  fontWeight: 700, cursor: scanning || !url ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
                }}>{scanning ? 'Scanning…' : 'Scan Now →'}</button>
              </div>
              <ScanBar scanning={scanning} step={step} total={TOTAL} />
              {error && <div style={{ marginTop: 10, background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', color: '#DC2626', fontSize: 13 }}>{error}</div>}
              <p style={{ marginTop: 10, fontSize: 12, color: '#94A3B8' }}>5 free scans per domain · No signup · ~10 seconds</p>
            </form>
          </div>

          {/* Stat sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 150 }}>
            {[['14', 'Security checks'], ['< 15s', 'Scan time'], ['Free', 'No signup'], ['Real-time', 'Live results']].map(([val, label]) => (
              <div key={label} style={{ background: '#F8F9FC', border: '1px solid #E2E8F0', borderRadius: 10, padding: '14px 18px', textAlign: 'right' }}>
                <div style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 22, fontWeight: 700, color: '#3B6EF0' }}>{val}</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2, letterSpacing: '0.04em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      {result && (
        <section ref={resultsRef} style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px' }}>
          <div style={{ background: '#F8F9FC', border: '1px solid #E2E8F0', borderRadius: 16, padding: '28px 32px', marginBottom: 16, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
            <div>
              <div style={{ fontSize: 11, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Results for</div>
              <div style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 26, fontWeight: 700, color: '#0F1117', marginBottom: 14 }}>{result.domain}</div>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, color: '#DC2626', fontWeight: 600 }}>✕ {fails.length} Critical</span>
                <span style={{ fontSize: 13, color: '#D97706', fontWeight: 600 }}>⚠ {warns.length} Warning</span>
                <span style={{ fontSize: 13, color: '#16A34A', fontWeight: 600 }}>✓ {passes.length} Passed</span>
              </div>
            </div>
            <ScoreRing score={result.shadyScore} size={130} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 10, marginBottom: 28 }}>
            {result.indicators.map((ind, i) => {
              const dotColor = ind.status === 'pass' ? '#16A34A' : ind.status === 'fail' ? '#DC2626' : '#D97706';
              return (
                <div key={i} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: '16px 18px', display: 'flex', alignItems: 'flex-start', gap: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: dotColor, flexShrink: 0, marginTop: 6 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0F1117', marginBottom: 3 }}>{ind.name}</div>
                    <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5 }}>{ind.detail}</div>
                  </div>
                  <Pill status={ind.status} />
                </div>
              );
            })}
          </div>

          <div style={{ background: 'linear-gradient(135deg, #EFF6FF, #F5F3FF)', border: '1px solid #BFDBFE', borderRadius: 16, padding: '44px', textAlign: 'center', marginBottom: 48 }}>
            <h3 style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, fontStyle: 'italic', color: '#0F1117', margin: '0 0 10px' }}>
              {fails.length > 0 ? 'Your site has real vulnerabilities.' : 'Good start — close the remaining gaps.'}
            </h3>
            <p style={{ color: '#64748B', fontSize: 15, margin: '0 0 24px', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
              The Voice of Cash delivers hands-on security hardening for businesses that take their digital posture seriously.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://thevoiceofcash.com/consultation" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #3B6EF0, #6C5CE7)', color: '#fff', padding: '13px 30px', borderRadius: 9, textDecoration: 'none', fontWeight: 700, fontSize: 15, boxShadow: '0 4px 16px rgba(59,110,240,0.3)' }}>Speak to a Specialist →</a>
              <span style={{ display: 'inline-block', background: '#E2E8F0', border: '1px solid #CBD5E1', color: '#94A3B8', padding: '13px 30px', borderRadius: 9, fontWeight: 600, fontSize: 15, cursor: 'not-allowed' }}>⏳ Coming Soon</span>
            </div>
          </div>
        </section>
      )}

      {/* WHAT WE CHECK */}
      {!result && (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 32px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 20 }}>What we check</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12, marginBottom: 16 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: '22px', display: 'flex', flexDirection: 'column', gap: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', transition: 'box-shadow 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: f.color, background: f.color + '15', padding: '3px 10px', borderRadius: 4, textTransform: 'uppercase' }}>{f.cat}</span>
                  <span style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 18, fontWeight: 700, color: '#E2E8F0' }}>{String(i+1).padStart(2,'0')}</span>
                </div>
                <div>
                  <div style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 17, fontWeight: 700, color: '#0F1117', marginBottom: 6 }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* $3 MEMBER CTA */}
      <section id="member" style={{ borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '80px 32px', background: '#F8F9FC' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 20 }}>Membership</div>
            <h2 style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-2px', lineHeight: 1.0, margin: '0 0 20px', color: '#0F1117' }}>
              Become a member.<br /><strong style={{ fontWeight: 800 }}>Three bucks a month.</strong>
            </h2>
            <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.7, margin: '0 0 32px', maxWidth: 400 }}>
              Unlimited scans, weekly score reports, and full history across every domain you own. No contracts. Cancel anytime.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-block', background: '#E2E8F0', border: '1px solid #CBD5E1', color: '#94A3B8', padding: '14px 32px', borderRadius: 9, fontWeight: 700, fontSize: 16, cursor: 'not-allowed' }}>⏳ Coming Soon</span>
              <a href="/pricing" style={{ display: 'inline-block', background: '#fff', border: '1px solid #CBD5E1', color: '#475569', padding: '14px 24px', borderRadius: 9, textDecoration: 'none', fontWeight: 500, fontSize: 14 }}>See all plans</a>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[['Unlimited Scans', 'Scan any domain, as many times as you need.'], ['Weekly Score Reports', 'Get your security score emailed every Monday.'], ['Score History & Trends', 'Track how your security improves over time.'], ['Priority Support', 'Questions answered within 24 hours.']].map(([title, desc]) => (
              <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 20px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <span style={{ color: '#16A34A', fontSize: 16, flexShrink: 0, marginTop: 2 }}>✓</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0F1117', marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIPS PREVIEW */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 32px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32, gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 12 }}>Stay Safe Tips</div>
            <h2 style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-1.5px', lineHeight: 1.0, color: '#0F1117', margin: 0 }}>
              Quick wins for<br /><strong style={{ fontWeight: 800, fontStyle: 'italic' }}>immediate protection.</strong>
            </h2>
          </div>
          <a href="/tips" style={{ color: '#3B6EF0', textDecoration: 'none', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>View all 18 →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
          {[
            { cat: 'PASSWORDS', color: '#DB2777', num: '01', title: 'Use a Passphrase, Not a Password', desc: 'Length beats complexity. "correct-horse-battery-staple" is harder to crack than "P@ssw0rd1!".', slug: 'use-a-passphrase-not-a-password' },
            { cat: 'EMAIL', color: '#2563EB', num: '04', title: 'Check the Return-Path', desc: 'The "From" name is a lie. Check the actual return-path header to see the truth.', slug: 'check-the-return-path' },
            { cat: 'HARDWARE', color: '#7C3AED', num: '10', title: 'Buy a YubiKey', desc: 'Hardware codes beat SMS codes 100% of the time. Phishing-proof your identity.', slug: 'buy-a-yubikey' },
          ].map((tip) => (
            <a key={tip.num} href={`/tips/${tip.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', transition: 'box-shadow 0.15s, transform 0.15s', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: tip.color, background: tip.color + '15', padding: '3px 10px', borderRadius: 4, textTransform: 'uppercase' }}>{tip.cat}</span>
                  <span style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: 18, fontWeight: 700, color: '#E2E8F0' }}>{tip.num}</span>
                </div>
                <div style={{ fontFamily: "'Editorial New', Georgia, serif", fontSize: '1.1rem', fontWeight: 700, color: '#0F1117', marginBottom: 10, lineHeight: 1.3, flex: 1 }}>{tip.title}</div>
                <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, margin: '0 0 16px' }}>{tip.desc}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: tip.color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Read article →</div>
              </div>
            </a>
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
        input::placeholder { color: #94A3B8; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media (max-width: 700px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 32px !important; }
          section > div[style*="grid-template-columns: 1fr auto"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
