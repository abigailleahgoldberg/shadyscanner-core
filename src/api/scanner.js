const axios = require('axios');
const dns = require('dns').promises;

async function scanDomain(target) {
  const reports = {};
  
  // 1. DNS Check
  try {
    reports.dns = await dns.resolve(target, 'A');
  } catch (e) { reports.dns = 'failed'; }

  // 2. SSL/Header Check (Lightweight)
  try {
    const res = await axios.get(`https://${target}`, { timeout: 5000 });
    reports.headers = res.headers;
    reports.status = res.status;
  } catch (e) { reports.headers = 'unreachable'; }

  return reports;
}

module.exports = { scanDomain };
