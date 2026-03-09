import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

// In-memory rate limiting (Note: resets on server restart, for production we'd use a DB)
const scanMap = new Map();

export default async function handler(req, res) {
  const { url } = req.query;
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress;
  
  if (!url) {
    return res.status(400).json({ error: 'URL required' });
  }

  // Clean the URL to be just the domain
  const domain = url.replace(/https?:\/\//, '').split('/')[0];

  // Logic: 5 scans per domain per IP
  const trackerKey = `${ip}:${domain}`;
  const domainHistory = scanMap.get(trackerKey) || 0;

  if (domainHistory >= 5) {
    return res.status(403).json({ 
      limitReached: true,
      error: 'FREE SCAN LIMIT EXCEEDED', 
      message: 'You have exhausted your 5 free scans for this domain. Upgrade to Basic for unlimited access.' 
    });
  }

  try {
    // 1. SSL/TLS Health via Curl
    const { stdout: curlHeader } = await execPromise(`curl -Is https://${domain} --connect-timeout 5`);
    const sslStatus = curlHeader.includes('HTTP/') ? 'pass' : 'fail';

    // 2. Port Check
    const { stdout: ncCheck } = await execPromise(`nc -zvw5 ${domain} 443 80`);
    const portStatus = ncCheck.includes('succeeded') ? 'pass' : 'warn';

    // 3. DNS Security
    const { stdout: spfCheck } = await execPromise(`dig +short TXT ${domain}`);
    const dnsStatus = spfCheck.includes('v=spf1') ? 'pass' : 'warn';

    // Increment scan count
    scanMap.set(trackerKey, domainHistory + 1);

    res.status(200).json({
      domain,
      shadyScore: 82,
      status: 'Live',
      scanCount: domainHistory + 1,
      indicators: [
        { name: 'SSL/TLS Health', status: sslStatus, detail: sslStatus === 'pass' ? 'Active & Reachable' : 'Error/Hidden' },
        { name: 'Security Headers', status: curlHeader.includes('strict-transport-security') ? 'pass' : 'warn', detail: curlHeader.includes('strict-transport-security') ? 'HSTS Policy Active' : 'Missing HSTS' },
        { name: 'Open Ports', status: portStatus, detail: portStatus === 'pass' ? '80/443 Open' : 'Possible Blocking' },
        { name: 'DNS Security', status: dnsStatus, detail: dnsStatus === 'pass' ? 'SPF Record Found' : 'Incomplete Policy' }
      ]
    });
  } catch (error) {
    res.status(200).json({ 
      error: 'Incomplete Scan', 
      domain,
      shadyScore: 40,
      indicators: [{ name: 'System', status: 'warn', detail: 'External connection timed out' }] 
    });
  }
}
