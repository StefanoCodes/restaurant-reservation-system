"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table as TableType } from "@/db/schema";
import { cn, formatTableName } from "@/lib/utils";
import { User2Icon } from "lucide-react";
export default function Table({
	table,
	setSelectedTable,
	selectedTable,
}: {
	table: TableType;
	setSelectedTable: React.Dispatch<React.SetStateAction<TableType | null>>;
	selectedTable: TableType | null;
}) {
	const tableName = formatTableName(table.name);
	const people = Array.from({ length: table.capacity });
	const isDisabled = table.status === "unavailable";

	return (
		<Button
			asChild
			aria-disabled={isDisabled}
			disabled={isDisabled}
			variant="ghost"
			onClick={() => {
				if (!isDisabled)
					setSelectedTable((prev) => (prev === table ? null : table));
			}}
		>
			<Card
				aria-disabled={isDisabled}
				className={cn(
					`w-[7rem] h-[7rem] md:w-[10rem] text-black md:h-[10rem] lg:w-[14rem] lg:h-[14rem] cursor-pointer hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`,
					isDisabled &&
						"bg-red-500/30 opacity-50 hover:scale-100 cursor-not-allowed hover:bg-red-500/30",
					selectedTable === table
						? table.status === "available" &&
								"scale-105 bg-green-500/30 hover:bg-green-500/50"
						: "scale-100 hover:scale-100 hover:bg-none"
				)}
			>
				<CardContent className="flex flex-col justify-between">
					<CardHeader className="py-4">
						<CardTitle className="text-center">{tableName}</CardTitle>
					</CardHeader>
					<div className="flex flex-wrap gap-1">
						{people.map((_, index) => (
							<User2Icon className="w-4 h-4" key={index} />
						))}
					</div>
				</CardContent>
			</Card>
		</Button>
	);
}
