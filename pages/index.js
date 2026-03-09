import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, AlertCircle, Search, ExternalLink, Activity, Info, FileText } from 'lucide-react';

export default function ShadyScanner() {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const startScan = async (e) => {
    e.preventDefault();
    setScanning(true);
    setResult(null);
    
    // Simulate backend scan for phase 1 demo
    setTimeout(() => {
      setResult({
        domain: url,
        shadyScore: 82,
        status: 'Safe',
        indicators: [
          { name: 'SSL/TLS Health', status: 'pass', detail: 'TLS 1.3 Active - Expires in 84 days' },
          { name: 'Security Headers', status: 'warn', detail: 'Missing HSTS and CSP' },
          { name: 'Open Ports', status: 'pass', detail: 'Only 80/443 exposed' },
          { name: 'DNS Security', status: 'warn', detail: 'DMARC not configured' }
        ]
      });
      setScanning(false);
    }, 2000);
  };

  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      color: '#00ff41',
      minHeight: '100vh',
      fontFamily: 'monospace',
      padding: '2rem'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0' }}>SHADY SCANNER</h1>
        <p style={{ color: '#888' }}>WU-TANG AI CLAN // SECURITY OVERSIGHT</p>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto' }}>
        <section style={{ 
          border: '1px solid #333', 
          padding: '2rem', 
          backgroundColor: '#111',
          borderRadius: '4px'
        }}>
          <form onClick={startScan} style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="ENTER DOMAIN TO SCAN (e.g. google.com)" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{
                flexGrow: 1,
                padding: '1rem',
                backgroundColor: '#000',
                border: '1px solid #333',
                color: '#fff',
                fontSize: '1rem'
              }}
            />
            <button 
              type="submit"
              disabled={scanning}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#00ff41',
                color: '#000',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {scanning ? 'SCANNING...' : 'SCAN'}
            </button>
          </form>

          {result && (
            <div style={{ marginTop: '3rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingBottom: '1rem',
                borderBottom: '1px solid #333'
              }}>
                <h2 style={{ margin: 0 }}>REPORT: {result.domain}</h2>
                <div style={{ 
                  padding: '0.5rem 1rem', 
                  backgroundColor: result.shadyScore > 70 ? '#00441b' : '#440000',
                  color: result.shadyScore > 70 ? '#00ff41' : '#ff4141',
                  borderRadius: '20px'
                }}>
                  SHADY SCORE: {result.shadyScore}/100
                </div>
              </div>

              <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
                {result.indicators.map((ind, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    padding: '1rem',
                    backgroundColor: '#000',
                    borderLeft: `4px solid ${ind.status === 'pass' ? '#00ff41' : '#ffcc00'}`
                  }}>
                    <span>{ind.name}</span>
                    <span style={{ color: '#888' }}>{ind.detail}</span>
                  </div>
                ))}
              </div>

              <div style={{ 
                marginTop: '3rem', 
                padding: '2rem', 
                backgroundColor: '#1a1a1a', 
                textAlign: 'center',
                border: '1px dashed #00ff41'
              }}>
                <h3>NEED THIS REPAIRED?</h3>
                <p>Website issues are vulnerabilities. Speak to a real specialist.</p>
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
                  BOOK CONSULTATION
                </a>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer style={{ marginTop: '4rem', textAlign: 'center', color: '#444', fontSize: '0.8rem' }}>
        &copy; 2026 WU-TANG AI CLAN // SHADYSCANNER.COM // POWERED BY SLIM SHADY
      </footer>
    </div>
  );
}
