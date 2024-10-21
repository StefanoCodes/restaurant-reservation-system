import { Calendar, Mail, Table, User } from "lucide-react";

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
];
