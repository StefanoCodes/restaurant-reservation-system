import Link from "next/link";
import AddNewTable from "./add-new-table";

export default function NoTablesFound() {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<h2 className="text-2xl font-semibold">No Tables found</h2>
		</div>
	);
}
