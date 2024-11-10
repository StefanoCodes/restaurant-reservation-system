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
          className="overflow-hidden bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
        >
          <CardHeader className="bg-primary/10 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                {table.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={`${getStatusColor(table.status)} text-white`}>
                  {table.status}
                </Badge>
                <DeleteTableButton tableId={table.id} />
                <EditTableButton table={table} />
                <ChangeTableStatus tableId={table.id} status={table.status} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Utensils className="mr-2 h-5 w-5 text-primary" />
                <span className="text-lg">Table</span>
              </div>
              <span className="text-lg font-medium">{table.name}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
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
