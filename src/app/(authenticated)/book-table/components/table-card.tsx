import { Table } from "@/db/schema";

export default function TableCard({
  table,
  onClick,
  selectedTable,
}: {
  table: Table;
  onClick: (table: Table | null) => void;
  selectedTable: Table | null;
}) {
  return (
    <div
      className="bg-orange-500 w-[150px] h-[150px] md:w-[250px] md:h-[250px] rounded-lg relative"
      onClick={() => onClick(table.id === selectedTable?.id ? null : table)}
      role="button"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center rounded-lg justify-center cursor-pointer">
        <div className="flex flex-col gap-2 bg-white/50 p-4 rounded-lg">
          <div className="text-white text-xl font-semibold">{table.name}</div>
          <div className="text-white text-sm">{table.capacity} people</div>
        </div>
      </div>
    </div>
  );
}
