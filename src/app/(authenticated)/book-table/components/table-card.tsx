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
  const chairs = Array.from(
    { length: table.capacity },
    (_, index) => index + 1
  );
  return (
    <div
      className="bg-orange-500 w-[250px] h-[250px] hover:skew-x-[-2deg] rounded-md relative"
      onClick={() => onClick(table.id === selectedTable?.id ? null : table)}
      role="button"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center cursor-pointer">
        {/* {chairs.map((chair, index) => (
          <li
            key={chair}
            className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom rotate-${
              index * 45
            }`}
          >
            <div
              className={`relative -top-[1rem] flex w-[3.2rem] h-[3.2rem] bg-white border border-white/15 rounded-xl -rotate-${
                index * 45
              }`}
            >
              <div className="w-2 h-2 bg-white rounded-sm"></div>
            </div>
          </li>
        ))} */}
        <div className="flex flex-col gap-2 bg-white/50 p-4 rounded-lg">
          <div className="text-white text-xl font-semibold">{table.name}</div>
          <div className="text-white text-sm">{table.capacity} people</div>
        </div>
      </div>
    </div>
  );
}
