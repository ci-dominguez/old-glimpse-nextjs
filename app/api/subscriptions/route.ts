import { NextRequest, NextResponse } from 'next/server';
import {
  createSubscription,
  updateSubscription,
  cancelSubscription,
  getUserSubscriptions,
  getSubscriptionDetails,
} from '@/utils/apiUtils/subscriptionUtils';
import { authenticateUser, handleApiError } from '@/utils/apiUtils/authUtils';
import { z } from 'zod';

const createSubscriptionSchema = z.object({
  priceId: z.string(),
  paymentMethodId: z.string(),
});

const updateSubscriptionSchema = z.object({
  newPriceId: z.string(),
});

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateUser(req);
    const { searchParams } = new URL(req.url);
    const subscriptionId = searchParams.get('subscriptionId');

    if (subscriptionId) {
      const subscription = await getSubscriptionDetails(
        user.id,
        subscriptionId
      );
      return NextResponse.json(subscription);
    } else {
      const subscriptions = await getUserSubscriptions(user.id);
      return NextResponse.json(subscriptions);
    }
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateUser(req);
    const body = await req.json();

    const { priceId, paymentMethodId } = createSubscriptionSchema.parse(body);

    const subscription = await createSubscription(
      user.id,
      priceId,
      paymentMethodId
    );

    return NextResponse.json(subscription, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await authenticateUser(req);
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const subscriptionId = searchParams.get('subscriptionId');

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription ID is required' },
        { status: 400 }
      );
    }

    const { newPriceId } = updateSubscriptionSchema.parse(body);

    const updatedSubscription = await updateSubscription(
      user.id,
      subscriptionId,
      newPriceId
    );

    return NextResponse.json(updatedSubscription);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await authenticateUser(req);
    const { searchParams } = new URL(req.url);
    const subscriptionId = searchParams.get('subscriptionId');

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription ID is required' },
        { status: 400 }
      );
    }

    const canceledSubscription = await cancelSubscription(
      user.id,
      subscriptionId
    );

    return NextResponse.json(canceledSubscription);
  } catch (error) {
    return handleApiError(error);
  }
}
