import { User } from "@/lib/types";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
export default function UserTableCard({ user, className }: { user: User, className?: string }) {
	return (
		<TableRow className={className}>
			<TableCell className="font-medium">{user.name}</TableCell>
			<TableCell>{user.email}</TableCell>
			<TableCell>{user.phoneNumber}</TableCell>
			<TableCell className="text-right">{user.userId}</TableCell>
		</TableRow>
	);
}
