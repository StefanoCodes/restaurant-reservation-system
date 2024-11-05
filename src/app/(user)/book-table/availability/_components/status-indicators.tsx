import { cn } from "@/lib/utils";

const statuses = ["capacity", "reserved"];
// each status has a color
const statusColors = {
  capacity: "bg-yellow-500",
  reserved: "bg-red-500",
};
export default function StatusIndicators() {
  return (
    <div className="flex flex-row gap-2">
      {statuses.map((status) => (
        <div key={status} className="flex items-center gap-2">
          <div
            className={cn(
              statusColors[status as keyof typeof statusColors],
              "h-2 w-2 rounded-full",
            )}
          />
          <p>{status}</p>
        </div>
      ))}
    </div>
  );
}
