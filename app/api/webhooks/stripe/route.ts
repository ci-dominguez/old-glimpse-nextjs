import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const resp = JSON.parse(payload);

  const sig = req.headers.get('Stripe-Signature');

  const dateTime = new Date(resp?.created * 1000).toLocaleDateString;
  const timeString = new Date(resp?.created * 1000).toLocaleTimeString;

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log('Event in stripe webhook api:', event.type);

    return NextResponse.json({ status: 'success', event: event.type });
  } catch (error) {
    console.log('Error in stripe webhook api:', error);
    return NextResponse.json({ status: 'error', error: error });
  }
}
