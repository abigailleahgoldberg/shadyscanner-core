import Head from 'next/head';

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Shady Scanner</title>
        <meta name="description" content="Privacy Policy for Shady Scanner. Learn how we collect, use, and protect your personal information." />
      </Head>
      <main style={{ background: '#FFFFFF', color: '#0F1117', minHeight: '100vh', padding: '2rem 1rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <a href="/" style={{ color: '#3B6EF0', display: 'inline-block', marginBottom: '2rem', fontSize: '0.9rem' }}>← Back to Shady Scanner</a>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#0F1117', marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>
            Privacy Policy
          </h1>
          <p style={{ color: '#94A3B8', marginBottom: '2rem', fontSize: '0.9rem' }}>Last updated: March 2026</p>

          <div style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
            <p style={{ lineHeight: 1.8 }}>
              Shady Scanner (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates shadyscanner.com. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </div>

          {[
            { title: '1. Information We Collect', content: (
              <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.8 }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>Email addresses</strong> — when you subscribe or sign up for scanning alerts</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Contact form submissions</strong> — name, email, and message</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Usage data</strong> — pages visited, browser type, anonymized IP</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Cookies</strong> — small files to improve your experience</li>
              </ul>
            )},
            { title: '2. How We Use Your Information', content: (
              <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.8 }}>
                <li style={{ marginBottom: '0.5rem' }}>To respond to inquiries and provide support</li>
                <li style={{ marginBottom: '0.5rem' }}>To send security alerts and updates you&apos;ve subscribed to</li>
                <li style={{ marginBottom: '0.5rem' }}>To improve our AI scanning service</li>
                <li style={{ marginBottom: '0.5rem' }}>To comply with legal obligations</li>
              </ul>
            )},
            { title: '3. Third-Party Services', content: (
              <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.8 }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>Vercel</strong> — website hosting</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Brevo</strong> — email marketing (<a href="https://www.brevo.com/legal/privacypolicy/" style={{ color: '#3B6EF0' }}>Privacy Policy</a>)</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Stripe</strong> — payment processing (<a href="https://stripe.com/privacy" style={{ color: '#3B6EF0' }}>Privacy Policy</a>)</li>
              </ul>
            )},
            { title: '4. Cookies', content: <p style={{ lineHeight: 1.8 }}>We use cookies to enhance your browsing experience. You may disable them in your browser settings, though this may affect site functionality.</p> },
            { title: '5. Data Retention', content: <p style={{ lineHeight: 1.8 }}>We retain personal data as long as necessary. Newsletter subscriber data is retained until you unsubscribe. Contact form submissions are retained for up to 2 years.</p> },
            { title: '6. Your GDPR Rights', content: (
              <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.8 }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>Right of Access</strong> — request a copy of your personal data</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Right to Rectification</strong> — request correction of inaccurate data</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Right to Erasure</strong> — request deletion of your data</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Right to Portability</strong> — receive your data in a machine-readable format</li>
              </ul>
            )},
            { title: '7. Your CCPA Rights', content: (
              <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.8 }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>Right to Know</strong> — what personal information we collect</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Right to Delete</strong> — request deletion</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Right to Opt-Out</strong> — we do not sell personal information</li>
              </ul>
            )},
            { title: '8. Contact Us', content: <p style={{ lineHeight: 1.8 }}>Email: <a href="mailto:thevoiceofcash@gmail.com" style={{ color: '#3B6EF0' }}>thevoiceofcash@gmail.com</a></p> },
          ].map(({ title, content }) => (
            <section key={title} style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#0F1117', marginBottom: '0.8rem', paddingBottom: '0.5rem', borderBottom: '1px solid #E2E8F0' }}>{title}</h2>
              {content}
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
