import Link from "next/link";
import AddNewTable from "./add-new-table";

export default function NoTablesFound() {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<h2 className="text-2xl font-semibold">No Tables found</h2>
			<Link
				href="/book-table"
				className="bg-orange-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-orange-600 transition-colors"
			>
				<AddNewTable />
			</Link>
		</div>
	);
}
