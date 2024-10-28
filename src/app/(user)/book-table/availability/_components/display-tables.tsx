"use client";
import { Table as TableType } from "@/db/schema";
import Table from "./table";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/ui/submit-button";
import { handleStepTwoAction } from "../action";
import { useRouter } from "next/navigation";
import { useCreateReservationContext } from "@/contexts/createReservationContext";
export default function DisplayTables({
	tables,
	userId,
}: {
	tables: TableType[];
	userId: string;
}) {
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
					{tables.map((table) => {
						return (
							<Table
								key={table.id}
								table={table}
								selectedTable={selectedTable}
								setSelectedTable={setSelectedTable}
							/>
						);
					})}
					{error ? <p className="text-red-500">error</p> : null}
				</div>
				<div className="flex flex-col md:flex-row justify-center gap-4">
					<Button asChild variant={"outline"}>
						<Link href={"/book-table"}>Back</Link>
					</Button>
					<SubmitButton disabled={!selectedTable}>
						{selectedTable ? "Submit" : "Select A Table"}
					</SubmitButton>
				</div>
			</div>
		</form>
	);
}
