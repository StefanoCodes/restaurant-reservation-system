import { Table } from "@/db/schema";
import TableCard from "./table-card";
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
    <div className="flex flex-col gap-4">
      <span className="text-xl font-semibold">
        Table Selected: {selectedTable?.name}
      </span>
      <div className="flex flex-wrap gap-4">
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
    </div>
  );
}
