"use client";
import { Table as TableType, TableWithStatus } from "@/db/schema";
import Table from "./table";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { handleStepTwoAction } from "../action";
import { useRouter } from "next/navigation";
import { useCreateReservationContext } from "@/contexts/createReservationContext";
import { useFormStatus } from "react-dom";
import ButtonLoader from "@/app/button-loader";
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
			{pending && <ButtonLoader />}
		</Button>
	);
}
export default function DisplayTables({
	tables,
	userId,
}: {
	tables: TableType[];
	userId: string;
}) {
	const isAvailableTables = tables.length === 0;
	const [selectedTable, setSelectedTable] = useState<TableType | null>(null);
	const [error, setError] = useState<Record<string, string> | undefined>(
		undefined
	);
	const { updateReservationDetails } = useCreateReservationContext();
	const router = useRouter();

	const handleStepTwo = async () => {
		if (!selectedTable) throw new Error("No table selected");
		const response = await handleStepTwoAction(selectedTable, userId);
		if (!response.success) {
			setError(response?.error);

			return;
		} else {
			updateReservationDetails({
				tableName: selectedTable.name,
			});
			router.push("/book-table/contact");
		}
	};
	return (
		<form action={handleStepTwo}>
			<div className="flex flex-col gap-4 ">
				<div className="flex flex-wrap gap-4 max-w-5xl items-center justify-center">
					{isAvailableTables ? (
						<p>No tables available</p>
					) : (
						tables.map((table) => {
							return (
								<Table
									key={table.id}
									table={table}
									selectedTable={selectedTable}
									setSelectedTable={setSelectedTable}
								/>
							);
						})
					)}
					{error ? <p className="text-red-500">error</p> : null}
				</div>
				<div className="flex flex-col sm:flex-row justify-center gap-4">
					<Button asChild variant={"outline"}>
						<Link href={"/book-table"}>Back</Link>
					</Button>
					<SubmitTableButton selectedTable={selectedTable} />
				</div>
			</div>
		</form>
	);
}
