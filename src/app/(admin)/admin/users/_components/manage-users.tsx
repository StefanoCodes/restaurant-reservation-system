import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getAllUsers } from "@/lib/data/admin";
import UserTableCard from "./user-table-card";
import { User } from "@/lib/types";

export default async function ManageUsers() {
	const users = await getAllUsers();
	const isUsersEmpty = users.length === 0;
	// TODO CREATE NO USER FOUND COMPONENT
	if (isUsersEmpty) return <div>No users found</div>;
	return (
		<Table>
			<TableCaption>A list of your recent Customers</TableCaption>
			<TableHeader>
				<TableRow className="[&>th]:py-2">
					<TableHead className="w-[100px]">Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Phone</TableHead>
					<TableHead className="text-right">User Id</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.map((user: User) => {
					return (
						<UserTableCard
							key={user.userId}
							user={user}
							className="[&>td]:py-4"
						/>
					);
				})}
			</TableBody>
		</Table>
	);
}
