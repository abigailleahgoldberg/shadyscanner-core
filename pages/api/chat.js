export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { messages } = req.body;
  if (!messages?.length) return res.status(400).json({ error: 'No messages' });

  const systemPrompt = `You are the ShadyScanner assistant — a sharp, helpful security advisor for shadyscanner.com, powered by The Voice of Cash.

Your job: help website owners understand their security risks, explain what our scan results mean, and convert interested visitors into paying members or consultation clients.

Key facts about ShadyScanner:
- Free: 5 scans per domain, no signup, 14-point security check
- Membership: $3/month — unlimited scans, weekly reports, score history
- Pro: $29/month — up to 10 domains, weekly audit
- Business: $99/month — unlimited domains, human specialist, full hardening
- Built by The Voice of Cash (thevoiceofcash.com) — Las Vegas-based AI implementation firm
- 14 checks: SSL/TLS, HSTS, HTTP redirect, CSP, clickjacking, server exposure, SPF, DMARC, DNSSEC, CDN/WAF, SSH ports, security.txt, robots.txt, TLS 1.3

Tone: Direct, confident, not corporate. You know your stuff. You're a trusted advisor, not a sales bot. Give real answers. If someone has a vulnerability, explain it clearly and offer to help.

When someone mentions a vulnerability or score, explain what it means concretely and what the fix looks like.

Keep responses under 4 sentences unless a detailed explanation is truly needed. End with a soft prompt toward action when appropriate.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Something went wrong — try again.';
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: 'Chat service unavailable.' });
  }
}
