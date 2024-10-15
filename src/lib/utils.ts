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
export function formatDate(date: Date) {
  const dateFormated = new Date(date);
  return dateFormated.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
