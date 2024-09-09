ALTER TYPE "subscription_tier_type" ADD VALUE 'Basic';--> statement-breakpoint
ALTER TYPE "subscription_tier_type" ADD VALUE 'Pro';--> statement-breakpoint
ALTER TYPE "subscription_tier_type" ADD VALUE 'Max';--> statement-breakpoint
ALTER TABLE "subscription_tiers" ALTER COLUMN "name" SET DEFAULT 'Basic';