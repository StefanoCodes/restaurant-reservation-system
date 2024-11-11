"use client";
import { Table as TableType, TableWithStatus } from "@/db/schema";
import Table from "./table";
import { useActionState, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { handleStepTwoAction } from "../action";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import ButtonLoader from "@/components/button-loader";
import { useQueryState } from "nuqs";
import { useToast } from "@/hooks/use-toast";
import ButtonPendingLoader from "@/components/button-pending-loader";
function SubmitTableButton({
  selectedTable,
}: {
  selectedTable: TableType | null;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full sm:w-[7.5rem]"
      disabled={!selectedTable || pending}
    >
      {!selectedTable && "Select A Table"}
      {selectedTable && !pending && "Submit"}
      {pending && <ButtonPendingLoader />}
    </Button>
  );
}
export default function DisplayTables({
  tables,
  date,
  time,
  numberOfPeople,
}: {
  tables: TableType[];
  date: string;
  time: string;
  numberOfPeople: string;
}) {
  const [selectedTable, setSelectedTable] = useState<TableType | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const [tableName, setTableName] = useQueryState("table");
  const handleStepTwo = async () => {
    try {
      if (!selectedTable) {
        return toast({
          title: "Reservation Data Is Incorrect",
          variant: "destructive",
        });
      }
      const response = await handleStepTwoAction(selectedTable);
      if (!response.success)
        return toast({
          title: "Something Went Wrong",
        });
      // if all goes good we can redirect the user to the second step
      toast({
        title: response.message,
      });
      router.push(
        `/book-table/contact?date=${date}&time=${time}&numberOfPeople=${numberOfPeople}&table=${tableName}`,
      );
    } catch (error) {
      console.error(error);
    }
  };
  const AnyAvailableTables = tables.length === 0;

  return (
    <form action={handleStepTwo}>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-wrap items-center justify-center gap-4">
          {AnyAvailableTables ? (
            <p>No tables available</p>
          ) : (
            tables.map((table) => {
              return (
                <Table
                  key={table.id}
                  table={table}
                  selectedTable={selectedTable}
                  setSelectedTable={setSelectedTable}
                  setTableName={setTableName}
                />
              );
            })
          )}
        </div>
        <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
          <Button asChild variant={"outline"}>
            <Link
              href={`/book-table?date=${date}&time=${time}&numberOfPeople=${numberOfPeople}`}
            >
              Back
            </Link>
          </Button>
          <SubmitTableButton selectedTable={selectedTable} />
        </div>
      </div>
    </form>
  );
}
