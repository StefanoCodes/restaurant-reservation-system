import { Switch } from "@/components/ui/switch";
import { TableData } from "@/db/schema";
import { CircleIcon, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function ChangeTableStatus({ table }: { table: TableData }) {
	return (
        <Button
        variant={"ghost"}
        className=" hover:scale-110 transition-all duration-300 p-1 hover:bg-transparent"
    >
			<RefreshCcw className="h-4 w-4 cursor-pointer" />
		</Button>
	);
}
