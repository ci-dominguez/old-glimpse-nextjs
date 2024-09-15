ALTER TABLE "user_subscriptions" ALTER COLUMN "stripe_subscription_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ALTER COLUMN "stripe_price_id" DROP NOT NULL;