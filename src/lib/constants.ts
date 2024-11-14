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
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
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
    name: "Marketing",
    path: "/admin/marketing",
    icon: Mail,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];
export const MARKETING_ROUTES = [
  { name: "Home", href: "#home", current: false },
  { name: "Features", href: "#features", current: false },
  { name: "About Us", href: "#about", current: false },
  { name: "Contact Us", href: "#contact", current: false },
  { name: "Book A Table", href: "/book-table", current: false },
];
