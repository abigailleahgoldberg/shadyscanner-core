/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false, // removes X-Powered-By: Next.js

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // HSTS — force HTTPS for 1 year, all subdomains, preload
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          // Clickjacking protection
          { key: 'X-Frame-Options', value: 'DENY' },
          // Prevent MIME-type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Referrer policy — don't leak path to external sites
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Permissions — disable camera/mic/geolocation by default
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          // Basic CSP — allows same-origin + Stripe + OpenAI + Fontshare CDN
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
              "style-src 'self' 'unsafe-inline' https://api.fontshare.com",
              "font-src 'self' https://api.fontshare.com https://cdn.fontshare.com data:",
              "img-src 'self' data: https:",
              "connect-src 'self' https://api.openai.com https://api.stripe.com",
              "frame-src https://js.stripe.com https://hooks.stripe.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
