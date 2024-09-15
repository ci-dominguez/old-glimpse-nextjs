import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/db/db';
import { users, userSubscriptions, subscriptionTiers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { mapStripeStatusToSchemaStatus } from '@/utils/apiUtils/subscriptionUtils';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = headers().get('stripe-signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Error verifying webhook signature:', err);
    return new NextResponse(
      `Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`,
      { status: 400 }
    );
  }

  console.log('Received event type:', event.type);

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChange(
          event.data.object as Stripe.Subscription
        );
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeletion(
          event.data.object as Stripe.Subscription
        );
        break;
      case 'invoice.paid':
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new NextResponse('Webhook processed successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Webhook processing failed', { status: 500 });
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.stripeCustomerId, subscription.customer as string))
    .limit(1);

  if (!user) {
    console.error('User not found for subscription:', subscription.id);
    return;
  }

  const [tierInfo] = await db
    .select()
    .from(subscriptionTiers)
    .where(
      eq(
        subscriptionTiers.stripePriceIdMonthly,
        subscription.items.data[0].price.id
      )
    )
    .limit(1);

  if (!tierInfo) {
    console.error(
      'Subscription tier not found for price:',
      subscription.items.data[0].price.id
    );
    return;
  }

  await db
    .insert(userSubscriptions)
    .values({
      userId: user.id,
      subscriptionTierId: tierInfo.id,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      status: mapStripeStatusToSchemaStatus(subscription.status),
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    })
    .onConflictDoUpdate({
      target: userSubscriptions.stripeSubscriptionId,
      set: {
        subscriptionTierId: tierInfo.id,
        stripePriceId: subscription.items.data[0].price.id,
        status: mapStripeStatusToSchemaStatus(subscription.status),
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });

  await db
    .update(users)
    .set({ currentSubscriptionTierId: tierInfo.id })
    .where(eq(users.id, user.id));
}

async function handleSubscriptionDeletion(subscription: Stripe.Subscription) {
  await db
    .update(userSubscriptions)
    .set({
      status: 'canceled',
      cancelAtPeriodEnd: true,
    })
    .where(eq(userSubscriptions.stripeSubscriptionId, subscription.id));

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.stripeCustomerId, subscription.customer as string))
    .limit(1);

  if (user) {
    await db
      .update(users)
      .set({ currentSubscriptionTierId: 1 })
      .where(eq(users.id, user.id));
  }
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  if (invoice.subscription) {
    await db
      .update(userSubscriptions)
      .set({ status: 'active' })
      .where(
        eq(
          userSubscriptions.stripeSubscriptionId,
          invoice.subscription as string
        )
      );
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  if (invoice.subscription) {
    await db
      .update(userSubscriptions)
      .set({ status: 'past_due' })
      .where(
        eq(
          userSubscriptions.stripeSubscriptionId,
          invoice.subscription as string
        )
      );
  }
}
