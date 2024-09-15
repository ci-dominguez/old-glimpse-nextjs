DO $$ BEGIN
 CREATE TYPE "public"."subscription_status" AS ENUM('active', 'past_due', 'canceled', 'unpaid');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "color_systems" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "colors" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription_tiers" ADD COLUMN "stripe_price_id_monthly" text NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription_tiers" ADD COLUMN "stripe_price_id_yearly" text NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription_tiers" ADD COLUMN "price_monthly" numeric(10, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription_tiers" ADD COLUMN "price_yearly" numeric(10, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN "stripe_subscription_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN "stripe_price_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN "status" "subscription_status" DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN "current_period_start" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN "current_period_end" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN "cancel_at_period_end" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription_tiers" DROP COLUMN IF EXISTS "price";--> statement-breakpoint
ALTER TABLE "user_subscriptions" DROP COLUMN IF EXISTS "start_date";--> statement-breakpoint
ALTER TABLE "user_subscriptions" DROP COLUMN IF EXISTS "end_date";--> statement-breakpoint
ALTER TABLE "user_subscriptions" DROP COLUMN IF EXISTS "is_active";--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id");