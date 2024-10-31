import AdminTablesView from "@/app/(admin)/admin/tables/_components/admins-tables-view";
import TablePageStatistics from "./table-page-statistics";
import NoTablesFound from "./no-tables-found";
import { getAllTablesAdmin } from "@/lib/data/admin";
export default async function TablesList() {
	const tables = await getAllTablesAdmin();
	const isTablesEmpty = tables.length === 0;
	if (isTablesEmpty) return <NoTablesFound />;
	return (
		<div>
			<TablePageStatistics tables={tables} />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
				<AdminTablesView tables={tables} />
			</div>
		</div>
	);
}
