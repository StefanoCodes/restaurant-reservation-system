import { getMaxCapacity } from "@/lib/data/user";
import { z } from "zod";

export const registerSchema = z.object({
	name: z.string().min(3, {
		message: "Name must be at least 3 characters",
	}),
	email: z.string().email({
		message: "Invalid email address",
	}),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters",
	}),
	phoneNumber: z.string().min(10, {
		message: "Phone number must be at least 10 characters",
	}),
});

export const loginSchema = z.object({
	email: z.string().email({
		message: "Invalid email address",
	}),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters",
	}),
});

export const reservationSchema = z.object({
	name: z.string().min(3, {
		message: "Name must be at least 3 characters",
	}),
	email: z.string().email({
		message: "Invalid email address",
	}),
	phoneNumber: z.string().min(10, {
		message: "Phone number must be at least 10 characters",
	}),
	time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
		message: "Time must be in HH:mm format (e.g., 09:00)",
	}),
	reservationDate: z.string().regex(/^(\d{4})-(\d{2})-(\d{2})$/, {
		message: "Date must be in YYYY-MM-DD format (e.g., 2024-01-01)",
	}),
	numberOfPeople: z.coerce
		.number()
		.int()
		.positive()
		.min(1, {
			message: "Number of people must be at least 1",
		})
		.max(10, {
			message: "Number of people must be at most 10",
		}),
	specialRequests: z.string().optional(),
	tableId: z.string(),
	userId: z.string(),
});
// name needs to start with the letter T and end in a number
export const addNewTableSchema = z.object({
	name: z.string().min(1, {
		message: "Table name is required",
	}),
	capacity: z.coerce.number().int().positive().min(1, {
		message: "Table capacity must be at least 1",
	}),
});

export const createBookTableSchema = async () => {
	const maxCapacity = await getMaxCapacity();
	if (!maxCapacity) {
		throw new Error("Max capacity not found");
	}
	return z.object({
		date: z.string({
			message: "Date is required",
		}),
		time: z.string({
			message: "Time is required",
		}),
		numberOfPeople: z.coerce
			.number()
			.int()
			.positive()
			.min(1, {
				message: "Number of people must be at least 1",
			})
			.max(maxCapacity, {
				message: `Number of people must be at most ${maxCapacity}`,
			}),
	});
};

export const stepTwoSchema = z.object({
	name: z.string(),
	status: z.enum(["available", "unavailable"]),
	capacity: z.number(),
	id: z.string(),
});

export const stepThreeSchema = z.object({
	date: z.string({
		message: "Date is required",
	}),
	time: z.string({
		message: "Time is required",
	}),
	numberOfPeople: z.coerce.number().int().positive().min(1, {
		message: "Number of people must be at least 1",
	}),
	specialRequests: z.string().optional(),
	tableName: z.string(),
	name: z.string().min(3, {
		message: "Name must be at least 3 characters",
	}),
	email: z.string().email({
		message: "Invalid email address",
	}),
	phone: z.string().min(10, {
		message: "Phone number must be at least 10 characters",
	}),
});

export const newReservationInitialValuesType = z.object({
	date: z.string(),
	time: z.string(),
	numberOfPeople: z.string(),
	tableName: z.string(),
});

export const findAvailableTablesSchema = z.object({
	date: z.string().regex(/^(\d{4})-(\d{2})-(\d{2})$/, {
		message: "Date must be in YYYY-MM-DD format (e.g., 2024-01-01)",
	}),
	numberOfPeople: z.coerce.number().int().positive().min(1, {
		message: "Number of people must be at least 1",
	}),
	time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
		message: "Time must be in HH:mm format (e.g., 09:00)",
	}),
});

export type newReservationInitialValuesType = z.infer<
	typeof newReservationInitialValuesType
>;
export type findAvailableTablesSchema = z.infer<
	typeof findAvailableTablesSchema
>;
