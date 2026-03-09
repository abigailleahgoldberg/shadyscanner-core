import React, { useState, useEffect, useRef } from 'react';

const GREETING = "Is your site shady — and do you need help with it? I can explain your scan results, walk you through any vulnerability, or help you figure out the right plan.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: GREETING }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const bottomRef = useRef(null);

  // Auto-open after 4s on first visit
  useEffect(() => {
    const seen = sessionStorage.getItem('chat_greeted');
    if (!seen) {
      const t = setTimeout(() => {
        setOpen(true);
        setHasOpened(true);
        sessionStorage.setItem('chat_greeted', '1');
      }, 4000);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      setMessages(m => [...m, { role: 'assistant', content: data.reply || 'Something went wrong.' }]);
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Connection lost. Try again in a moment.' }]);
    } finally { setLoading(false); }
  };

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 88, right: 24, zIndex: 9999,
          width: 360, maxHeight: 500,
          background: '#0f1117', border: '1px solid #1e2d47',
          borderRadius: 16, boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
          display: 'flex', flexDirection: 'column',
          fontFamily: "'Inter', system-ui, sans-serif",
          animation: 'slideUp 0.25s ease',
        }}>
          {/* Header */}
          <div style={{ padding: '16px 18px', borderBottom: '1px solid #1e2d47', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#F1F5F9' }}>ShadyScanner Assistant</div>
              <div style={{ fontSize: 11, color: '#34D399', display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34D399', display: 'inline-block' }} />
                Online now
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: 20, lineHeight: 1, padding: 4 }}>×</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '82%',
                  padding: '10px 14px',
                  borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: m.role === 'user' ? 'linear-gradient(135deg, #5B8CF9, #8B7CF8)' : '#1a2235',
                  color: '#F1F5F9',
                  fontSize: 13,
                  lineHeight: 1.6,
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ background: '#1a2235', borderRadius: '14px 14px 14px 4px', padding: '10px 16px' }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[0,1,2].map(n => <span key={n} style={{ width: 6, height: 6, borderRadius: '50%', background: '#475569', display: 'inline-block', animation: `bounce 1.2s ${n*0.2}s infinite` }} />)}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick reply chips */}
          {messages.length <= 1 && (
            <div style={{ padding: '0 14px 10px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['What does my score mean?', 'What is $3 membership?', 'How do I fix HSTS?', 'What is DMARC?'].map(q => (
                <button key={q} onClick={() => { setInput(q); }} style={{ background: '#1a2235', border: '1px solid #252a3a', color: '#94A3B8', fontSize: 11, padding: '5px 10px', borderRadius: 99, cursor: 'pointer', fontFamily: 'inherit' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#5B8CF9'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#252a3a'}
                >{q}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid #1e2d47', display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask about your scan results..."
              style={{ flex: 1, background: '#1a2235', border: '1px solid #252a3a', borderRadius: 9, padding: '9px 14px', color: '#F1F5F9', fontSize: 13, fontFamily: 'inherit', outline: 'none' }}
            />
            <button onClick={send} disabled={loading || !input.trim()} style={{
              background: input.trim() ? 'linear-gradient(135deg, #5B8CF9, #8B7CF8)' : '#1a2235',
              border: 'none', borderRadius: 9, padding: '9px 14px', color: '#fff', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', fontSize: 16
            }}>→</button>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          width: 56, height: 56, borderRadius: '50%',
          background: open ? '#1a2235' : 'linear-gradient(135deg, #5B8CF9, #8B7CF8)',
          border: 'none', cursor: 'pointer', boxShadow: '0 4px 24px rgba(91,140,249,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
          transition: 'all 0.2s',
        }}
        aria-label="Chat"
      >
        {open ? '✕' : '💬'}
      </button>

      {/* Notification dot (before first open) */}
      {!open && !hasOpened && (
        <span style={{ position: 'fixed', bottom: 68, right: 20, zIndex: 10000, width: 10, height: 10, borderRadius: '50%', background: '#34D399', border: '2px solid #0f1117', animation: 'pulse 2s infinite' }} />
      )}

      <style>{`
        @keyframes slideUp { from { opacity:0; transform: translateY(16px); } to { opacity:1; transform: translateY(0); } }
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </>
  );
}
