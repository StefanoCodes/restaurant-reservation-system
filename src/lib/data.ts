import { db } from "@/db/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Calendar, Home, LogIn, Mail, Table, UserPlus } from "lucide-react";

export const OPEN_HOURS = 8;
export const CLOSE_HOURS = 22;
export const BOOKING_DURATION = 2;
export const WEEKDAYS = {
  MONDAY: {
    OPEN: "08:00",
    CLOSE: "22:00",
  },
  TUESDAY: {
    OPEN: "08:00",
    CLOSE: "22:00",
  },
  WEDNESDAY: {
    OPEN: "08:00",
    CLOSE: "22:00",
  },
  THURSDAY: {
    OPEN: "08:00",
    CLOSE: "22:00",
  },
  FRIDAY: {
    OPEN: "08:00",
    CLOSE: "22:00",
  },
  SATURDAY: {
    OPEN: "08:00",
    CLOSE: "22:00",
  },
  SUNDAY: {
    OPEN: "09:00",
    CLOSE: "22:00",
  },
};

export const ROUTES = [
  {
    name: "Book a Table",
    protected: true,
    path: "/book-table",
    icon: Table,
  },
  {
    name: "Bookings",
    protected: true,
    path: "/bookings",
    icon: Calendar,
  },
  {
    name: "Contact Us",
    protected: false,
    path: "/contact",
    icon: Mail,
  },
];
