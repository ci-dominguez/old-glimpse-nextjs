DO $$ BEGIN
 CREATE TYPE "public"."colorSystem_mode" AS ENUM('light', 'dark');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "color_systems" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"mode" "colorSystem_mode" NOT NULL,
	"base_colors" text[] NOT NULL,
	"background_color" text NOT NULL,
	"is_favorite" boolean DEFAULT false NOT NULL,
	"is_private" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "color_palettes";--> statement-breakpoint
ALTER TABLE "subscription_tiers" ADD COLUMN "monthly_color_system_generation_limit" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription_tiers" ADD COLUMN "max_stored_color_systems" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "total_color_system_generations" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "curr_month_color_system_generations" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "total_stored_color_systems" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "color_systems" ADD CONSTRAINT "color_systems_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "color_systems" USING btree ("user_id");--> statement-breakpoint
ALTER TABLE "subscription_tiers" DROP COLUMN IF EXISTS "monthly_generation_limit";--> statement-breakpoint
ALTER TABLE "subscription_tiers" DROP COLUMN IF EXISTS "max_stored_palettes";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "total_generations";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "current_month_generations";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "total_stored_palettes";