import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, Users } from "lucide-react";
import { Table, TableData } from "@/db/schema";
import DeleteTableButton from "./delete-table-button";
import EditTableButton from "./edit-table-information-btn";
import ChangeTableStatus from "./change-table-status";

const getStatusColor = (status: Table["status"]) => {
	switch (status) {
		case "available":
			return "bg-green-500";
		case "unavailable":
			return "bg-red-500";
	}
};

export default function AdminTablesView({ tables }: { tables: TableData[] }) {
	return (
		<>
			{tables.map((table) => (
				<Card
					key={table.id}
					className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
				>
					<CardHeader className="bg-primary/10 pb-2">
						<div className="flex justify-between items-center">
							<CardTitle className="text-xl font-semibold">
								{table.name}
							</CardTitle>
							<div className="flex items-center gap-2">
								<Badge className={`${getStatusColor(table.status)} text-white`}>
									{table.status}
								</Badge>
								<DeleteTableButton tableId={table.id} />
								<EditTableButton table={table} />
								<ChangeTableStatus tableId={table.id} />
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<Utensils className="h-5 w-5 text-primary mr-2" />
								<span className="text-lg">Table</span>
							</div>
							<span className="text-lg font-medium">{table.name}</span>
						</div>
						<div className="flex items-center justify-between mt-2">
							<div className="flex items-center">
								<Users className="h-5 w-5 text-primary mr-2" />
								<span className="text-lg">Capacity</span>
							</div>
							<span className="text-lg font-medium">{table.capacity}</span>
						</div>
					</CardContent>
				</Card>
			))}
		</>
	);
}
