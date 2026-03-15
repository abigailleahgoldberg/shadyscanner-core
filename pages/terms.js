import Head from 'next/head';

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Service | Shady Scanner</title>
        <meta name="description" content="Terms of Service for Shady Scanner." />
      </Head>
      <main style={{ background: '#FFFFFF', color: '#0F1117', minHeight: '100vh', padding: '2rem 1rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <a href="/" style={{ color: '#3B6EF0', display: 'inline-block', marginBottom: '2rem', fontSize: '0.9rem' }}>← Back to Shady Scanner</a>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#0F1117', marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>
            Terms of Service
          </h1>
          <p style={{ color: '#94A3B8', marginBottom: '2rem', fontSize: '0.9rem' }}>Last updated: March 2026</p>

          <div style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
            <p style={{ lineHeight: 1.8 }}>
              Please read these Terms of Service carefully before using shadyscanner.com operated by The Voice of Cash. By accessing or using our service, you agree to be bound by these terms.
            </p>
          </div>

          {[
            { title: '1. Acceptance of Terms', content: <p style={{ lineHeight: 1.8 }}>By using shadyscanner.com, you accept and agree to be bound by these Terms of Service and our Privacy Policy.</p> },
            { title: '2. Description of Service', content: <p style={{ lineHeight: 1.8 }}>Shady Scanner provides AI-powered security scanning for websites, APIs, and business tools. We may modify or discontinue any aspect at any time.</p> },
            { title: '3. Intellectual Property', content: <p style={{ lineHeight: 1.8 }}>All content on shadyscanner.com is the property of The Voice of Cash / Shady Scanner and protected by copyright laws. You may not reproduce or distribute content without written permission.</p> },
            { title: '4. User Responsibilities', content: (
              <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.8 }}>
                <li style={{ marginBottom: '0.5rem' }}>Use the service for lawful purposes only</li>
                <li style={{ marginBottom: '0.5rem' }}>Do not misuse scanning results for malicious purposes</li>
                <li style={{ marginBottom: '0.5rem' }}>Do not attempt unauthorized access to our systems</li>
                <li style={{ marginBottom: '0.5rem' }}>Provide accurate information when using our services</li>
              </ul>
            )},
            { title: '5. Limitation of Liability', content: <p style={{ lineHeight: 1.8 }}>To the fullest extent permitted by law, The Voice of Cash and Shady Scanner shall not be liable for any indirect, incidental, or consequential damages arising from your use of this service.</p> },
            { title: '6. Indemnification', content: <p style={{ lineHeight: 1.8 }}>You agree to indemnify and hold harmless The Voice of Cash and Shady Scanner from claims arising from your use of the website or violation of these terms.</p> },
            { title: '7. Governing Law', content: <p style={{ lineHeight: 1.8 }}>These terms are governed by the laws of the State of Nevada. Disputes are subject to the exclusive jurisdiction of Nevada courts.</p> },
            { title: '8. Changes to Terms', content: <p style={{ lineHeight: 1.8 }}>We may modify these terms at any time. Continued use constitutes acceptance of modified terms.</p> },
            { title: '9. Contact Us', content: <p style={{ lineHeight: 1.8 }}>Email: <a href="mailto:thevoiceofcash@gmail.com" style={{ color: '#3B6EF0' }}>thevoiceofcash@gmail.com</a></p> },
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
