import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, Users, LayoutGrid } from "lucide-react";

type Table = {
	id: string;
	name: string;
	capacity: number;
	status: "Available" | "Occupied" | "Reserved";
};

// This would typically come from your database or API
const tables: Table[] = [
	{ id: "1", name: "Table 1", capacity: 4, status: "Available" },
	{ id: "2", name: "Table 2", capacity: 2, status: "Occupied" },
	{ id: "3", name: "Table 3", capacity: 6, status: "Reserved" },
	{ id: "4", name: "Table 4", capacity: 8, status: "Available" },
	{ id: "5", name: "Bar 1", capacity: 5, status: "Occupied" },
	{ id: "6", name: "Patio 1", capacity: 4, status: "Available" },
];

const getStatusColor = (status: Table["status"]) => {
	switch (status) {
		case "Available":
			return "bg-green-500";
		case "Occupied":
			return "bg-red-500";
		case "Reserved":
			return "bg-yellow-500";
		default:
			return "bg-gray-500";
	}
};

export default function AdminTablesView() {
	const totalTables = tables.length;
	const totalCapacity = tables.reduce((sum, table) => sum + table.capacity, 0);

	return (
		<div className="container mx-auto p-6 bg-gray-50">
			<div className="mb-8 text-center">
				<h1 className="text-3xl font-bold mb-2">Restaurant Tables Overview</h1>
				<p className="text-gray-600">
					Manage and monitor your restaurant's seating arrangement
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-lg font-medium">Total Tables</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center">
							<LayoutGrid className="h-8 w-8 text-primary mr-2" />
							<span className="text-3xl font-bold">{totalTables}</span>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-lg font-medium">
							Total Capacity
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center">
							<Users className="h-8 w-8 text-primary mr-2" />
							<span className="text-3xl font-bold">{totalCapacity}</span>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
								<Badge className={`${getStatusColor(table.status)} text-white`}>
									{table.status}
								</Badge>
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
			</div>
		</div>
	);
}
