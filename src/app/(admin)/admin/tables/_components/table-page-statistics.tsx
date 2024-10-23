import { Table, TableData } from "@/db/schema";
import StatisticsCard from "./statistic-card";
import { LayoutGrid, Users } from "lucide-react";

export default function TablePageStatistics({
	tables,
}: {
	tables: TableData[];
}) {
	console.log(tables.length);
	const totalTables = tables.length;
	const totalCapacity = tables.reduce((acc, table) => acc + table.capacity, 0);
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
			<StatisticsCard
				icon={<LayoutGrid className="h-8 w-8 text-primary mr-2" />}
				statisticTitle="Total Tables"
				statisticValue={totalTables}
			/>
			<StatisticsCard
				icon={<Users className="h-8 w-8 text-primary mr-2" />}
				statisticTitle="Total Capacity"
				statisticValue={totalCapacity}
			/>
		</div>
	);
}
