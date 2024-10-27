// "use client";
// import { useState, useEffect } from "react";
// import DisplayTables from "./display-tables";
import { useCreateReservationContext } from "@/contexts/createReservationContext";
import { Table } from "@/db/schema";
import { getTables } from "@/lib/data";
import { findAvailableTablesSchema } from "@/validations";
import { redirect } from "next/navigation";
import DisplayTables from "./display-tables";
export default async function StepTwo({ userId }: { userId: string }) {
	const tables = await getTables();
	// const { reservationData } = useCreateReservationContext();
	// const [tables, setTables] = useState<Table[]>([]);
	// const getAvailableTables = async (
	// 	date: string,
	// 	numberOfPeople: number,
	// 	time: string
	// ) => {
	// 	const data = { date, numberOfPeople, time };
	// 	const parsedData = findAvailableTablesSchema.safeParse(data);
	// 	if (!parsedData.success) {
	// 		console.error("Invalid data", parsedData.error);
	// 		redirect("/book-table");
	// 	}
	// 	console.log(data);
	// 	// if its sucessful we will use it to go through all the current reservations in the system and ensure we are taking into condiseration thebooking duration to only display the tables available at the time selected
	// };
	// const getTables = async () => {
	// 	await getAvailableTables(
	// 		reservationData.date,
	// 		parseInt(reservationData.numberOfPeople),
	// 		reservationData.time
	// 	);
	// };
	// useEffect(() => {
	// 	getTables();
	// }, []);

	return (
		<div className="flex flex-col justify-center gap-5">
			<h1 className="text-2xl font-bold text-center md:text-left">
				Select A Table
			</h1>
			<DisplayTables tables={tables} userId={userId} />
		</div>
	);
}
