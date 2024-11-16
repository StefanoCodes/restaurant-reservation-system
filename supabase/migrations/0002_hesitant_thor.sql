CREATE TABLE IF NOT EXISTS "about_us_content" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"template_id" uuid,
	"title" varchar(255),
	"description" text,
	"image_url" varchar(512),
	"stats" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contact_us_content" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"template_id" uuid,
	"title" varchar(255),
	"subtitle" text,
	"email" varchar(255),
	"phone" varchar(50),
	"address" text,
	"form_fields" json[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feature_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"features_content_id" uuid,
	"title" varchar(255) NOT NULL,
	"description" text,
	"icon_url" varchar(512),
	"sort_order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "features_content" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"template_id" uuid,
	"section_title" varchar(255),
	"section_subtitle" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "footer_content" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"template_id" uuid,
	"logo_url" varchar(512),
	"description" text,
	"social_links" json[] NOT NULL,
	"menu_columns" json[] NOT NULL,
	"copyright_text" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "header_content" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"template_id" uuid,
	"headline" varchar(255) NOT NULL,
	"subheadline" text,
	"primary_button_text" varchar(100),
	"primary_button_url" varchar(512),
	"secondary_button_text" varchar(100),
	"secondary_button_url" varchar(512),
	"hero_images" json[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "navbar_content" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"template_id" uuid,
	"logo_url" varchar(512),
	"menu_items" json[] NOT NULL,
	"cta_button_text" varchar(100),
	"cta_button_url" varchar(512)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "about_us_content" ADD CONSTRAINT "about_us_content_template_id_marketing_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."marketing_templates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contact_us_content" ADD CONSTRAINT "contact_us_content_template_id_marketing_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."marketing_templates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feature_items" ADD CONSTRAINT "feature_items_features_content_id_features_content_id_fk" FOREIGN KEY ("features_content_id") REFERENCES "public"."features_content"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "features_content" ADD CONSTRAINT "features_content_template_id_marketing_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."marketing_templates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "footer_content" ADD CONSTRAINT "footer_content_template_id_marketing_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."marketing_templates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "header_content" ADD CONSTRAINT "header_content_template_id_marketing_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."marketing_templates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "navbar_content" ADD CONSTRAINT "navbar_content_template_id_marketing_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."marketing_templates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
