DO $$ BEGIN
 CREATE TYPE "public"."colorSystem_mode" AS ENUM('light', 'dark');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."subscription_tier_type" AS ENUM('Basic', 'Pro', 'Max');
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
	"base_colors" uuid[] NOT NULL,
	"background_color" uuid NOT NULL,
	"is_favorite" boolean DEFAULT false NOT NULL,
	"is_private" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "colors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"okhsl" text NOT NULL,
	"hex" text NOT NULL,
	"rgb" text NOT NULL,
	"hsl" text NOT NULL,
	"oklch" text NOT NULL,
	"cmyk" text NOT NULL,
	"hsb" text NOT NULL,
	"lab" text NOT NULL,
	"lch" text NOT NULL,
	"displayp3" text NOT NULL,
	"a98" text NOT NULL,
	"prophoto" text NOT NULL,
	"xyz" text NOT NULL,
	CONSTRAINT "colors_okhsl_unique" UNIQUE("okhsl"),
	CONSTRAINT "colors_hex_unique" UNIQUE("hex")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscription_tiers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "subscription_tier_type" DEFAULT 'Basic' NOT NULL,
	"monthly_color_system_generation_limit" integer NOT NULL,
	"max_stored_color_systems" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	CONSTRAINT "subscription_tiers_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"subscription_tier_id" integer NOT NULL,
	"start_date" timestamp with time zone DEFAULT now() NOT NULL,
	"end_date" timestamp with time zone,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" text NOT NULL,
	"stripe_customer_id" text,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"current_subscription_tier_id" integer NOT NULL,
	"total_color_system_generations" integer DEFAULT 0 NOT NULL,
	"curr_month_color_system_generations" integer DEFAULT 0 NOT NULL,
	"total_stored_color_systems" integer DEFAULT 0 NOT NULL,
	"last_generation_reset" timestamp with time zone DEFAULT now(),
	"last_login_date" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_stripe_customer_id_unique" UNIQUE("stripe_customer_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "color_systems" ADD CONSTRAINT "color_systems_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_subscription_tier_id_subscription_tiers_id_fk" FOREIGN KEY ("subscription_tier_id") REFERENCES "public"."subscription_tiers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_current_subscription_tier_id_subscription_tiers_id_fk" FOREIGN KEY ("current_subscription_tier_id") REFERENCES "public"."subscription_tiers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "color_systems" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "okhsl_idx" ON "colors" USING btree ("okhsl");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "hex_idx" ON "colors" USING btree ("hex");