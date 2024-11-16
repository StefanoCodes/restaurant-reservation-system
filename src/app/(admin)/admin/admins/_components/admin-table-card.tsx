import { User } from "@/db/schema";
import { TableRow, TableCell } from "@/components/ui/table";
import { formatDateToString } from "@/lib/utils";

export default function AdminTableCard({
  admin,
  className,
}: {
  admin: User;
  className: string;
}) {
  return (
    <TableRow className={className}>
      <TableCell className="font-medium">{admin.name}</TableCell>
      <TableCell>{admin.email}</TableCell>
      <TableCell>{admin.phoneNumber}</TableCell>
      <TableCell>{formatDateToString(admin.createdAt)}</TableCell>
      <TableCell className="text-right">{admin.userId}</TableCell>
    </TableRow>
  );
}
