"use client";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
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
import { changeTableStatusAction } from "../../_actions/actions";
import { useToast } from "@/hooks/use-toast";

export default function ChangeTableStatus({ tableId,status }: { tableId: string,status:string }) {
	const [isOpen, setIsOpen] = useState(false);
	const { toast } = useToast();

	const handleChangeTableStatus = async () => {
		const response = await changeTableStatusAction(tableId, status);
		if (response?.success) {
			toast({
				title: "Table status changed successfully",
				description: response.message,
			});
			setIsOpen(false);
		} else {
			toast({
				title: "Failed to change table status",
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
					<RefreshCcw className="h-4 w-4 cursor-pointer" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] ">
				<DialogHeader>
					<DialogTitle>Change Table Status</DialogTitle>
					<DialogDescription>
						Are you sure you want to change this table status?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant={"outline"} onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<form action={handleChangeTableStatus}>
						<SubmitButton
							className="bg-yellow-500 hover:bg-yellow-700"
							variant={"default"}
						>
							Change
						</SubmitButton>
					</form>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
