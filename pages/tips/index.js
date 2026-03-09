import React from 'react';

const tips = [
  { id: 1, category: 'PASSWORDS', title: 'Use a Passphrase, Not a Password', detail: 'Length > Complexity. "correct-horse-battery-staple" is harder to crack than "P@ssw0rd1!".' },
  { id: 2, category: 'SESSIONS', title: 'Clear Your Cookies Weekly', detail: 'Session hijacking is the easiest way to bypass MFA. Terminate stale sessions often.' },
  { id: 3, category: 'MOBILE', title: 'Disable Auto-Join Wi-Fi', detail: 'Evil Twin hotspots wait for your phone to auto-connect. Stay in manual mode.' },
  { id: 4, category: 'EMAIL', title: 'Check the Return-Path', detail: 'The "From" name is a lie. Check the actual return-path header to see the truth.' },
  { id: 5, category: 'GITHUB', title: 'No Secrets in Git', detail: 'Even private repos get leaked. Use environment variables for all API keys.' },
  { id: 6, category: 'CDN', title: 'Use Cloudflare Proxies', detail: 'Hide your actual server IP. If they can find your origin, they can bypass your firewall.' },
  { id: 7, category: 'VPC', title: 'Isolate Your Database', detail: 'Publicly reachable databases (port 3306/5432) are magnets for brute force. Keep them in a private subnet.' },
  { id: 8, category: 'SOCIAL', title: 'SIM Swap Protection', detail: 'Call your carrier and add a "Port-Out PIN". Your phone number is the weakest link in your security.' },
  { id: 9, category: 'BROWSER', title: 'Separate Your Lives', detail: 'Use Different Browser Profiles (Firefox Containers) for work, personal, and shady site browsing.' },
  { id: 10, category: 'HARDWARE', title: 'Buy a YubiKey', detail: 'Hardware codes beat SMS codes 100% of the time. Phishing-proof your identity.' },
  { id: 11, category: 'RECOVERY', title: 'Print Your Backup Codes', detail: "If you lose your MFA device and haven't saved your 10 recovery codes offline, you're locked out forever." },
  { id: 12, category: 'API', title: 'Scope Your Tokens', detail: 'Never create a "Full Access" API token. Give it the absolute minimum permissions needed to function.' },
  { id: 13, category: 'ROUTER', title: 'Update Your Firmware', detail: 'Your home router is an at-risk Linux server. If the manufacturer stopped updates, the hardware is tech-trash.' },
  { id: 14, category: 'METADATA', title: 'Scrub Your Photos', detail: 'Posting a photo from home? Strip the GPS coordinates first or everyone knows your origin.' },
  { id: 15, category: 'PHISHING', title: 'Hover Before You Click', detail: 'Links are masks. Hover over every link to see the ACTUAL destination in the bottom corner of your browser.' },
  { id: 16, category: 'BACKUPS', title: 'The 3-2-1 Rule', detail: "3 copies, 2 different media types, 1 stored off-site. If it doesn't exist in 3 places, it doesn't exist." },
  { id: 17, category: 'DNS', title: 'Use Quad9 or 1.1.1.1', detail: 'Default ISP DNS is slow and monitors your traffic. Switch to a secure, private resolver at the router level.' },
  { id: 18, category: 'ENCRYPTION', title: 'Check the "Lock" Details', detail: 'A green lock just means the connection is encrypted, not that the site is safe. Verify the Certificate Owner.' }
];

export default function Tips() {
  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      color: '#00ff41',
      minHeight: '100vh',
      fontFamily: 'monospace',
      padding: '2rem'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>SHADY SCANNER: STAY SAFE TIPS</h1>
        <p style={{ color: '#888' }}>WU-TANG AI CLAN // DAILY PROTECTION PROTOCOLS</p>
        <nav style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <a href="/" style={{ color: '#00ff41', textDecoration: 'none' }}>[ SCANNER ]</a>
          <a href="/blog" style={{ color: '#00ff41', textDecoration: 'none' }}>[ THE SHADY SCANNER REPORT ]</a>
          <a href="/tips" style={{ color: '#fff', textDecoration: 'none', borderBottom: '2px solid #00ff41' }}>[ STAY SAFE TIPS ]</a>
        </nav>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {tips.map(tip => (
            <div key={tip.id} style={{ 
              border: '1px solid #00ff41', 
              padding: '1.5rem', 
              backgroundColor: '#000',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#00ff41', border: '1px solid #00ff41', padding: '0.2rem 0.5rem' }}>{tip.category}</span>
              </div>
              <h2 style={{ color: '#fff', fontSize: '1.2rem', margin: '1rem 0 0.5rem 0' }}>{tip.title}</h2>
              <p style={{ color: '#ccc', lineHeight: '1.4', flexGrow: 1 }}>{tip.detail}</p>
            </div>
          ))}
        </div>
      </main>

      <footer style={{ marginTop: '4rem', textAlign: 'center', padding: '2rem' }}>
         <a 
          href="https://thevoiceofcash.com/consultation" 
          style={{ 
            color: '#000',
            backgroundColor: '#00ff41', 
            padding: '1rem 2rem',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          CONTACT A SECURITY SPECIALIST
        </a>
      </footer>
    </div>
  );
}
