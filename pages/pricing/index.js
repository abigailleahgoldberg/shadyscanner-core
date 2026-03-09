import React from 'react';
import { Check, Shield, MessageSquare, User, Zap } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'BASIC',
      price: '',
      description: 'Unlimited scans per month for a single site URL.',
      features: ['Unlimited Scan Access', 'Digital Score Reports', 'Standard Email Support', 'Sitemap Monitoring'],
      cta: 'SELECT BASIC',
      icon: <Zap size={24} />
    },
    {
      name: 'PRO',
      price: '9',
      popular: true,
      description: 'Full coverage with interactive automation.',
      features: ['Everything in Basic', 'Chatbot Rep Access', 'Priority Dashboard', 'Weekly Security Audit'],
      cta: 'SELECT PRO',
      icon: <MessageSquare size={24} />
    },
    {
      name: 'BUSINESS',
      price: '9',
      description: 'The ultimate oversight for high-value targets.',
      features: ['Everything in Pro', 'Human Rep (Live Advice)', 'Direct WhatsApp Support', 'Full System Hardening'],
      cta: 'SELECT BUSINESS',
      icon: <User size={24} />
    }
  ];

  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      color: '#00ff41',
      minHeight: '100vh',
      fontFamily: 'monospace',
      padding: '2rem'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>PRICING</h1>
        <p style={{ color: '#888' }}>WU-TANG AI CLAN // SHADYSCANNER SOLUTIONS</p>
        <p style={{ marginTop: '1rem', color: '#ccc' }}>
          *Add an additional site to any plan for only /month per site.
        </p>
        <nav style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <a href="/" style={{ color: '#00ff41', textDecoration: 'none' }}>[ SCANNER ]</a>
          <a href="/blog" style={{ color: '#00ff41', textDecoration: 'none' }}>[ THE SHADY SCANNER REPORT ]</a>
          <a href="/pricing" style={{ color: '#fff', textDecoration: 'none', borderBottom: '2px solid #00ff41' }}>[ PRICING ]</a>
        </nav>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {plans.map((plan, i) => (
          <div key={i} style={{ 
            border: plan.popular ? '2px solid #00ff41' : '1px solid #333',
            backgroundColor: '#111',
            borderRadius: '8px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            {plan.popular && (
              <div style={{ 
                position: 'absolute', 
                top: '-15px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                backgroundColor: '#00ff41',
                color: '#000',
                padding: '2px 10px',
                fontSize: '0.7rem',
                fontWeight: 'bold'
              }}>MOST POPULAR</div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ color: '#fff' }}>{plan.name}</h2>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>{plan.price}<span style={{ fontSize: '1rem', color: '#888' }}>/mo</span></div>
              </div>
              <div style={{ color: '#00ff41' }}>{plan.icon}</div>
            </div>
            <p style={{ color: '#888', margin: '1rem 0' }}>{plan.description}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0', flexGrow: 1 }}>
              {plan.features.map((f, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  <Check size={16} style={{ color: '#00ff41' }} /> {f}
                </li>
              ))}
            </ul>
            <a 
              href="https://thevoiceofcash.com/consultation" 
              style={{
                textAlign: 'center',
                padding: '1rem',
                backgroundColor: plan.popular ? '#00ff41' : '#000',
                color: plan.popular ? '#000' : '#00ff41',
                border: `1px solid #00ff41`,
                fontWeight: 'bold',
                textDecoration: 'none',
                marginTop: '1rem'
              }}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </main>

      <footer style={{ marginTop: '4rem', textAlign: 'center', padding: '2rem', color: '#444' }}>
        Invoicing and payments distributed via thevoiceofcash.com
      </footer>
    </div>
  );
}
