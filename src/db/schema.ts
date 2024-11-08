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
    id: uuid("id").primaryKey().defaultRandom(),
    memberId: uuid("member_id").references(() => usersTable.userId),
    role: rolesEnum("role").default("user"),
    createdAt: timestamp("created_at").defaultNow(),
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

export type Table = typeof tablesTable.$inferSelect;
export type TableWithStatus = Table & {
  reservedStatus: "available" | "reserved";
  suitable: boolean;
};
export type TableData = typeof tablesTable.$inferSelect;
export type User = typeof usersTable.$inferSelect;
export type Permission = typeof permissionsTable.$inferSelect;
export type BusinessHourData = typeof businessHoursTable.$inferSelect;
