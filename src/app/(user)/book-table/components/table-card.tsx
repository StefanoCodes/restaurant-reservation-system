import { Table } from "@/db/schema";
import { cn } from "@/lib/utils";

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
    <button
      className={cn(
        "bg-orange-500 w-[150px] h-[150px] transition-all duration-300 ease-in-out md:w-[250px] md:h-[250px] rounded-lg relative",
        table.id === selectedTable?.id
          ? "scale-105 bg-orange-600"
          : "bg-zinc-600",
        table.status === "unavailable" && "opacity-50 cursor-not-allowed"
      )}
      onClick={() => onClick(table.id === selectedTable?.id ? null : table)}
      role="button"
      aria-disabled={table.status === "unavailable"}
      disabled={table.status === "unavailable"}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center rounded-lg justify-center">
        <div className="flex flex-col gap-2 bg-white/50 p-4 rounded-lg">
          <div className="text-white text-xl font-semibold">{table.name}</div>
          <div className="text-white text-sm">{table.capacity} people</div>
          <div className="text-white text-sm flex items-center">
            <span
              className={cn(
                `w-2 h-2 rounded-full inline-block mr-2`,
                table.status === "unavailable" ? "bg-red-500" : "bg-green-500"
              )}
            ></span>
            {table.status === "unavailable" ? "Unavailable" : "Available"}
          </div>
        </div>
      </div>
    </button>
  );
}
