DO $$ BEGIN
 CREATE TYPE "public"."marketing_template" AS ENUM('TemplateOne', 'TemplateTwo', 'TemplateThree');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."reservation_status" AS ENUM('pending', 'confirmed', 'cancelled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."roles" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."table_status" AS ENUM('available', 'reserved', 'unavailable');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."week_days" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "business_hours" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"week_day" "week_days" NOT NULL,
	"open_time" integer NOT NULL,
	"close_time" integer NOT NULL,
	"closed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "closed_dates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"closed_date" date NOT NULL,
	"reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customizability" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "marketing_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"template_name" "marketing_template" NOT NULL,
	"template_description" text NOT NULL,
	"template_colors" text[] NOT NULL,
	"selected" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"member_id" uuid NOT NULL,
	"role" "roles" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reservations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"reservation_date" date NOT NULL,
	"table_id" uuid,
	"start_time" varchar(255) NOT NULL,
	"end_time" varchar(255) NOT NULL,
	"reservation_name" varchar(255) NOT NULL,
	"reservation_phone" varchar(255) NOT NULL,
	"reservation_email" varchar(255) NOT NULL,
	"status" "reservation_status" DEFAULT 'pending' NOT NULL,
	"number_of_people" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"notes" text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_duration_interval" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tables" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"capacity" integer NOT NULL,
	"status" "table_status" DEFAULT 'available' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(255) NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "permissions" ADD CONSTRAINT "permissions_member_id_users_user_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservations" ADD CONSTRAINT "reservations_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservations" ADD CONSTRAINT "reservations_table_id_tables_id_fk" FOREIGN KEY ("table_id") REFERENCES "public"."tables"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "closed_date_idx" ON "closed_dates" USING btree ("closed_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "selected_idx" ON "marketing_templates" USING btree ("selected");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "id_idx" ON "marketing_templates" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "member_idx" ON "permissions" USING btree ("member_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reservation_user_id_idx" ON "reservations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "date_time_table_idx" ON "reservations" USING btree ("reservation_date","table_id","start_time");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reservation_status_idx" ON "reservations" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "status_capacity_idx" ON "tables" USING btree ("status","capacity");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "table_name_idx" ON "tables" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "phone_number_idx" ON "users" USING btree ("phone_number");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "users" USING btree ("user_id");