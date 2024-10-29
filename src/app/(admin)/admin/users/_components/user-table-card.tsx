import { User } from "@/lib/types";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDateToString } from "@/lib/utils";
export default function UserTableCard({
	user,
	className,
}: {
	user: User;
	className?: string;
}) {
	return (
		<TableRow className={className}>
			<TableCell className="font-medium">{user.name}</TableCell>
			<TableCell>{user.email}</TableCell>
			<TableCell>{user.phoneNumber}</TableCell>
			<TableCell>{formatDateToString(user.createdAt)}</TableCell>
			<TableCell className="text-right">{user.userId}</TableCell>
		</TableRow>
	);
}
