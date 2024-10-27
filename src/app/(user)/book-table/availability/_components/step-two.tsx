import { getTables } from "@/lib/data";
import DisplayTables from "./display-tables";
export default async function StepTwo({ userId }: { userId: string }) {
	const tables = await getTables();
	return (
		<div className="flex flex-col justify-center gap-5">
			<h1 className="text-2xl font-bold text-center md:text-left">
				Select A Table
			</h1>
			<DisplayTables tables={tables} userId={userId} />
		</div>
	);
}
