// pages/api/stripe-webhook.js
export const config = { api: { bodyParser: false } };

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-12-18.acacia' });

  const rawBody = await getRawBody(req);
  const sig     = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature failed:', err.message);
    return res.status(400).json({ error: `Webhook error: ${err.message}` });
  }

  const obj = event.data.object;

  switch (event.type) {
    case 'checkout.session.completed': {
      const plan    = obj.metadata?.plan    || 'unknown';
      const billing = obj.metadata?.billing || 'monthly';
      const email   = obj.customer_details?.email || 'no-email';
      console.log(`[ShadyScanner] New subscription: ${plan}/${billing} — ${email}`);
      // TODO: store subscription to DB / send welcome email via Brevo
      break;
    }
    case 'customer.subscription.deleted': {
      const customerId = obj.customer;
      console.log(`[ShadyScanner] Subscription cancelled: customer ${customerId}`);
      // TODO: revoke access in DB
      break;
    }
    case 'invoice.payment_failed': {
      const email = obj.customer_email || 'unknown';
      console.log(`[ShadyScanner] Payment failed for: ${email}`);
      break;
    }
  }

  return res.status(200).json({ received: true });
}
