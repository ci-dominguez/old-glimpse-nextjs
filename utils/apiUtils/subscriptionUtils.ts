import { db } from '@/db/db';
import { users, userSubscriptions, subscriptionTiers } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export const mapStripeStatusToSchemaStatus = (
  stripeStatus: Stripe.Subscription.Status
): 'active' | 'past_due' | 'canceled' | 'unpaid' => {
  switch (stripeStatus) {
    case 'active':
    case 'trialing':
      return 'active';
    case 'past_due':
      return 'past_due';
    case 'canceled':
      return 'canceled';
    case 'unpaid':
      return 'unpaid';
    default:
      return 'active';
  }
};

export async function createStripeCustomer(
  userId: string,
  email: string,
  name: string
) {
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: { userId },
  });

  await db
    .update(users)
    .set({ stripeCustomerId: customer.id })
    .where(eq(users.id, userId));

  return customer;
}

export async function createSubscription(
  userId: string,
  priceId: string,
  paymentMethodId: string
) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user[0].stripeCustomerId) {
    const customer = await createStripeCustomer(
      userId,
      user[0].email,
      user[0].name
    );
    user[0].stripeCustomerId = customer.id;
  }

  const subscription = await stripe.subscriptions.create({
    customer: user[0].stripeCustomerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  });

  await stripe.paymentMethods.attach(paymentMethodId, {
    customer: user[0].stripeCustomerId,
  });

  const [tierInfo] = await db
    .select()
    .from(subscriptionTiers)
    .where(
      or(
        eq(subscriptionTiers.stripePriceIdMonthly, priceId),
        eq(subscriptionTiers.stripePriceIdYearly, priceId)
      )
    );

  if (!tierInfo) {
    throw new Error('Invalid price ID');
  }

  await db.insert(userSubscriptions).values({
    userId,
    subscriptionTierId: tierInfo.id,
    stripeSubscriptionId: subscription.id,
    stripePriceId: priceId,
    status: mapStripeStatusToSchemaStatus(subscription.status),
    currentPeriodStart: new Date(subscription.current_period_start * 1000),
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
  });

  return subscription;
}

export async function updateSubscription(
  userId: string,
  subscriptionId: string,
  newPriceId: string
) {
  const [userSub] = await db
    .select()
    .from(userSubscriptions)
    .where(eq(userSubscriptions.stripeSubscriptionId, subscriptionId))
    .limit(1);

  if (!userSub || userSub.userId !== userId) {
    throw new Error('Subscription not found or does not belong to the user');
  }

  const updatedSubscription = await stripe.subscriptions.update(
    subscriptionId,
    {
      items: [
        {
          id: (
            await stripe.subscriptions.retrieve(subscriptionId)
          ).items.data[0].id,
          price: newPriceId,
        },
      ],
      proration_behavior: 'always_invoice',
    }
  );

  const [tierInfo] = await db
    .select()
    .from(subscriptionTiers)
    .where(
      or(
        eq(subscriptionTiers.stripePriceIdMonthly, newPriceId),
        eq(subscriptionTiers.stripePriceIdYearly, newPriceId)
      )
    );

  if (!tierInfo) {
    throw new Error('Invalid price ID');
  }

  await db
    .update(userSubscriptions)
    .set({
      subscriptionTierId: tierInfo.id,
      stripePriceId: newPriceId,
      status: mapStripeStatusToSchemaStatus(updatedSubscription.status),
      currentPeriodStart: new Date(
        updatedSubscription.current_period_start * 1000
      ),
      currentPeriodEnd: new Date(updatedSubscription.current_period_end * 1000),
    })
    .where(eq(userSubscriptions.stripeSubscriptionId, subscriptionId));

  return updatedSubscription;
}

export async function cancelSubscription(
  userId: string,
  subscriptionId: string
) {
  const [userSub] = await db
    .select()
    .from(userSubscriptions)
    .where(eq(userSubscriptions.stripeSubscriptionId, subscriptionId))
    .limit(1);

  if (!userSub || userSub.userId !== userId) {
    throw new Error('Subscription not found or does not belong to the user');
  }

  const canceledSubscription = await stripe.subscriptions.update(
    subscriptionId,
    { cancel_at_period_end: true }
  );

  await db
    .update(userSubscriptions)
    .set({
      cancelAtPeriodEnd: true,
    })
    .where(eq(userSubscriptions.stripeSubscriptionId, subscriptionId));

  return canceledSubscription;
}

export async function getUserSubscriptions(userId: string) {
  const userSubs = await db
    .select()
    .from(userSubscriptions)
    .where(eq(userSubscriptions.userId, userId));

  return Promise.all(
    userSubs.map(async (sub) => {
      const stripeSubscription = await stripe.subscriptions.retrieve(
        sub.stripeSubscriptionId!
      );
      return { ...sub, stripeSubscription };
    })
  );
}

export async function getSubscriptionDetails(
  userId: string,
  subscriptionId: string
) {
  const [userSub] = await db
    .select()
    .from(userSubscriptions)
    .where(eq(userSubscriptions.stripeSubscriptionId, subscriptionId))
    .limit(1);

  if (!userSub || userSub.userId !== userId) {
    throw new Error('Subscription not found or does not belong to the user');
  }

  const stripeSubscription = await stripe.subscriptions.retrieve(
    subscriptionId
  );

  return { ...userSub, stripeSubscription };
}
