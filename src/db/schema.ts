import {
  integer,
  pgTable,
  varchar,
  uuid,
  pgEnum,
  timestamp,
  text,
  date,
} from "drizzle-orm/pg-core";
export const rolesEnum = pgEnum("roles", ["user", "admin"]);
export const reservationStatusEnum = pgEnum("reservation_status", [
  "pending",
  "confirmed",
  "cancelled",
]);
// incase the table has mantaince or something
export const tableStatusEnum = pgEnum("table_status", [
  "available",
  "unavailable",
]);
// USER TABLE
export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: rolesEnum("role").default("user"),

  phoneNumber: varchar("phone_number", { length: 255 }).notNull(),
  userId: varchar("user_id", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

// TABLES TABLE

export const tablesTable = pgTable("tables", {
  id: uuid("id").primaryKey().defaultRandom(), // the id of the table
  name: varchar("name", { length: 255 }).notNull(), // the name of the table exapmple T1, T2 etc
  capacity: integer("capacity").notNull(), // how many people the table can seat
  status: tableStatusEnum("status").default("available"),
});

// RESERVATIONS TABLE

export const reservationsTable = pgTable("reservations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id", { length: 255 }).references(
    () => usersTable.userId
  ),
  reservationDate: date("reservation_date").notNull(),
  tableId: uuid("table_id").references(() => tablesTable.id),
  startTime: varchar("start_time", {
    length: 255,
  }).notNull(),
  endTime: varchar("end_time", {
    length: 255,
  }).notNull(),
  status: reservationStatusEnum("status").default("pending"),
  numberOfPeople: integer("number_of_people").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  notes: text("notes").default(""),
});

export type Table = typeof tablesTable.$inferSelect;
export type User = typeof usersTable.$inferSelect;
