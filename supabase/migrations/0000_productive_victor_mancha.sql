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
CREATE TABLE IF NOT EXISTS "permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"member_id" varchar(255),
	"role" "roles" DEFAULT 'user',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reservation_form_completion_status" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(255),
	"step_one" boolean DEFAULT false,
	"step_two" boolean DEFAULT false,
	"step_three" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reservations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(255),
	"reservation_date" date NOT NULL,
	"table_id" uuid,
	"start_time" varchar(255) NOT NULL,
	"end_time" varchar(255) NOT NULL,
	"reservation_name" varchar(255) NOT NULL,
	"reservation_phone" varchar(255) NOT NULL,
	"reservation_email" varchar(255) NOT NULL,
	"status" "reservation_status" DEFAULT 'pending',
	"number_of_people" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"notes" text DEFAULT ''
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
	"user_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
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
 ALTER TABLE "reservation_form_completion_status" ADD CONSTRAINT "reservation_form_completion_status_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
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
