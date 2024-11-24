// starting to add row level security policy therefore changed the user_id to a uuid instead of varchar to match the Auth.userId
// will need to update teh schema npx drizzle-kit generate & npx drizzle-kit migrate

import {
  integer,
  pgTable,
  varchar,
  uuid,
  pgEnum,
  timestamp,
  text,
  date,
  boolean,
  index,
  json,
} from "drizzle-orm/pg-core";
export const rolesEnum = pgEnum("roles", ["user", "admin"]);
export const reservationStatusEnum = pgEnum("reservation_status", [
  "pending",
  "confirmed",
  "cancelled",
]);
export const weekDaysEnum = pgEnum("week_days", [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);
export const marketingTemplateEnum = pgEnum("marketing_template", [
  "TemplateOne",
  "TemplateTwo",
  "TemplateThree",
]);
// incase the table has mantaince or something
export const tableStatusEnum = pgEnum("table_status", [
  "available",
  "reserved",
  "unavailable",
]);
// USER TABLE
export const usersTable = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    phoneNumber: varchar("phone_number", { length: 255 }).notNull(),
    userId: uuid("user_id").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    // we willcreateindexes on the email and phone number
  },
  (table) => ({
    emailIdx: index("email_idx").on(table.email),
    phoneNumberIdx: index("phone_number_idx").on(table.phoneNumber),
    userIdIdx: index("user_id_idx").on(table.userId),
  }),
);

// TABLES TABLE

export const tablesTable = pgTable(
  "tables",
  {
    id: uuid("id").primaryKey().defaultRandom(), // the id of the table
    name: varchar("name", { length: 255 }).notNull(), // the name of the table exapmple T1, T2 etc
    capacity: integer("capacity").notNull(), // how many people the table can seat
    status: tableStatusEnum("status").default("available").notNull(),
  },
  (table) => ({
    statusCapacityIdx: index("status_capacity_idx").on(
      table.status,
      table.capacity,
    ),
    nameIdx: index("table_name_idx").on(table.name),
  }),
);

// RESERVATIONS TABLE

export const reservationsTable = pgTable(
  "reservations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => usersTable.userId),
    reservationDate: date("reservation_date").notNull(),
    tableId: uuid("table_id").references(() => tablesTable.id),
    startTime: varchar("start_time", {
      length: 255,
    }).notNull(),
    endTime: varchar("end_time", {
      length: 255,
    }).notNull(),
    reservationName: varchar("reservation_name", {
      length: 255,
    }).notNull(),
    reservationPhone: varchar("reservation_phone", {
      length: 255,
    }).notNull(),
    reservationEmail: varchar("reservation_email", {
      length: 255,
    }).notNull(),
    reservationStatus: reservationStatusEnum("status")
      .default("pending")
      .notNull(),
    numberOfPeople: integer("number_of_people").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    notes: text("notes").default(""),
  },
  (table) => ({
    userIdIdx: index("reservation_user_id_idx").on(table.userId),
    dateTimeTableIdx: index("date_time_table_idx").on(
      table.reservationDate,
      table.tableId,
      table.startTime,
    ),
    statusIdx: index("reservation_status_idx").on(table.reservationStatus),
  }),
);

// Permissions TABLE

export const permissionsTable = pgTable(
  "permissions",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    memberId: uuid("member_id")
      .references(() => usersTable.userId)
      .notNull(),
    role: rolesEnum("role").default("user").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (permissions) => ({
    memberIdx: index("member_idx").on(permissions.memberId), // Add this index
  }),
);

// Settings Table

export const settingsTable = pgTable("settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingDurationInterval: integer("booking_duration_interval").notNull(),
});

export const businessHoursTable = pgTable("business_hours", {
  id: uuid("id").primaryKey().defaultRandom(),
  weekDay: weekDaysEnum("week_day").notNull(),
  openTime: integer("open_time").notNull(),
  closeTime: integer("close_time").notNull(),
  closed: boolean("closed").default(false).notNull(),
});

// Customizabiity Table

export const customizabilityTable = pgTable("customizability", {
  id: uuid("id").primaryKey().defaultRandom(),
  // bg color of the website
});

