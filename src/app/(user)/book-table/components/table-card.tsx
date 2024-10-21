import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, Users } from "lucide-react";
// TODO: Ability for an admin to delete a table from the database 
// ability to change the status of a table from available to unavaibale
// ability for an admin to delete a user from the db & aunthenicated place in supabase
type Table = {
	id: string;
	name: string;
	capacity: number;
	status: "available" | "unavailable";
};

const getStatusColor = (status: Table["status"]) => {
	switch (status) {
		case "available":
			return "bg-green-500";
		case "unavailable":
			return "bg-red-500";
		default:
			return "bg-gray-500";
	}
};

export default function TableCard({ table }: { table: Table }) {
	return (
		<Card
			key={table.id}
			className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
		>
			<CardHeader className="bg-primary/10 pb-2">
				<div className="flex justify-between items-center">
					<CardTitle className="text-xl font-semibold">{table.name}</CardTitle>
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
	);
}
