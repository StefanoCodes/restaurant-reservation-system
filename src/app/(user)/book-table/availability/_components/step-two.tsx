'use client';
import { Table } from "@/db/schema";
import { useEffect, useState } from "react";

export default function StepTwo({ userId }: { userId: string }) {
	const [availableTables, setAvailableTables] = useState<Table[]>([]);
	useEffect(() => {
		async () => {
			// we want to run a function to get the tables that are available based on the date and time selected in the first step
			// we will use the date and time to query the database and get the tables that are available
			// we will then store the tables that are available in the local state here and display them to the user
		};
	}, []);
	return <div>Select A Table</div>;
}
