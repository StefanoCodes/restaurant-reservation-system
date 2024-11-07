import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError, ZodIssue } from "zod";
import { set } from "date-fns";
import { WEEKDAYS } from "@/utils/constants";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// calculate the time picking based off the start and end time of the resturaunt

export function calculateTimeSlots() {
  const dayOfWeek = Intl.DateTimeFormat(undefined, { weekday: "long" })
    .format(new Date())
    .toUpperCase();
  // we will fetch the weekday from the db
  const openingHours = WEEKDAYS[dayOfWeek as keyof typeof WEEKDAYS].OPEN;
  const closingHours = WEEKDAYS[dayOfWeek as keyof typeof WEEKDAYS].CLOSE;

  const difference = closingHours - openingHours;
  const timeSlots = Array.from({ length: difference }, (_, index) => {
    const hours = index + openingHours;
    return `${hours.toString().padStart(2, "0")}:00`;
  });
  return timeSlots;
}

export function isTimeInBetweenOpeningAndClosingHours(time: string) {
  const dayOfWeek = Intl.DateTimeFormat(undefined, { weekday: "long" })
    .format(new Date())
    .toUpperCase();
  const timeToNumber = parseInt(time.split(":")[0]);
  const openingHours = WEEKDAYS[dayOfWeek as keyof typeof WEEKDAYS].OPEN;
  const closingHours = WEEKDAYS[dayOfWeek as keyof typeof WEEKDAYS].CLOSE;
  return timeToNumber >= openingHours && timeToNumber < closingHours;
}

export function isDateInFuture(date: Date | string) {
  const today = new Date(getLocalizedDateTime());
  return new Date(date) >= today;
}
export function formatDateForReservation(date: Date) {
  const dateFormatedPlusOne = new Date(date);
  dateFormatedPlusOne.setDate(dateFormatedPlusOne.getDate() + 1);
  return dateFormatedPlusOne.toISOString().split("T")[0];
}

export function getEndTime(timeString: string, duration: number): string {
  // Create a Date object for today's date at the given time
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  // Add two hours
  date.setHours(date.getHours() + duration);

  // Format the result back to HH:mm
  return date.toTimeString().slice(0, 5);
}

export const formatDateToString = (
  date: Date | null | string,
  options?: Intl.DateTimeFormatOptions,
) => {
  if (!date) return null;
  const dateFormated = new Date(date);
  return dateFormated.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
};

export function formatZodErrors(error: ZodError) {
  return error.errors.reduce((acc: Record<string, string>, error: ZodIssue) => {
    acc[error.path[0]] = error.message;
    return acc;
  }, {});
}

export function formatTimeToDateString(date: Date, time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  // Set hours and minutes on the provided date
  return set(date, { hours, minutes, seconds: 0, milliseconds: 0 });
}

export function getUserLocale() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getLocalizedDateTime(date: Date = new Date()) {
  const timeZone = getUserLocale();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timeZone,
  };
  return Intl.DateTimeFormat(undefined, options).format(date);
}

export function formatTableName(name: string) {
  const tableSlug = name.slice(0, 1);
  const tableNumber = name.slice(name.length - 1);
  return `${tableSlug}${tableNumber}`;
}
