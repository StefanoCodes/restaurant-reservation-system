import { Table } from "@/db/schema";
import TableCard from "@/app/(user)/book-table/_components/table-card";
export default function TablesContainer({
	tables,
	onTableClick,
	selectedTable,
}: {
	tables: Table[];
	selectedTable: Table | null;
	onTableClick: (table: Table | null) => void;
}) {
	return (
		<div className="flex flex-wrap justify-center md:justify-start gap-4">
			{tables.map((table) => {
				return (
					<TableCard
						key={table.id}
						table={table}
						onClick={onTableClick}
						selectedTable={selectedTable}
					/>
				);
			})}
		</div>
	);
}
