DO $$ BEGIN
 CREATE TYPE "public"."marketing_template" AS ENUM('TemplateOne', 'TemplateTwo', 'TemplateThree');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "templates" ADD COLUMN "selected_template" "marketing_template" DEFAULT 'TemplateOne';