import { TableWithStatus as TableType } from "@/db/schema";
import DisplayTables from "./display-tables";
import { getAvailableTables } from "@/lib/data/data";
import StatusIndicators from "./status-indicators";
export default async function StepTwo({
  date,
  time,
  numberOfPeople,
}: {
  date: string;
  time: string;
  numberOfPeople: string;
}) {
  const availableTables = await getAvailableTables(date, time, numberOfPeople);
  return (
    <div className="flex max-w-5xl flex-col items-center gap-5">
      <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
        <h1 className="text-center text-2xl font-bold md:text-left">
          Select A Table
        </h1>
        <StatusIndicators />
      </div>
      <DisplayTables
        tables={availableTables as TableType[]}
        date={date}
        time={time}
        numberOfPeople={numberOfPeople}
      />
    </div>
  );
}
