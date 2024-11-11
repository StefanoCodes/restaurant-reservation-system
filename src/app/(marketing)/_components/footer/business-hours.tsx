import { marketingConfig } from "@/app/(marketing)/marketing.config";
const { businessHours } = marketingConfig.Footer;

export default function BusinessHours() {
  const days = Object.keys(businessHours);
  const hours = Object.values(businessHours);
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Opening Hours
      </h3>
      <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
        {days.map((day, index) => (
          <li key={day} className="capitalize">
            {day.toLowerCase()}: {hours[index].OPEN}am - {hours[index].CLOSE}pm
          </li>
        ))}
      </ul>
    </div>
  );
}
