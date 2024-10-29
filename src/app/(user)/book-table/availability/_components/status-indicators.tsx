import { cn } from "@/lib/utils";

const statuses = ["available", "reserved", "unavailable"];
// each status has a color
const statusColors = {
	available: "bg-gray-500",
	reserved: "bg-yellow-500",
	unavailable: "bg-red-500",
};
export default function StatusIndicators() {
	return (
		<div className="flex flex-col sm:flex-row gap-2">
			{statuses.map((status) => (
				<div key={status} className="flex items-center gap-2">
					<div
						className={cn(
							statusColors[status as keyof typeof statusColors],
							"rounded-full w-2 h-2"
						)}
					/>
					<p>{status}</p>
				</div>
			))}
		</div>
	);
}
