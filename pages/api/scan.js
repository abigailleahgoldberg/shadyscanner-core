import { exec } from 'child_process';
import util from 'util';
import https from 'https';

const execPromise = util.promisify(exec);

const scanMap = new Map();

async function safeExec(cmd, timeout = 8000) {
  try {
    const { stdout, stderr } = await Promise.race([
      execPromise(cmd),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
    ]);
    return stdout + (stderr || '');
  } catch {
    return '';
  }
}

async function fetchHeaders(domain) {
  return new Promise((resolve) => {
    const req = https.request(
      { host: domain, path: '/', method: 'HEAD', timeout: 6000 },
      (res) => resolve({ status: res.statusCode, headers: res.headers })
    );
    req.on('error', () => resolve({ status: 0, headers: {} }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, headers: {} }); });
    req.end();
  });
}

export default async function handler(req, res) {
  const { url } = req.query;
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress;

  if (!url) return res.status(400).json({ error: 'URL required' });

  const domain = url.replace(/https?:\/\//, '').replace(/\/.*$/, '').toLowerCase().trim();
  if (!domain || domain.length > 200) return res.status(400).json({ error: 'Invalid domain' });

  const trackerKey = `${ip}:${domain}`;
  const scanCount = scanMap.get(trackerKey) || 0;
  if (scanCount >= 5) {
    return res.status(403).json({
      limitReached: true,
      error: 'FREE SCAN LIMIT EXCEEDED',
      message: 'You have exhausted your 5 free scans for this domain. Upgrade to Basic for unlimited access.'
    });
  }

  // Run all checks in parallel
  const [
    curlResult,
    httpRedirectResult,
    dnsSpf,
    dnsDmarc,
    dnsDkim,
    dnsDnssec,
    dnsNs,
    portResult,
    tlsResult,
    robotsResult,
    securityTxtResult,
    headerData
  ] = await Promise.all([
    safeExec(`curl -Is --max-time 6 https://${domain}`),
    safeExec(`curl -Is --max-time 6 http://${domain} -L --max-redirs 3`),
    safeExec(`dig +short TXT ${domain} 2>/dev/null`),
    safeExec(`dig +short TXT _dmarc.${domain} 2>/dev/null`),
    safeExec(`dig +short TXT default._domainkey.${domain} 2>/dev/null`),
    safeExec(`dig +dnssec ${domain} A 2>/dev/null`),
    safeExec(`dig +short NS ${domain} 2>/dev/null`),
    safeExec(`nc -zvw4 ${domain} 443 80 22 2>&1`),
    safeExec(`echo | timeout 5 openssl s_client -connect ${domain}:443 -tls1_3 2>&1 | head -30`),
    safeExec(`curl -s --max-time 5 https://${domain}/robots.txt 2>/dev/null | head -60`),
    safeExec(`curl -s --max-time 5 https://${domain}/.well-known/security.txt 2>/dev/null | head -10`),
    fetchHeaders(domain)
  ]);

  const h = headerData.headers || {};
  const indicators = [];

  // ── 1. SSL/TLS Health ─────────────────────────────────────────────────────
  const sslPass = curlResult.includes('HTTP/');
  indicators.push({
    name: 'SSL/TLS Certificate',
    status: sslPass ? 'pass' : 'fail',
    detail: sslPass ? 'Certificate valid & reachable over HTTPS' : 'Certificate missing or expired',
    weight: 15
  });

  // ── 2. TLS 1.3 Support ────────────────────────────────────────────────────
  const tls13 = tlsResult.includes('TLSv1.3') || tlsResult.includes('TLS 1.3');
  indicators.push({
    name: 'TLS 1.3 Support',
    status: tls13 ? 'pass' : 'warn',
    detail: tls13 ? 'TLS 1.3 negotiated (latest standard)' : 'TLS 1.3 not detected — older cipher in use',
    weight: 6
  });

  // ── 3. HSTS ───────────────────────────────────────────────────────────────
  const hsts = curlResult.includes('strict-transport-security') || !!h['strict-transport-security'];
  const hstsLong = (h['strict-transport-security'] || '').includes('max-age=31536000');
  indicators.push({
    name: 'HSTS Policy',
    status: hsts ? (hstsLong ? 'pass' : 'warn') : 'fail',
    detail: hsts
      ? (hstsLong ? 'HSTS enforced with 1-year max-age' : 'HSTS active but max-age below recommended')
      : 'No HSTS header — browser can be tricked into HTTP',
    weight: 8
  });

  // ── 4. HTTP→HTTPS Redirect ────────────────────────────────────────────────
  const httpsRedirect = httpRedirectResult.includes('https://') || httpRedirectResult.toLowerCase().includes('location: https://');
  indicators.push({
    name: 'HTTP → HTTPS Redirect',
    status: httpsRedirect ? 'pass' : 'warn',
    detail: httpsRedirect ? 'All HTTP traffic auto-redirected to HTTPS' : 'HTTP version may be accessible without redirect',
    weight: 6
  });

  // ── 5. Content Security Policy ────────────────────────────────────────────
  const csp = !!h['content-security-policy'] || curlResult.includes('content-security-policy');
  indicators.push({
    name: 'Content Security Policy',
    status: csp ? 'pass' : 'warn',
    detail: csp ? 'CSP header present — XSS injection limited' : 'No CSP header — cross-site scripting risk',
    weight: 7
  });

  // ── 6. Clickjacking Protection ────────────────────────────────────────────
  const xframe = !!h['x-frame-options'] || curlResult.includes('x-frame-options');
  const frameAncestors = (h['content-security-policy'] || '').includes('frame-ancestors');
  indicators.push({
    name: 'Clickjacking Protection',
    status: (xframe || frameAncestors) ? 'pass' : 'warn',
    detail: (xframe || frameAncestors)
      ? 'X-Frame-Options or CSP frame-ancestors set'
      : 'Missing clickjacking headers — UI redressing possible',
    weight: 5
  });

  // ── 7. Server Info Leakage ────────────────────────────────────────────────
  const serverHeader = h['server'] || '';
  const xPowered = h['x-powered-by'] || '';
  const leaks = serverHeader.match(/\d+\.\d+/) || xPowered.length > 0;
  indicators.push({
    name: 'Server Info Exposure',
    status: leaks ? 'warn' : 'pass',
    detail: leaks
      ? `Server fingerprint exposed: ${[serverHeader, xPowered].filter(Boolean).join(' / ')}`
      : 'Server version hidden from response headers',
    weight: 5
  });

  // ── 8. SPF Record ─────────────────────────────────────────────────────────
  const spf = dnsSpf.includes('v=spf1');
  indicators.push({
    name: 'SPF Email Record',
    status: spf ? 'pass' : 'fail',
    detail: spf ? 'SPF record present — spoofing harder' : 'No SPF record — domain can be spoofed in email',
    weight: 8
  });

  // ── 9. DMARC Policy ───────────────────────────────────────────────────────
  const dmarc = dnsDmarc.includes('v=DMARC1');
  const dmarcReject = dnsDmarc.includes('p=reject');
  indicators.push({
    name: 'DMARC Policy',
    status: dmarc ? (dmarcReject ? 'pass' : 'warn') : 'fail',
    detail: dmarc
      ? (dmarcReject ? 'DMARC p=reject — full email protection' : 'DMARC active but policy is not reject')
      : 'No DMARC record — phishing emails can pass as you',
    weight: 8
  });

  // ── 10. DNSSEC ────────────────────────────────────────────────────────────
  const dnssec = dnsDnssec.includes('RRSIG') || dnsDnssec.includes('ad;');
  indicators.push({
    name: 'DNSSEC',
    status: dnssec ? 'pass' : 'warn',
    detail: dnssec ? 'DNSSEC validated — DNS hijacking resisted' : 'DNSSEC not detected — DNS poisoning possible',
    weight: 5
  });

  // ── 11. CDN / WAF Protection ─────────────────────────────────────────────
  const cfRay = curlResult.includes('cf-ray') || !!h['cf-ray'];
  const anyWaf = cfRay || curlResult.includes('x-amz-cf') || curlResult.includes('x-cache');
  indicators.push({
    name: 'CDN / WAF Protection',
    status: anyWaf ? 'pass' : 'warn',
    detail: anyWaf
      ? (cfRay ? 'Cloudflare WAF active — DDoS & bot protection on' : 'CDN layer detected')
      : 'No CDN or WAF detected — origin IP exposed to attacks',
    weight: 6
  });

  // ── 12. SSH Exposure ─────────────────────────────────────────────────────
  const sshOpen = portResult.includes('22') && (portResult.includes('succeeded') || portResult.includes('open'));
  indicators.push({
    name: 'SSH Port Exposure',
    status: sshOpen ? 'warn' : 'pass',
    detail: sshOpen ? 'Port 22 open — SSH publicly reachable (should be firewalled)' : 'SSH port not publicly accessible',
    weight: 7
  });

  // ── 13. Security.txt ──────────────────────────────────────────────────────
  const secTxt = securityTxtResult.includes('Contact:') || securityTxtResult.includes('contact:');
  indicators.push({
    name: 'Security.txt Disclosure',
    status: secTxt ? 'pass' : 'warn',
    detail: secTxt ? 'security.txt present — responsible disclosure policy active' : 'No security.txt — no public bug report channel',
    weight: 3
  });

  // ── 14. Robots.txt Sensitive Exposure ────────────────────────────────────
  const robotsExists = robotsResult.includes('User-agent') || robotsResult.includes('Disallow');
  const robotsLeaks = robotsResult.match(/Disallow:\s*\/(admin|wp-admin|dashboard|config|backup|\.env)/i);
  indicators.push({
    name: 'Robots.txt Exposure',
    status: !robotsExists ? 'warn' : (robotsLeaks ? 'warn' : 'pass'),
    detail: robotsLeaks
      ? `Sensitive path exposed in robots.txt: ${robotsLeaks[0].trim()}`
      : robotsExists
        ? 'robots.txt present — crawl policy defined'
        : 'No robots.txt — crawler behavior undefined',
    weight: 3
  });

  // ── Calculate Dynamic Score ───────────────────────────────────────────────
  let totalWeight = 0;
  let earned = 0;
  for (const ind of indicators) {
    totalWeight += ind.weight;
    if (ind.status === 'pass') earned += ind.weight;
    else if (ind.status === 'warn') earned += ind.weight * 0.5;
  }
  const shadyScore = Math.round((earned / totalWeight) * 100);

  scanMap.set(trackerKey, scanCount + 1);

  return res.status(200).json({
    domain,
    shadyScore,
    scanCount: scanCount + 1,
    indicators: indicators.map(({ name, status, detail }) => ({ name, status, detail }))
  });
}
