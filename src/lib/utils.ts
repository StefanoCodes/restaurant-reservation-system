import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// calculate the time picking based off the start and end time of the resturaunt

export function calculateTimeSlots(open: number, close: number) {
  const difference = close - open; // this will give us the array length to fill it up with the times
  const timeSlots = Array.from({ length: difference }, (_, index) => {
    const hours = index + open;
    return `${hours.toString().padStart(2, "0")}:00`;
  });
  return timeSlots;
}

export function formatDateForReservation(date: Date) {
  const dateFormated = date.toISOString().split("T")[0];
  return dateFormated;
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
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
) => {
  const dateFormated = new Date(date);
  return dateFormated.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
};
