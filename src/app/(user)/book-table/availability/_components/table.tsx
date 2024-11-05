"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table as TableType } from "@/db/schema";
import { cn, formatTableName } from "@/lib/utils";
import { User2Icon } from "lucide-react";
import { Options } from "nuqs";
export default function Table({
  table,
  setSelectedTable,
  selectedTable,
  setTableName,
}: {
  table: TableType;
  setSelectedTable: React.Dispatch<React.SetStateAction<TableType | null>>;
  selectedTable: TableType | null;
  setTableName: (
    value: string | ((old: string | null) => string | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>;
}) {
  const tableName = formatTableName(table.name);
  const people = Array.from({ length: table.capacity });
  // unavailable means that the selected number of people is greater than what tha table can accomodate
  // color yellow
  const Isunavailable = table.status === "unavailable";
  // reserved will be the color red
  const isReserved = table.status === "reserved";
  // color white meaning it can be clicked
  const isAvailable = table.status === "available";
  // this will allow the unavaibale and reserved ones to not be clicked
  const isDisabled = isReserved || Isunavailable;

  return (
    <Button
      asChild
      variant="ghost"
      onClick={() => {
        if (!isAvailable) return;
        setSelectedTable((prev) => (prev === table ? null : table));
        setTableName((prev) => (prev === table.name ? null : table.name));
      }}
    >
      <Card
        aria-disabled={isDisabled}
        className={cn(
          `h-[7rem] w-[7rem] cursor-pointer text-black transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 md:h-[10rem] md:w-[10rem] lg:h-[14rem] lg:w-[14rem]`,
          isDisabled &&
            "cursor-not-allowed bg-red-500/30 opacity-50 hover:scale-100 hover:bg-red-500/30",
          // this means that the capaity is less than what is requestsed
          Isunavailable &&
            "cursor-not-allowed bg-yellow-500/30 opacity-50 hover:scale-100 hover:bg-yellow-500/30",
          selectedTable === table && isAvailable
            ? "scale-105 bg-green-500/30 hover:bg-green-500/50"
            : "scale-100 hover:scale-100 hover:bg-none",
        )}
      >
        <CardContent className="flex flex-col justify-between">
          <CardHeader className="py-4">
            <CardTitle className="text-center">{tableName}</CardTitle>
          </CardHeader>
          <div className="flex flex-wrap gap-1">
            {people.map((_, index) => (
              <User2Icon className="h-4 w-4" key={index} />
            ))}
          </div>
        </CardContent>
      </Card>
    </Button>
  );
}
