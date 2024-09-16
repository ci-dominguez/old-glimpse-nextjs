import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/db/db';
import { users, userSubscriptions } from '@/db/schema';

export async function POST(req: NextRequest) {
  const USER_CREATION_SECRET = process.env.CLERK_WEBHOOK_SECRET_USER_CREATION;

  if (!USER_CREATION_SECRET) {
    throw new Error('Webhook secret is not defined');
  }

  //Get headers
  const headerPayload = req.headers;
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  //Error if no headers
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  //Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(USER_CREATION_SECRET);
  let evt: WebhookEvent;

  //Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error occurred', {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log('Webhook body:', body);

  //Do something for webhook events
  if (eventType === 'user.created') {
    const { id: clerkId, email_addresses, first_name, last_name } = evt.data;
    const email = email_addresses[0].email_address;
    const name = `${first_name || ''} ${last_name || ''}`;

    if (!email) {
      console.error('No email address found for user');
      return new NextResponse('No email found for use', {
        status: 400,
      });
    }

    try {
      //Create user in db
      const [newUser] = await db
        .insert(users)
        .values({
          clerkId,
          name,
          email,
          currentSubscriptionTierId: 1,
        })
        .returning({ id: users.id });

      //Insert new user subscription
      await db.insert(userSubscriptions).values({
        userId: newUser.id,
        subscriptionTierId: 1,
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

      //Return success
      console.log(`User created successfully with Clerk ID: ${clerkId}`);
      return new NextResponse('User created successfully', { status: 200 });
    } catch (error) {
      console.error('Error creating user:', error);
      if (error instanceof Error) {
        return new NextResponse(`Error creating user: ${error.message}`, {
          status: 500,
        });
      }
      return new NextResponse('Unknown error creating user', {
        status: 500,
      });
    }
  }
}
