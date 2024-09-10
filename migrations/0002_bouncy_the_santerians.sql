DO $$ BEGIN
 CREATE TYPE "public"."palette_mode" AS ENUM('light', 'dark');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "color_palettes" ADD COLUMN "mode" "palette_mode" NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "color_palettes" USING btree ("user_id");