import { DialogTitle } from "@/components/ui/dialog";
import AddNewAdminDialog from "./add-new-admin-dialog";

export default function AddNewAdmin() {
  return (
    <div className="flex flex-row items-center justify-between">
      <h2 className="text-2xl font-bold">Manage Admins</h2>
      <AddNewAdminDialog />
    </div>
  );
}
