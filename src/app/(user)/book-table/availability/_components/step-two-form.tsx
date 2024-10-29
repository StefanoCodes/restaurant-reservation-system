import DisplayTables from "./display-tables";
import { getAvailableTables } from "@/lib/data/data";
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
		<div className="flex flex-col justify-center gap-5">
			<h1 className="text-2xl font-bold text-center md:text-left">
				Select A Table
			</h1>
			<DisplayTables tables={availableTables} userId={userId} />
		</div>
	);
}
