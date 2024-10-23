"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import SubmitButton from "@/components/ui/submit-button";
import { useState } from "react";
import { deleteTable } from "../../_actions/actions";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

export default function DeleteTableButton({ tableId }: { tableId: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const { toast } = useToast();

	const handleDeleteTable = async () => {
		const response = await deleteTable(tableId);
		if (response?.success) {
			toast({
				title: "Table deleted successfully",
				description: response.message,
			});
			setIsOpen(false);
		} else {
			toast({
				title: "Failed to delete table",
				description: response?.message,
			});
		}
	};
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					variant={"ghost"}
					className=" hover:scale-110 transition-all duration-300 p-1 hover:bg-transparent"
				>
					<Trash2 className="h-4 w-4 cursor-pointer" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] ">
				<DialogHeader>
					<DialogTitle>Delete Table</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this table?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant={"outline"} onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<form action={handleDeleteTable}>
						<SubmitButton
							className="bg-red-500 hover:bg-red-700"
							variant={"default"}
							pendingText="Deleting..."
						>
							Delete
						</SubmitButton>
					</form>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
