export const tips = [
  {
    id: 1,
    slug: 'use-a-passphrase-not-a-password',
    category: 'PASSWORDS',
    title: 'Use a Passphrase, Not a Password',
    detail: 'Length > Complexity. "correct-horse-battery-staple" is harder to crack than "P@ssw0rd1!".',
    article: `
## The Problem With "Strong" Passwords

For decades, the advice has been the same: mix uppercase, lowercase, numbers, and symbols. The result? Passwords like "P@ssw0rd1!" that are simultaneously hard for humans to remember and relatively easy for computers to crack.

Modern password crackers use dictionary attacks, rules, and GPU brute-force that shred these "complex" passwords in hours. A dictionary attack tries every known word and common substitution (@ for a, 0 for o, 1 for l). Your "clever" substitutions aren't clever to a machine.

## Why Passphrases Win

A passphrase like **correct-horse-battery-staple** is four random common words strung together. It's 28 characters long. Even if an attacker knows you're using this technique, the math is brutal for them:

- Assuming a vocabulary of 7,500 common words
- 4 random words = 7,500⁴ = 3.16 trillion possible combinations
- At 100 billion guesses/second (high-end GPU cluster), that's 8 hours to crack
- Add a 5th word and it becomes 880 years

"P@ssw0rd1!" with full complexity rules? A well-equipped attacker cracks it in under a minute.

## How to Generate a Good Passphrase

1. **Use a password manager** (Bitwarden, 1Password) to generate truly random passphrases
2. **Dice roll method (Diceware)**: Roll a real die 5 times, look up the word in the Diceware word list. Repeat 4–6 times.
3. **Never use phrases from songs, movies, or famous quotes** — those are in the dictionaries

## Storing Passphrases

A passphrase is still a password — don't reuse it across sites. Use a password manager:

- **Bitwarden** — free, open source, audited
- **1Password** — best UX, teams feature
- **KeePassXC** — offline, local storage

## The Bottom Line

The strongest password is one you didn't choose — generated randomly and stored in a vault. But if you must memorize a password for your vault master key or emergency access, make it a passphrase. 4+ random words, no predictable substitutions.

Length beats complexity every time.
    `.trim()
  },
  {
    id: 2,
    slug: 'clear-your-cookies-weekly',
    category: 'SESSIONS',
    title: 'Clear Your Cookies Weekly',
    detail: 'Session hijacking is the easiest way to bypass MFA. Terminate stale sessions often.',
    article: `
## What Is Session Hijacking?

When you log into a website, the server gives your browser a session token — a long random string stored in a cookie. Every request you make sends that token, and the server trusts it as "proof" that you're logged in.

Session hijacking is when an attacker steals that token and uses it themselves. They don't need your password. They don't need your MFA code. They just need that cookie.

## How Tokens Get Stolen

- **Cross-Site Scripting (XSS)**: A vulnerability in the website injects malicious JavaScript that reads your cookies and sends them to the attacker
- **Man-in-the-Middle (MITM)**: On an unencrypted or weakly encrypted network, someone intercepts your traffic
- **Physical access**: Someone with momentary access to your browser exports your cookies (tools like Cookie-Editor make this trivial)
- **Malware**: Info-stealer malware harvests browser cookies from your filesystem

## Why MFA Doesn't Help Here

Multi-factor authentication protects the **login** event. But a stolen session token bypasses login entirely — the server thinks you're already authenticated. This is why the 2FA you set up doesn't protect you from session theft.

## The Fix: Terminate Stale Sessions

**Weekly habits:**
1. Clear cookies for sensitive sites (email, banking, work tools)
2. Check active sessions in your accounts (Google, Facebook, GitHub all show this) and revoke ones you don't recognize
3. Use browser profiles — keep work, personal, and "shady" browsing separate (see the Browser Profiles tip)

**For site owners:**
- Set short session expiry (15–30 min for sensitive apps)
- Implement \`HttpOnly\` and \`Secure\` cookie flags
- Bind sessions to IP address or user agent where feasible
- Rotate session tokens after privilege escalation

## Tools That Help

- **Firefox Multi-Account Containers** — isolates cookies by container, limits blast radius
- **Cookie AutoDelete** extension — auto-wipes cookies for sites you haven't visited recently
- **Privacy Badger** — blocks tracking cookies at the source

Clearing cookies is low effort and high return. Make it a weekly ritual.
    `.trim()
  },
  {
    id: 3,
    slug: 'disable-auto-join-wifi',
    category: 'MOBILE',
    title: 'Disable Auto-Join Wi-Fi',
    detail: 'Evil Twin hotspots wait for your phone to auto-connect. Stay in manual mode.',
    article: `
## The Evil Twin Attack

Your phone remembers every Wi-Fi network you've ever connected to. When it sees a network with a matching name (SSID), it connects automatically.

An "Evil Twin" attack is when someone sets up a fake hotspot with the same name as a real one — "Starbucks Wi-Fi", "Airport_Free_WiFi", "xfinitywifi" — and waits for devices to auto-join. Once connected, all your traffic routes through the attacker's machine.

They can see unencrypted traffic, inject ads or malware into HTTP pages, and perform SSL stripping attacks on HTTPS connections. Most users never notice.

## Who Does This?

This isn't theoretical. Evil Twin attacks are a common technique for:

- Credential harvesting at conferences and airports
- Corporate espionage targeting traveling employees
- Targeted attacks on individuals at known locations

The equipment needed? A $30 USB Wi-Fi adapter and free software. This is beginner-level hacking.

## How to Protect Yourself

**On iPhone:**
- Settings → Wi-Fi → tap the (i) next to each saved network → toggle off "Auto-Join"
- Settings → Wi-Fi → Ask to Join Networks → set to "Ask" instead of "Automatic"

**On Android:**
- Settings → Network & Internet → Wi-Fi → Saved Networks → remove networks you don't use

**For everyone:**
- **Use a VPN** on public Wi-Fi — even if you do get MITM'd, they see encrypted VPN traffic
- **Forget networks** you don't regularly use
- **Use your phone's mobile hotspot** instead of public Wi-Fi for anything sensitive

## The Bigger Picture

Auto-join is a convenience feature with a real security cost. Your phone silently hands your traffic to anyone who can guess a network name you've connected to before. Manual Wi-Fi selection adds two seconds of friction and eliminates an entire attack surface.

Turn off auto-join. Connect intentionally.
    `.trim()
  },
  {
    id: 4,
    slug: 'check-the-return-path',
    category: 'EMAIL',
    title: 'Check the Return-Path',
    detail: 'The "From" name is a lie. Check the actual return-path header to see the truth.',
    article: `
## The Anatomy of a Phishing Email

Email has a fundamental design flaw: the "From" name you see in your inbox is not verified. Any mail server can send an email claiming to be from "PayPal Security Team" or "Your Bank". The display name is cosmetic — it's set by whoever sends the email.

What the display name hides is the actual sending infrastructure. That's where the truth lives.

## How to Check the Return-Path

The Return-Path (also called the "envelope from" or "bounce address") is where delivery failures get sent. It's set by the sending mail server and is much harder to convincingly fake.

**In Gmail:**
1. Open the email
2. Click the three-dot menu → "Show original"
3. Look for \`Return-Path:\` in the raw headers
4. The domain in that address is who actually sent the email

**In Apple Mail:**
1. View → Message → All Headers
2. Find \`Return-Path:\`

**Red flags to look for:**
- From: PayPal <service@paypal.com> but Return-Path: \`bounce@random-server123.com\`
- Mismatched domains (paypal.com vs paypa1.com vs paypal-secure.net)
- Return-Path from a country-code domain you don't recognize

## What Legitimate Return-Paths Look Like

Real companies have aligned FROM and Return-Path domains, and they'll pass SPF, DKIM, and DMARC checks. In Gmail's "Show original" view, look for:

\`\`\`
SPF: PASS
DKIM: PASS
DMARC: PASS
\`\`\`

If any of these fail on an email claiming to be from your bank, treat it as a phishing attempt.

## Training Your Eye

The best defense is pattern recognition built over time:
- Does the greeting use your actual name or "Dear Customer"?
- Is there urgency pressure ("Act now or your account will be closed")?
- Does the link domain match the company when you hover over it?
- Is the return-path domain aligned with the from domain?

One right-click on "Show original" takes five seconds and can save you from a credential-stealing phishing page.
    `.trim()
  },
  {
    id: 5,
    slug: 'no-secrets-in-git',
    category: 'GITHUB',
    title: 'No Secrets in Git',
    detail: 'Even private repos get leaked. Use environment variables for all API keys.',
    article: `
## The Secret In Your Commit History

Git never forgets. Even if you delete a file, add it to .gitignore, or overwrite a line in your code — if that secret was ever committed, it exists in your git history. Anyone with access to the repository (now or in the future) can run \`git log\` and find it.

This isn't hypothetical. GitHub scans repositories for credentials continuously and notifies companies when their secrets are exposed. Millions of API keys are leaked via public repos every year.

## How It Happens

1. Developer adds \`STRIPE_SECRET_KEY=sk_live_xxx\` directly in code to "test quickly"
2. They commit and push
3. They realize the mistake, delete the line, commit again
4. The secret is now gone from the current file but permanently in the git history
5. The repo is later made public, sold, transferred, or compromised

## The Correct Pattern: Environment Variables

API keys, database passwords, tokens — everything sensitive goes in environment variables. Never in code.

**Local development:**
\`\`\`bash
# .env file (ALWAYS in .gitignore)
STRIPE_SECRET_KEY=sk_live_xxx
DATABASE_URL=postgres://user:pass@localhost/mydb
\`\`\`

**In code:**
\`\`\`javascript
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
\`\`\`

**In production:**
Set environment variables through your hosting platform (Vercel, Railway, AWS Secrets Manager, etc.) — never in the codebase.

## If You've Already Leaked a Secret

1. **Rotate it immediately** — invalidate the old key and generate a new one. Assume the old one is compromised.
2. **Check your access logs** — see if the exposed key was used by anyone other than you
3. **Remove from history** using \`git filter-branch\` or \`BFG Repo Cleaner\` — but this doesn't help if the repo was already public or cloned
4. **Add a pre-commit hook** to prevent future leaks (tools: \`git-secrets\`, \`trufflehog\`, \`gitleaks\`)

## Scanning Your Repos

Run \`trufflehog\` or \`gitleaks\` against your repos periodically:

\`\`\`bash
docker run --rm -v "$PWD:/repo" trufflesecurity/trufflehog git file:///repo
\`\`\`

One scan, one hour, could find credentials you forgot existed.
    `.trim()
  },
  {
    id: 6,
    slug: 'use-cloudflare-proxies',
    category: 'CDN',
    title: 'Use Cloudflare Proxies',
    detail: 'Hide your actual server IP. If they can find your origin, they can bypass your firewall.',
    article: `
## Why Your Server IP Is Your Weakest Link

You've set up Cloudflare. You have DDoS protection, WAF rules, rate limiting. You feel secure.

But if someone knows your origin server's real IP address, they can bypass everything. They skip Cloudflare entirely and send traffic straight to your server. All your protection becomes irrelevant.

## How Origin IPs Get Exposed

- **Historical DNS records**: Services like SecurityTrails and Shodan catalog DNS history. If you ever pointed your domain directly at your server before adding Cloudflare, that IP is in the database
- **Email headers**: If your server sends emails, the sending IP can appear in email headers
- **Subdomains**: You put your main domain through Cloudflare but left mail.yourdomain.com or staging.yourdomain.com as direct A records
- **SSL certificates**: Certificate Transparency logs show every certificate ever issued for your domain — including ones issued before Cloudflare
- **Misconfigured apps**: Your app returns server-identifying headers or error messages that reveal infrastructure details

## What the Cloudflare Orange Cloud Actually Does

When you set a DNS record in Cloudflare with the "orange cloud" (proxied) enabled:
1. Cloudflare gives the world two Cloudflare IPs for your domain
2. All traffic hits Cloudflare's network first
3. Cloudflare filters, inspects, and then forwards clean traffic to your real IP
4. Your real IP never appears in DNS responses

## Hardening Your Origin

After proxying through Cloudflare, lock down your origin server:

1. **Firewall rule**: Accept HTTP/HTTPS traffic ONLY from Cloudflare IP ranges (published at cloudflare.com/ips)
2. **Cloudflare Authenticated Origin Pulls**: Your server only accepts connections with Cloudflare's client certificate
3. **Audit your subdomains**: Every unproxied A record is a potential IP leak

## Free Tier Is Enough

Cloudflare's free plan includes:
- DDoS mitigation
- CDN with global edge caching
- Basic WAF rules
- SSL/TLS termination

There's no reason to expose your origin server directly. Proxy everything through Cloudflare and lock your firewall to their IP ranges.
    `.trim()
  },
  {
    id: 7,
    slug: 'isolate-your-database',
    category: 'VPC',
    title: 'Isolate Your Database',
    detail: 'Publicly reachable databases (port 3306/5432) are magnets for brute force. Keep them in a private subnet.',
    article: `
## The Publicly Exposed Database Problem

Shodan, the search engine for internet-connected devices, indexes millions of exposed databases every day. MySQL on port 3306, PostgreSQL on 5432, MongoDB on 27017, Redis on 6379 — all visible to anyone who searches.

Automated bots scan the entire IPv4 address space continuously. Within minutes of a database becoming internet-accessible, it will see brute-force attempts. Default credentials (root/root, admin/admin, blank passwords) are tried first. Then common passwords. It's relentless and automated.

## What Happens When They Get In

- **Data theft**: Customer PII, payment records, credentials — exfiltrated immediately
- **Ransomware**: Data is encrypted and a ransom note is left (MongoDB attacks in particular)
- **Backdoor creation**: New admin accounts created for persistent access
- **Supply chain pivoting**: Your database becomes the jump point to attack your customers

## The Right Architecture: Private Subnets

Your database should never have a public IP. The only things that should connect to it are your application servers, and only from inside your private network.

**Basic architecture:**
\`\`\`
Internet → Load Balancer → App Servers (public subnet)
                                    ↓
                           Database (private subnet, NO internet route)
\`\`\`

**On cloud providers:**
- **AWS**: Put your RDS in a private VPC subnet with no internet gateway
- **GCP**: Use Private IP for Cloud SQL
- **Hetzner/DigitalOcean**: Use their private networking feature, bind DB to private interface only

## If You Must Access Remotely

Use a bastion host (jump box) or VPN:

\`\`\`bash
# SSH tunnel to reach private database
ssh -L 5432:db.internal:5432 user@bastion.yourdomain.com
# Now connect to localhost:5432 locally
\`\`\`

## Quick Wins Right Now

1. Check if your database port is exposed: \`nmap -p 3306,5432,27017,6379 your-server-ip\`
2. If yes, add a firewall rule blocking those ports from the public internet immediately
3. Bind your database to listen only on localhost or private network IP, not 0.0.0.0
4. Change default credentials immediately if they're still set

Databases in private subnets, behind firewalls, with strong credentials and minimal access — that's the baseline.
    `.trim()
  },
  {
    id: 8,
    slug: 'sim-swap-protection',
    category: 'SOCIAL',
    title: 'SIM Swap Protection',
    detail: 'Call your carrier and add a "Port-Out PIN". Your phone number is the weakest link in your security.',
    article: `
## How SIM Swapping Works

Your phone number is tied to more of your identity than you think. Banks, email providers, social platforms — they all use your phone number as a fallback authentication method. SMS-based 2FA sends a code to your number. Password resets go to your number.

SIM swapping is when an attacker convinces your carrier to transfer your number to a SIM card they control. Once they have your number, every SMS code — every password reset link — comes to them.

## The Social Engineering Script

Attackers call your carrier's support line. They have your name, address, last four of your social, and account number (bought in data breaches or gathered from social media). They tell the rep they got a new phone, need to activate a new SIM, and would like to port the number.

Many carriers have helpdesk reps with weak verification protocols. The attack succeeds more often than it should. High-profile victims have lost millions in cryptocurrency this way.

## How to Protect Yourself

**Step 1: Add a Port-Out PIN**
Call your carrier (T-Mobile, AT&T, Verizon) and request a Port-Out PIN or SIM lock PIN. This is a separate PIN that must be provided before any SIM change or port-out is authorized. Most reps know what this is.

**Step 2: Note the PIN**
Write it down somewhere physical and secure. Store it in your password manager. This PIN protects your number — don't lose it.

**Step 3: Switch from SMS 2FA to Authenticator Apps**
SMS codes are vulnerable to SIM swapping. Replace SMS-based 2FA with:
- **Google Authenticator** or **Authy** — TOTP codes generated on your device
- **Hardware keys** (YubiKey) — phishing-proof, SIM-swap-proof

**Step 4: Use a Google Voice Number for 2FA**
Consider registering a Google Voice number for SMS 2FA instead of your real number. Google Voice numbers are significantly harder to SIM swap.

## The Stakes

SIM swapping has been used to drain crypto wallets, take over business accounts, and enable identity theft. Your phone number is infrastructure. Treat it like a password.

One call to your carrier adds a layer that stops most SIM swap attempts cold.
    `.trim()
  },
  {
    id: 9,
    slug: 'separate-browser-profiles',
    category: 'BROWSER',
    title: 'Separate Your Lives',
    detail: 'Use Different Browser Profiles (Firefox Containers) for work, personal, and shady site browsing.',
    article: `
## Why Browser Isolation Matters

Your browser knows everything about you. It stores session tokens, cookies, saved passwords, browsing history, autofill data — and it shares all of this across every tab you open by default.

When you're logged into your work email and you open a shady link in the same browser, that site can probe your cookies, potentially access login states, and use browser fingerprinting to tie your anonymous browsing to your real identity.

Compartmentalization is the answer.

## Firefox Multi-Account Containers

Firefox's Multi-Account Containers extension lets you assign different "containers" to different contexts. Cookies and session data do not cross container boundaries.

**Setup:**
1. Install Firefox + the Multi-Account Containers extension (built by Mozilla)
2. Create containers: Work, Personal, Banking, Shopping, Research
3. Assign specific sites to containers (right-click a tab)
4. Sites in your "Work" container can't read cookies from your "Personal" container

Facebook Container (a separate extension) specifically isolates Facebook to prevent its trackers from following you across the web.

## Chrome Profiles

Chrome's built-in Profiles feature creates separate browser instances with isolated storage:
1. Click your avatar top-right → "Add" profile
2. Name it: Work, Personal, Research
3. Each profile has separate cookies, history, extensions, and saved passwords

## Brave Browsers

Brave has strong fingerprinting protection built-in and isolated tab features. It also allows "New Private Window with Tor" for truly anonymous browsing.

## The Practical Setup

Recommended configuration:
- **Profile 1 — Work**: Logged into corporate email, Slack, work tools. Never used for personal browsing.
- **Profile 2 — Personal**: Email, social media, streaming. Not used for work.
- **Profile 3 — Research/Shady**: Opening unfamiliar links, reading sketchy sites, anything you'd rather not tie to your identity. Wipe cookies regularly.
- **Profile 4 — Banking**: Only banking and financial sites. Hardened, no extensions except an ad blocker.

## Why This Matters For You

If a site in your "Research" container tries to exploit a browser vulnerability or steal cookies, it only gets the cookies from that container — not your work sessions or banking credentials. The blast radius is contained.

One breach shouldn't compromise everything. Separate your lives.
    `.trim()
  },
  {
    id: 10,
    slug: 'buy-a-yubikey',
    category: 'HARDWARE',
    title: 'Buy a YubiKey',
    detail: 'Hardware codes beat SMS codes 100% of the time. Phishing-proof your identity.',
    article: `
## The Problem With Software 2FA

Time-based one-time passwords (TOTP) from apps like Google Authenticator are vastly better than SMS codes — but they have one critical weakness: they can be phished.

A sophisticated phishing site proxies your credentials in real-time. You enter your username, password, and then your 6-digit TOTP code. The phishing site immediately forwards all three to the real site and logs in as you — within the 30-second TOTP window. You see an error and think you mistyped. They're already in your account.

Hardware security keys eliminate this attack entirely.

## How YubiKeys Work

A YubiKey is a physical USB or NFC device that handles authentication using public-key cryptography (FIDO2/WebAuthn protocol).

When you register a YubiKey with a site:
1. The site stores your public key
2. To authenticate, the site sends a challenge
3. Your YubiKey signs the challenge with its private key (which never leaves the device)
4. The site verifies the signature

The critical part: **the response is cryptographically bound to the domain you're logging into**. If you're on a phishing site instead of google.com, the YubiKey will refuse to authenticate — because the domain doesn't match what it registered with.

There is no TOTP code to intercept. There is no credential to replay. The phishing attack simply fails.

## Which YubiKey to Buy

- **YubiKey 5 NFC** (~$55) — Works with USB-A and NFC. Best all-around choice. Use it with phones via tap.
- **YubiKey 5C NFC** (~$55) — USB-C version for modern laptops
- **Security Key NFC** (~$30) — Budget option, FIDO2 only (no OTP or PIV)

Buy two. Register both with your important accounts. Keep one on your keychain and one in a safe location as backup.

## Where to Use It

Almost every major platform now supports hardware keys:
- Google / Gmail
- GitHub
- Dropbox
- Salesforce
- Microsoft / Azure AD
- 1Password, Bitwarden
- Twitter / X
- Facebook

Look for "Security Key" in any account's 2FA settings.

## The Bottom Line

SMS 2FA: Vulnerable to SIM swap, SS7 attacks
TOTP apps: Vulnerable to real-time phishing
Hardware keys: Phishing-proof, SIM-swap-proof, brute-force-proof

A $55 YubiKey protects your accounts better than any software solution. It's the highest-leverage security purchase you can make.
    `.trim()
  },
  {
    id: 11,
    slug: 'print-your-backup-codes',
    category: 'RECOVERY',
    title: 'Print Your Backup Codes',
    detail: "If you lose your MFA device and haven't saved your 10 recovery codes offline, you're locked out forever.",
    article: `
## The MFA Lockout Problem

You enabled two-factor authentication. Great. Now your phone breaks, gets stolen, or is simply unavailable when you need to log in. Without a recovery method, you're locked out of your own account — permanently, in many cases.

This happens more than people realize. Lost phones, factory resets that wipe authenticator apps, stolen devices — the exact threats 2FA protects you from can also lock you out if you haven't planned for recovery.

## What Are Backup Codes?

When you enable 2FA on most services (Google, GitHub, etc.), they offer you 10 single-use backup codes. These are emergency codes that bypass your authenticator app. Each code can only be used once, and you should store them offline before you need them.

**Finding your backup codes:**
- **Google**: myaccount.google.com → Security → 2-Step Verification → Backup codes
- **GitHub**: Settings → Security → Two-factor authentication → Recovery codes
- **Most services**: Look in Security or Account settings for "Recovery codes" or "Backup codes"

## The Right Way to Store Them

**Print them on paper.** This is not an aesthetic choice — it's the most secure option:

- Paper can't be remotely wiped
- Paper can't be hacked
- Paper doesn't require a battery
- Paper survives device failures

Store your printed backup codes:
1. In a fireproof safe at home
2. In a safety deposit box
3. In a sealed envelope with a trusted person

**Do not store backup codes:**
- In the cloud (defeats the purpose)
- In your password manager on the same device as your authenticator
- In your email (if your email is compromised, so are your codes)
- In a notes app on your phone (loses everything the same moment your phone does)

## Using Authy Instead of Google Authenticator

One practical alternative: use **Authy** instead of Google Authenticator. Authy supports encrypted cloud backup of your TOTP secrets, protected by a separate Authy password. This means if you lose your phone, you can restore your authenticator codes on a new device.

Tradeoff: cloud backup means cloud risk. Your Authy password and backup encryption matter. Use a strong, unique password.

## Emergency Recovery Plan

Document your recovery plan and store it somewhere physical:
1. List all services where you have 2FA enabled
2. Location of backup codes for each
3. Phone number on the account (for SMS fallback where it exists)
4. Trusted contact who can help verify identity if you need account recovery

Plan for losing everything. The accounts that matter most are the ones that hurt most when you can't access them.
    `.trim()
  },
  {
    id: 12,
    slug: 'scope-your-api-tokens',
    category: 'API',
    title: 'Scope Your Tokens',
    detail: 'Never create a "Full Access" API token. Give it the absolute minimum permissions needed to function.',
    article: `
## The Principle of Least Privilege

Every API token, service account, and access credential should have exactly the permissions needed for its purpose — no more. This is called the Principle of Least Privilege (PoLP), and it's one of the most impactful security principles you can apply.

When you create a "Full Access" token to avoid the friction of figuring out the exact permissions needed, you create an amplifier for any breach. If that token leaks, the attacker inherits everything it can do.

## Real Examples of Scope Creep Risk

**Scenario 1:** You create a GitHub token with "repo" scope (all repos, read/write) to let a CI/CD tool clone a repository. That token leaks in a log file. The attacker now has write access to every repository in your organization.

**Correct approach:** Create a token with read-only access to the specific repository, scoped to "contents: read" only.

**Scenario 2:** You create a full-admin API token for an analytics integration that only needs to read data. The analytics vendor gets breached. Your token is exposed. The attacker has full admin access to your platform.

**Correct approach:** Create a read-only token. Read access can't delete, modify, or exfiltrate credentials.

## Scoping By Platform

**GitHub Personal Access Tokens:**
- Use fine-grained tokens (not classic tokens)
- Select only the specific repository
- Select only the permissions needed (contents: read, metadata: read)
- Set an expiration date

**AWS IAM:**
- Create purpose-specific IAM roles
- Use IAM policies with explicit Allow for only the actions needed
- Avoid AdministratorAccess unless absolutely necessary
- Enable CloudTrail to audit what the credentials actually do

**Stripe API:**
- Restricted keys for read-only dashboards
- Webhook signing secrets are separate from API keys
- Never use live API keys in development environments

**Cloudflare API:**
- Create tokens scoped to specific zones (domains)
- Read vs edit permission separately per zone
- Never use the Global API Key unless required

## Token Hygiene

Beyond scoping:
1. **Set expiration dates** — rotate tokens regularly
2. **One token per purpose** — never share tokens between systems
3. **Audit active tokens** — review and revoke unused tokens quarterly
4. **Store in secrets managers** — AWS Secrets Manager, HashiCorp Vault, not environment files on disk
5. **Rotate immediately if exposed** — don't wait to confirm misuse

Minimum scope, maximum control. The token that can do less can hurt less.
    `.trim()
  },
  {
    id: 13,
    slug: 'update-your-router-firmware',
    category: 'ROUTER',
    title: 'Update Your Firmware',
    detail: 'Your home router is an at-risk Linux server. If the manufacturer stopped updates, the hardware is tech-trash.',
    article: `
## Your Router Is a Computer

Your home Wi-Fi router is a Linux computer with an operating system, a web server for the admin interface, DNS resolver, firewall, and often UPnP — all running on hardware that sits powered on 24/7, facing the internet.

Unlike your laptop, your router doesn't prompt you to install updates. Most people never touch router firmware after initial setup. Some routers run firmware from 2019 on a network they haven't thought about since they plugged it in.

This is a serious attack surface.

## What Attackers Do With Routers

- **DNS hijacking**: Modify your router's DNS settings to redirect your traffic through attacker-controlled DNS resolvers. Your browser shows "amazon.com" but you're talking to a fake server.
- **Credential harvesting**: Proxy your traffic and log unencrypted credentials
- **Botnet recruitment**: Routers are prime candidates for DDoS botnets (Mirai and its variants)
- **Persistent access**: A compromised router survives factory resets on devices behind it
- **VPN bypass**: An attacker controlling your router can observe which sites you visit even if you use a VPN (they can see the timing and size of traffic)

## How to Check and Update Firmware

**Step 1:** Log into your router admin panel (typically 192.168.1.1 or 192.168.0.1)

**Step 2:** Find the Firmware or Software Update section (usually under Administration or Advanced)

**Step 3:** Check the current firmware version and compare to the manufacturer's website

**Step 4:** If an update is available, install it. Some routers support automatic updates — enable this.

## End-of-Life Hardware

If your router's manufacturer has stopped releasing firmware updates, it will never receive patches for newly discovered vulnerabilities. The hardware is functionally insecure — a permanently unpatched Linux server on your network.

**Signs your router is EOL:**
- Last firmware update was 2+ years ago
- Model isn't listed on the manufacturer's current products page
- Manufacturer says "no longer supported"

**What to do:** Replace it. Budget routers from reputable manufacturers (TP-Link, Asus, Netgear) start around $50 and come with active update support.

## Better Yet: Run Your Own Firmware

Advanced option: **OpenWRT** is an open-source Linux-based router firmware that you can install on many consumer routers. It's actively maintained, receives security patches rapidly, and gives you full control.

Check if your router is compatible at openwrt.org/toh.

Patch your router. Replace it when it goes EOL. Treat it like the server it is.
    `.trim()
  },
  {
    id: 14,
    slug: 'scrub-your-photos',
    category: 'METADATA',
    title: 'Scrub Your Photos',
    detail: 'Posting a photo from home? Strip the GPS coordinates first or everyone knows your origin.',
    article: `
## What Is EXIF Data?

Every photo your phone or camera takes is embedded with metadata — technical information about the image. This is called EXIF data (Exchangeable Image File Format).

EXIF data typically includes:
- **GPS coordinates** (latitude and longitude, often precise to within 10 meters)
- **Timestamp** (exact date and time the photo was taken)
- **Device information** (make, model, and often the unique serial number of your camera or phone)
- **Camera settings** (aperture, shutter speed, ISO)
- **Software version** of your phone's operating system

When you post a photo online without stripping this metadata, you're potentially broadcasting your exact home address, your daily patterns, and your device fingerprint.

## Real-World Risks

**For individuals:** A photo posted from home with GPS enabled tells anyone who extracts the EXIF data where you live. Stalkers, harassers, and burglars can use this. John McAfee was famously located by journalists who extracted GPS coordinates from a photo his team posted.

**For businesses:** Photos of internal documents, whiteboards, or office equipment can contain metadata revealing device identities, time zones, and internal file structures.

**For journalists and activists:** Posting photos without stripping metadata in hostile environments can reveal source locations and journalist identities.

## How to Check Your Photos for EXIF Data

**Online (for testing):** Jeffrey's Image Metadata Viewer (exifdata.com) — upload a photo to see all embedded data

**On Mac:** Right-click the image → Get Info → More Info → check for location data

**On Windows:** Right-click → Properties → Details → GPS section

## How to Strip EXIF Data

**Before posting:**

*iPhone:*
- iOS 13+: When you copy/paste a photo, GPS is stripped. When you AirDrop, it's preserved.
- Settings → Privacy → Location Services → Camera → "Never" (disables GPS in photos entirely)

*Android:*
- Settings → Camera → Location tags → Off

*Manual stripping on desktop:*
\`\`\`bash
# Using ExifTool (free, cross-platform)
exiftool -all= photo.jpg
\`\`\`

**For bulk stripping:**
ExifTool can process entire directories:
\`\`\`bash
exiftool -all= -r /path/to/photos/
\`\`\`

## Social Media Handling

Most major platforms (Instagram, Twitter/X, Facebook) strip EXIF data when you upload. But:
- They store the original metadata on their servers
- Some platforms and direct file sharing do not strip it
- You shouldn't rely on the platform — strip before uploading

Know what your photos are saying before you post them.
    `.trim()
  },
  {
    id: 15,
    slug: 'hover-before-you-click',
    category: 'PHISHING',
    title: 'Hover Before You Click',
    detail: 'Links are masks. Hover over every link to see the ACTUAL destination in the bottom corner of your browser.',
    article: `
## Hyperlinks Are Not What They Appear

A hyperlink displays one thing and goes somewhere else. That's the fundamental design. Attackers exploit this constantly.

\`\`\`html
<a href="https://evil-phishing-site.com/steal">Click here to verify your PayPal account</a>
\`\`\`

The user reads "Click here to verify your PayPal account." The link actually goes to evil-phishing-site.com. They have no way to know without looking at the underlying URL.

This is the foundation of most phishing attacks.

## The Hover Technique

Before clicking any link in email, chat, or on a web page:
1. Move your cursor over the link without clicking
2. Look at the bottom-left corner of your browser window
3. The real destination URL appears there

If the URL you see doesn't match where you expect to go, don't click.

**On mobile:** Long-press a link to preview the URL before opening it.

## What to Look For

**Legitimate domain:** The actual domain (the part just before .com/.org/etc) matches who the link claims to be from.
- ✅ paypal.com/verify
- ❌ paypal.verify-account.com (the domain is verify-account.com, not paypal.com)
- ❌ paypa1.com (the 'l' is a '1')
- ❌ paypal.com.phishing-site.net (the domain is phishing-site.net)

**URL shorteners:** bit.ly, tinyurl.com, t.co — these mask the real destination. Use a URL expander (unshorten.it) before clicking.

**Unicode look-alike characters:** Attackers use characters from other alphabets that look identical to English letters. "аpple.com" with a Cyrillic 'а' looks exactly like "apple.com" to the human eye. Your browser may or may not flag this.

## Advanced Inspection

For suspicious emails, look at the full email headers (see our Return-Path tip). For suspicious links, you can:

1. **Copy the link** (right-click → Copy Link Address) and paste it into a text editor to read the raw URL before visiting
2. **Use VirusTotal URL scanner** (virustotal.com) to check a URL against 80+ security engines before visiting
3. **Use a sandbox** like Any.run or Browserling to open suspicious URLs in an isolated environment

## The Mindset Shift

Treat every unsolicited link as potentially dangerous until proven otherwise. This includes:
- Links in emails you didn't expect
- Links from "friends" in chat (their account may be compromised)
- Links posted in Discord, Slack, or forums
- QR codes in physical spaces (print-over attacks exist)

Hover. Read. Verify. Then click.
    `.trim()
  },
  {
    id: 16,
    slug: 'the-3-2-1-backup-rule',
    category: 'BACKUPS',
    title: 'The 3-2-1 Backup Rule',
    detail: "3 copies, 2 different media types, 1 stored off-site. If it doesn't exist in 3 places, it doesn't exist.",
    article: `
## The Rule That Saves Everything

The 3-2-1 backup rule is simple enough to memorize and comprehensive enough to protect against almost every data loss scenario:

- **3** copies of your data
- **2** different storage media types
- **1** copy stored off-site (geographically separate)

This rule has been the standard for enterprise backup strategy for decades. It works because no single point of failure can destroy all three copies simultaneously.

## Why Each Element Matters

**3 copies:** Your original plus two backups. One backup can fail during recovery (corrupted, wrong version, hardware failure at the worst moment). Two backups means you have a spare for your spare.

**2 different media types:** If both backups are on the same type of media (e.g., two external hard drives), a media-type failure affects both — a batch of drives with the same manufacturing defect, or a power surge. Mixing types (external HDD + cloud) ensures one type's failure doesn't take both.

**1 off-site:** Your house can flood, burn, or be burgled. A backup in the same building as your primary data fails in every physical disaster scenario. Off-site means geographically separate — cloud storage, a drive at a family member's house, a safe deposit box.

## Practical 3-2-1 Implementation

**For individuals:**
- Copy 1: Your working files on your laptop/desktop
- Copy 2: External hard drive at home (automated with Time Machine on Mac, File History on Windows)
- Copy 3: Cloud backup service (Backblaze Personal Backup ~$100/year for unlimited data, or iCloud/Google One for smaller data sets)

**For businesses:**
- Copy 1: Primary server/NAS
- Copy 2: Local NAS or tape backup
- Copy 3: Cloud backup (AWS S3, Backblaze B2, Wasabi) in a different region than your primary infrastructure

## What Good Backups Look Like

Backups are worthless if:
- **You've never tested restoring from them** — test quarterly
- **They're not automated** — manual backups get skipped
- **They're not versioned** — ransomware encrypts current files, then you "backup" the encrypted version over your good backup
- **They're not monitored** — a backup job that silently fails for 6 months is the same as no backup

Use backup software that:
- Runs on a schedule automatically
- Keeps multiple versions (so you can recover a file from last week, not just last night)
- Alerts you if a backup job fails
- Encrypts backup data at rest

## Ransomware Specifically

Ransomware encrypts your files and demands payment. A proper 3-2-1 backup defeats ransomware completely — you restore from the pre-infection backup and decline to pay.

The key: at least one backup must be **immutable or air-gapped** (not continuously connected to your network). Cloud providers with versioning + object lock, or an offline drive you rotate, achieve this.

Your data either lives in 3 places or it's at risk. It's that simple.
    `.trim()
  },
  {
    id: 17,
    slug: 'use-quad9-or-1111',
    category: 'DNS',
    title: 'Use Quad9 or 1.1.1.1',
    detail: 'Default ISP DNS is slow and monitors your traffic. Switch to a secure, private resolver at the router level.',
    article: `
## What DNS Is and Why It Matters

Every time you type a website address, your device sends a DNS query to translate the domain name into an IP address. Think of it as the phone book of the internet — you look up "google.com" and get back "142.250.80.46".

By default, your DNS queries go to your ISP's DNS servers. This means your ISP sees a log of every domain you visit — every website, every lookup, every query — even when you're using HTTPS. HTTPS encrypts the content of your traffic; DNS reveals where you're going.

## Why ISP DNS Is a Problem

1. **Privacy**: Your ISP logs your DNS queries and can sell anonymized (or not-so-anonymized) browsing data to data brokers
2. **Speed**: ISP DNS servers are often slower than purpose-built resolver infrastructure
3. **No malware filtering**: ISP DNS doesn't block known malicious domains
4. **No DNSSEC validation**: Many ISP resolvers don't validate DNSSEC, making DNS poisoning attacks easier

## The Alternatives

**Quad9 (9.9.9.9)**
- Run by a non-profit (Quad9 Foundation)
- Blocks DNS queries to known malicious domains (malware, phishing, botnet C2)
- Supports DNSSEC validation
- No logging of personal data
- **Best for security-focused users**

**Cloudflare (1.1.1.1)**
- Fastest public DNS resolver in the world by most benchmarks
- Privacy-first: doesn't log your IP address
- Supports DNS-over-HTTPS and DNS-over-TLS
- 1.1.1.2 = malware blocking, 1.1.1.3 = malware + adult content blocking
- **Best for performance-focused users**

**Google (8.8.8.8)**
- Fast and reliable
- No malware blocking
- Google logs and uses your DNS data (consistent with their business model)
- **Not recommended if privacy matters**

## How to Switch

**On your router (recommended — protects all devices):**
1. Log into your router admin panel (192.168.1.1 or 192.168.0.1)
2. Find DNS settings (usually under LAN or DHCP settings)
3. Set Primary DNS: 9.9.9.9 (Quad9) or 1.1.1.1 (Cloudflare)
4. Set Secondary DNS: 149.112.112.112 (Quad9) or 1.0.0.1 (Cloudflare)
5. Save and reboot

**For encrypted DNS (DNS-over-HTTPS):**
- Firefox: Settings → General → Network Settings → Enable DNS over HTTPS
- Chrome: Settings → Privacy and Security → Use secure DNS
- Windows 11: Settings → Network → DNS server assignment → Manual → enable "Preferred DNS encryption"

## The Extra Step: DNS-over-HTTPS

Standard DNS queries travel in plain text — anyone between you and the resolver can read them (ISPs, coffee shop routers, nation-state surveillance). DNS-over-HTTPS (DoH) encrypts your DNS queries, hiding them from network observers.

Combine Quad9 with DoH for both security filtering and private queries.

Switch your DNS. It takes five minutes and your ISP stops seeing your browsing history immediately.
    `.trim()
  },
  {
    id: 18,
    slug: 'check-the-lock-details',
    category: 'ENCRYPTION',
    title: 'Check the "Lock" Details',
    detail: 'A green lock just means the connection is encrypted, not that the site is safe. Verify the Certificate Owner.',
    article: `
## The Lock Is Not a Guarantee of Safety

The padlock icon in your browser means one thing: the connection between your browser and the server is encrypted. It does not mean:
- The site is legitimate
- The site isn't run by criminals
- Your data won't be stolen
- The site is who it claims to be

Let's Encrypt issues free SSL certificates to anyone, automatically, with no identity verification. A phishing site for "paypal-secure-login.com" can have a valid SSL certificate, a green lock, and "HTTPS" — because encryption and identity are separate things.

## What the Lock Actually Tells You

When you click the lock icon in Chrome, Firefox, or Safari, you see:
1. **Connection is secure**: Traffic is encrypted in transit ✓
2. **Certificate issued to**: The organization or domain the certificate was issued to
3. **Certificate authority**: Who verified the identity claim

The critical field is "Certificate issued to." For a bank, this should say your bank's legal name, not just the domain.

## Types of SSL Certificates

**Domain Validated (DV):** The cheapest and most common. Proves only that the certificate holder controls the domain. No identity verification. This is what Let's Encrypt issues. A fraudster can have one.

**Organization Validated (OV):** The certificate authority verified the organization's legal existence. Click the lock → Certificate → Subject to see "O=" (Organization). This provides meaningful identity assurance.

**Extended Validation (EV):** The most rigorous verification — legal existence, physical address, operational existence all verified. Historically showed the company name in the address bar (browsers have moved away from this visual distinction).

## How to Inspect a Certificate

**Chrome:**
1. Click the lock → "Connection is secure" → "Certificate is valid"
2. Check the "Subject" field — who is this certificate actually issued to?
3. Check "Valid from / to" — is it expired?
4. Check "Issued by" — is it a recognized certificate authority?

**Firefox:**
1. Click the lock → "Connection Secure" → "More information"
2. Security tab → View Certificate

## Red Flags

- The domain in the certificate doesn't match the site you're visiting
- The certificate was issued by an unknown or self-signed authority
- The certificate is expired
- The organization name in the certificate doesn't match who you think you're talking to

## Beyond the Lock: Additional Checks

For high-stakes transactions (banking, wire transfers, entering SSN):
1. Type the URL directly rather than clicking links
2. Verify the domain name character by character (watch for unicode look-alikes)
3. Check the certificate organization name
4. Look up the domain age on whois — brand new domains (<30 days) are suspicious

The lock tells you the channel is private. You still need to verify you're talking to the right person.
    `.trim()
  }
];
