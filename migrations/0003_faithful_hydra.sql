ALTER TABLE "subscription_tiers" ALTER COLUMN "stripe_price_id_monthly" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription_tiers" ALTER COLUMN "stripe_price_id_yearly" DROP NOT NULL;