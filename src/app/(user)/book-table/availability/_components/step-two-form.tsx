import { TableWithStatus } from "@/db/schema";
import DisplayTables from "./display-tables";
import { getAvailableTables } from "@/lib/data/data";
import StatusIndicators from "./status-indicators";
export default async function StepTwo({
	userId,
	date,
	time,
	numberOfPeople,
}: {
	userId: string;
	date: string;
	time: string;
	numberOfPeople: string;
}) {
	const availableTables = await getAvailableTables(date, time, numberOfPeople);
	return (
		<div className="flex flex-col items-center gap-5 max-w-5xl">
			<div className="flex flex-col sm:flex-row justify-between items-center gap-2 w-full">
				<h1 className="text-2xl font-bold text-center md:text-left">
					Select A Table
				</h1>
				<StatusIndicators />
			</div>
			<DisplayTables tables={availableTables as TableWithStatus[]} userId={userId} />
		</div>
	);
}
