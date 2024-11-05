import {
  Calendar,
  Mail,
  Settings,
  Table,
  User,
  UserRoundPlus,
} from "lucide-react";

export const BOOKING_DURATION = 2;
// this will in future be part of the confg / settings in the admin panel
export const WEEKDAYS = {
  MONDAY: {
    OPEN: 8,
    CLOSE: 22,
  },
  TUESDAY: {
    OPEN: 8,
    CLOSE: 22,
  },
  WEDNESDAY: {
    OPEN: 8,
    CLOSE: 22,
  },
  THURSDAY: {
    OPEN: 8,
    CLOSE: 22,
  },
  FRIDAY: {
    OPEN: 8,
    CLOSE: 22,
  },
  SATURDAY: {
    OPEN: 8,
    CLOSE: 22,
  },
  SUNDAY: {
    OPEN: 9,
    CLOSE: 22,
  },
};

export const USER_ROUTES = [
  {
    name: "Book a Table",
    path: "/book-table",
    icon: Table,
  },
  {
    name: "Bookings",
    path: "/bookings",
    icon: Calendar,
  },
  {
    name: "Contact Us",
    path: "/contact",
    icon: Mail,
  },
];

// TODO: add new admin routes 1. Manage Admins 2. Configure Settings
export const ADMIN_ROUTES = [
  {
    name: "Manage Bookings",
    path: "/admin/bookings",
    icon: Calendar,
  },
  {
    name: "Manage Users",
    path: "/admin/users",
    icon: User,
  },
  {
    name: "Manage Tables",
    path: "/admin/tables",
    icon: Table,
  },
  {
    name: "Manage Admins",
    path: "/admin/admins",
    icon: UserRoundPlus,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];
