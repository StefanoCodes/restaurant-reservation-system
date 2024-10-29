import "server-only";
import { Table } from "@/db/schema";
import { tablesTable } from "@/db/schema";
import { db } from "@/db/db";

export const getAllTables = async (): Promise<Table[]> => {
	try {
		const tables = await db.select().from(tablesTable);
		return tables;
	} catch (error) {
		console.error(error);
		return [];
	}
};
