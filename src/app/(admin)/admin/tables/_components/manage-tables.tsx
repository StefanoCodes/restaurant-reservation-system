import AdminTablesView from "@/app/(admin)/admin/tables/_components/admins-tables-view";
import { Table, TableData } from "@/db/schema";
import { getTables } from "@/lib/data";
import TablePageStatistics from "./table-page-statistics";
export default async function TablesList() {
	const tables = await getTables();
	if (!tables) return;

	return (
		<div>
			<TablePageStatistics tables={tables as TableData[]} />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
				{tables.map((table: Table) => {
					return (
						<AdminTablesView key={table.id!} tables={[table] as TableData[]} />
					);
				})}
			</div>
		</div>
	);
}
