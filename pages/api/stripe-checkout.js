// pages/api/stripe-checkout.js
const PRICE_IDS = {
  member_monthly:   'price_1T8yXVRfd0f7BI8gxK0WcmFW',
  member_annual:    'price_1T8yXVRfd0f7BI8gr2VnCu8u',
  pro_monthly:      'price_1T8yXWRfd0f7BI8ghRVGJ1zC',
  pro_annual:       'price_1T8yXWRfd0f7BI8gdzw9nR0I',
  business_monthly: 'price_1T8yXWRfd0f7BI8gBCZ6pJzQ',
  business_annual:  'price_1T8yXWRfd0f7BI8gHJxCIUqR',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { plan = 'member', billing = 'monthly' } = req.body;
  const priceKey = `${plan}_${billing}`;
  const priceId  = PRICE_IDS[priceKey];

  if (!priceId) return res.status(400).json({ error: `Unknown plan: ${priceKey}` });

  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-12-18.acacia' });

    const origin = req.headers.origin || 'https://shadyscanner.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}&billing=${billing}`,
      cancel_url: `${origin}/join`,
      metadata: { plan, billing },
      allow_promotion_codes: true,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
