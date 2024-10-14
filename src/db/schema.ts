import {
  integer,
  pgTable,
  varchar,
  uuid,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";
export const rolesEnum = pgEnum("roles", ["user", "admin"]);
export const reservationStatusEnum = pgEnum("reservation_status", [
  "pending",
  "confirmed",
  "cancelled",
]);
// USER TABLE
export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: rolesEnum("role").default("user"),
  phoneNumber: varchar("phone_number", { length: 255 }).notNull(),
  userId: varchar("user_id", { length: 255 }).notNull().unique(),
});

// TABLES TABLE

export const tablesTable = pgTable("tables", {
  id: uuid("id").primaryKey().defaultRandom(), // the id of the table
  name: varchar("name", { length: 255 }).notNull(), // the name of the table exapmple T1, T2 etc
  capacity: integer("capacity").notNull(), // how many people the table can seat
});

// RESERVATIONS TABLE

export const reservationsTable = pgTable("reservations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id", { length: 255 }).references(
    () => usersTable.userId
  ),
  tableId: uuid("table_id").references(() => tablesTable.id),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  status: reservationStatusEnum("status").default("pending"),
});
