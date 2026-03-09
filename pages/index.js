import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, AlertCircle, Search, Activity, Lock, Globe, Zap } from 'lucide-react';

export default function ShadyScanner() {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const startScan = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setScanning(true);
    setResult(null);
    setError(null);
    
    try {
      const cleanUrl = url.trim().replace(/^https?:\/\//, '').split('/')[0];
      const response = await fetch(`/api/scan?url=${encodeURIComponent(cleanUrl)}`);
      const data = await response.json();
      
      if (data.error && !data.indicators) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (e) {
      setError('SCAN CONNECTION FAILED. SYSTEM OFFLINE.');
    } finally {
      setScanning(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      color: '#00ff41',
      minHeight: '100vh',
      fontFamily: 'monospace',
      padding: '1rem'
    }}>
      {/* HEADER & NAV */}
      <header style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '2rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 8vw, 4rem)', fontWeight: 'bold', letterSpacing: '-2px', textShadow: '0 0 10px #00ff4133' }}>
          SHADY SCANNER
        </h1>
        <p style={{ color: '#888', letterSpacing: '2px', fontSize: '0.8rem' }}>
          WU-TANG AI CLAN // SECURITY OVERSIGHT
        </p>
        <nav style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', fontSize: '0.9rem' }}>
          <a href="/" style={{ color: '#fff', textDecoration: 'none', borderBottom: '2px solid #00ff41' }}>[ FREE SCAN ]</a>
          <a href="/blog" style={{ color: '#00ff41', textDecoration: 'none' }}>[ THE SHADY SCANNER REPORT ]</a>
          <a href="/tips" style={{ color: '#00ff41', textDecoration: 'none' }}>[ STAY SAFE TIPS ]</a>
        </nav>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* HERO / SCANNER BOX */}
        <section style={{ 
          border: '1px solid #00ff4166', 
          backgroundColor: '#111',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          <div style={{ padding: '2.5rem', borderBottom: '1px solid #00ff4122' }}>
            <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
              IS YOUR WEBSITE SHADY?
            </h2>
            <form onSubmit={startScan} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ position: 'relative', display: 'flex' }}>
                <input 
                  type="text" 
                  autoFocus
                  placeholder="ENTER DOMAIN (e.g. yoursite.com)" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1.2rem',
                    backgroundColor: '#000',
                    border: '1px solid #333',
                    color: '#fff',
                    fontSize: '1.1rem',
                    outline: 'none',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <button 
                type="submit"
                disabled={scanning}
                style={{
                  width: '100%',
                  padding: '1.2rem',
                  backgroundColor: scanning ? '#111' : '#00ff41',
                  color: '#000',
                  border: 'none',
                  fontWeight: '900',
                  fontSize: '1.2rem',
                  cursor: scanning ? 'not-allowed' : 'pointer',
                  borderRadius: '4px',
                  transition: 'all 0.2s'
                }}
              >
                {scanning ? 'INITIATING SCAN...' : 'RUN FREE DIAGNOSTIC'}
              </button>
            </form>
            {error && <p style={{ color: '#ff4141', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
          </div>

          {/* RESULTS AREA */}
          {result && (
            <div style={{ padding: '2.5rem', backgroundColor: '#050505', animation: 'fadeIn 0.5s' }}>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                mdDirection: 'row',
                justifyContent: 'space-between', 
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, color: '#888' }}>SCAN RESULTS FOR:</h3>
                  <code style={{ fontSize: '1.5rem', color: '#fff' }}>{result.domain}</code>
                </div>
                <div style={{ 
                  textAlign: 'center',
                  padding: '1rem 2rem', 
                  backgroundColor: result.shadyScore > 70 ? '#00441b' : '#440000',
                  color: result.shadyScore > 70 ? '#00ff41' : '#ff4141',
                  borderRadius: '4px',
                  border: `1px solid ${result.shadyScore > 70 ? '#00ff41' : '#ff4141'}`
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>SHADY SCORE</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{result.shadyScore}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {result.indicators.map((ind, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.2rem',
                    backgroundColor: '#111',
                    borderLeft: `4px solid ${ind.status === 'pass' ? '#00ff41' : '#ffcc00'}`
                  }}>
                    <div style={{ color: ind.status === 'pass' ? '#00ff41' : '#ffcc00' }}>
                      {ind.status === 'pass' ? <ShieldCheck size={24} /> : <AlertCircle size={24} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{ind.name}</div>
                      <div style={{ color: '#888', fontSize: '0.8rem' }}>{ind.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CONVERSION CTA */}
              <div style={{ 
                marginTop: '3.5rem', 
                padding: '2.5rem', 
                backgroundColor: '#111', 
                textAlign: 'center',
                border: '2px dashed #00ff4166',
                borderRadius: '8px'
              }}>
                <h3 style={{ color: '#fff', fontSize: '1.4rem' }}>VULNERABILITIES DETECTED</h3>
                <p style={{ color: '#ccc', margin: '1rem 0' }}>The scan shows security inconsistencies that could lead to data loss or ranking penalties.</p>
                <a 
                  href="https://thevoiceofcash.com/consultation" 
                  style={{ 
                    display: 'inline-block',
                    marginTop: '1rem', 
                    color: '#000',
                    backgroundColor: '#00ff41', 
                    padding: '1.2rem 2.5rem',
                    textDecoration: 'none',
                    fontWeight: '900',
                    fontSize: '1.1rem',
                    borderRadius: '4px'
                  }}
                >
                  SPEAK TO A HUMAN SPECIALIST
                </a>
                <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: '#666' }}>
                  Professional hardening provided by the Voice of Cash.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* TRUST SIGNALS */}
        <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          <div>
            <Lock size={32} style={{ marginBottom: '1rem' }} />
            <h4>ENCRYPTED</h4>
            <p style={{ color: '#666', fontSize: '0.8rem' }}>SSL/TLS validation on every scan.</p>
          </div>
          <div>
            <Globe size={32} style={{ marginBottom: '1rem' }} />
            <h4>GLOBAL DNS</h4>
            <p style={{ color: '#666', fontSize: '0.8rem' }}>Cross-continent resolver verification.</p>
          </div>
          <div>
            <Zap size={32} style={{ marginBottom: '1rem' }} />
            <h4>REAL-TIME</h4>
            <p style={{ color: '#666', fontSize: '0.8rem' }}>Zero-token lightning fast probes.</p>
          </div>
        </div>
      </main>

      <footer style={{ marginTop: '6rem', textAlign: 'center', color: '#444', fontSize: '0.8rem', paddingBottom: '2rem' }}>
        &copy; 2026 WU-TANG AI CLAN // SHADYSCANNER.COM // ALL RIGHTS RESERVED
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
