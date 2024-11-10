import { WEEKDAYS } from "@/lib/constants";

export default function BusinessHours() {
  const days = Object.keys(WEEKDAYS);
  const hours = Object.values(WEEKDAYS);
  return (
    <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
      {days.map((day, index) => (
        <li key={day} className="capitalize">
          {day.toLowerCase()}: {hours[index].OPEN}am - {hours[index].CLOSE}pm
        </li>
      ))}
    </ul>
  );
}