// Marketing Templates Table
export const marketingTemplatesTable = pgTable(
  "marketing_templates",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    templateName: marketingTemplateEnum("template_name").notNull(),
    templateDescription: text("template_description").notNull(),
    templateColors: text("template_colors").array().notNull(),
    selected: boolean("selected").default(false).notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    selectedIdx: index("selected_idx").on(table.selected),
    idIdx: index("id_idx").on(table.id),
  }),
);

export const closedDatesTable = pgTable(
  "closed_dates",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    closedDate: date("closed_date").notNull(),
    reason: text("reason"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    closedDateIdx: index("closed_date_idx").on(table.closedDate), // Add index for faster date lookups
  }),
);

// // Navbar content
// export const navbarContentTable = pgTable("navbar_content", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   templateId: uuid("template_id").references(() => marketingTemplatesTable.id),
//   logoUrl: varchar("logo_url", { length: 512 }),
//   menuItems: json("menu_items").array().notNull(), // Array of {label: string, href: string}
//   ctaButtonText: varchar("cta_button_text", { length: 100 }),
//   ctaButtonUrl: varchar("cta_button_url", { length: 512 }),
// });

// // Header/Hero content
// export const headerContentTable = pgTable("header_content", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   templateId: uuid("template_id").references(() => marketingTemplatesTable.id),
//   headline: varchar("headline", { length: 255 }).notNull(),
//   subheadline: text("subheadline"),
//   primaryButtonText: varchar("primary_button_text", { length: 100 }),
//   primaryButtonUrl: varchar("primary_button_url", { length: 512 }),
//   secondaryButtonText: varchar("secondary_button_text", { length: 100 }),
//   secondaryButtonUrl: varchar("secondary_button_url", { length: 512 }),
//   heroImages: json("hero_images").array().notNull(),
// });

// // Features content
// export const featuresContentTable = pgTable("features_content", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   templateId: uuid("template_id").references(() => marketingTemplatesTable.id),
//   sectionTitle: varchar("section_title", { length: 255 }),
//   sectionSubtitle: text("section_subtitle"),
// });

// // Individual features
// export const featureItemsTable = pgTable("feature_items", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   featuresContentId: uuid("features_content_id").references(
//     () => featuresContentTable.id,
//   ),
//   title: varchar("title", { length: 255 }).notNull(),
//   description: text("description"),
//   iconUrl: varchar("icon_url", { length: 512 }),
//   sortOrder: integer("sort_order").notNull(),
// });

// // About Us content
// export const aboutUsContentTable = pgTable("about_us_content", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   templateId: uuid("template_id").references(() => marketingTemplatesTable.id),
//   title: varchar("title", { length: 255 }),
//   description: text("description"),
//   imageUrl: varchar("image_url", { length: 512 }),
//   stats: json("stats"), // Array of {label: string, value: string}
// });

// // Contact Us content
// export const contactUsContentTable = pgTable("contact_us_content", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   templateId: uuid("template_id").references(() => marketingTemplatesTable.id),
//   title: varchar("title", { length: 255 }),
//   subtitle: text("subtitle"),
//   email: varchar("email", { length: 255 }),
//   phone: varchar("phone", { length: 50 }),
//   address: text("address"),
//   formFields: json("form_fields").array().notNull(), // Array of {label: string, type: string, required: boolean}
// });

// // Footer content
// export const footerContentTable = pgTable("footer_content", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   templateId: uuid("template_id").references(() => marketingTemplatesTable.id),
//   logoUrl: varchar("logo_url", { length: 512 }),
//   description: text("description"),
//   socialLinks: json("social_links").array().notNull(), // Array of {platform: string, url: string}
//   menuColumns: json("menu_columns").array().notNull(), // Array of {title: string, links: Array<{label: string, url: string}>}
//   copyrightText: varchar("copyright_text", { length: 255 }),
// });

export type Table = typeof tablesTable.$inferSelect;
export type TableWithStatus = Table & {
  reservedStatus: "available" | "reserved";
  suitable: boolean;
};
export type TableData = typeof tablesTable.$inferSelect;
export type User = typeof usersTable.$inferSelect;
export type Permission = typeof permissionsTable.$inferSelect;
export type BusinessHourData = typeof businessHoursTable.$inferSelect;
export type MarketingTemplate = typeof marketingTemplatesTable.$inferSelect;
export type ClosedDate = typeof closedDatesTable.$inferSelect;
