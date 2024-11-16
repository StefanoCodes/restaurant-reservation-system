import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllAdmins } from "@/lib/data/admin";
import AdminTableCard from "./admin-table-card";

export default async function ManageAdmins() {
  const admins = await getAllAdmins();
  const isAdminsEmpty = admins.length === 0;
  // TODO CREATE NO USER FOUND COMPONENT
  if (isAdminsEmpty) return <div>No admins found</div>;
  return (
    <Table>
      <TableCaption>A list of your recent Customers</TableCaption>
      <TableHeader>
        <TableRow className="[&>th]:py-2">
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-right">User Id</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {admins.map((admin) => {
          return (
            <AdminTableCard
              key={admin.userId}
              admin={admin}
              className="hover:bg-gray-100"
            />
          );
        })}
      </TableBody>
    </Table>
  );
}
