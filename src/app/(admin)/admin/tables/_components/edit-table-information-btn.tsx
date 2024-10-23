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
import { editTableDataAction } from "../../_actions/actions";
import { useToast } from "@/hooks/use-toast";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { TableData } from "@/db/schema";
export default function EditTableButton({ table }: { table: TableData }) {
	const [isOpen, setIsOpen] = useState(false);
	const [errors, setErrors] = useState<{ name: string; capacity: string }>({
		name: "",
		capacity: "",
	});
	const { toast } = useToast();
	const handleEditTableData = async (formData: FormData) => {
		const response = await editTableDataAction(formData, table.id);
		if (response?.success) {
			toast({
				title: "Table Data Has Been Updated Successfully",
				description: response?.message,
			});
			setIsOpen(false);
		} else {
			if (response?.error) {
				setErrors({
					name: response.error.name,
					capacity: response.error.capacity,
				});
			}
			toast({
				title: "Failed to Update Table Data",
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
					<Pencil2Icon />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] ">
				<DialogHeader>
					<DialogTitle>Edit Table</DialogTitle>
					<DialogDescription>Edit Table Information</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<form
						className="flex flex-col gap-4 w-full"
						action={handleEditTableData}
					>
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<Input
									type="text"
									placeholder="Table Name"
									defaultValue={table.name}
									name="tableName"
									required
									onFocus={() => setErrors({ ...errors, name: "" })}
								/>
								{errors?.name && <p className="text-red-500">{errors?.name}</p>}
							</div>
							<div className="flex flex-col gap-2">
								<Input
									type="number"
									required
									placeholder="Table Capacity"
									defaultValue={table.capacity}
									name="tableCapacity"
									onFocus={() => setErrors({ ...errors, capacity: "" })}
								/>
								{errors?.capacity && (
									<p className="text-red-500">{errors?.capacity}</p>
								)}
							</div>
						</div>
						<div className="flex items-center justify-end gap-2">
							<Button variant={"outline"} onClick={() => setIsOpen(false)}>
								Cancel
							</Button>
							<SubmitButton
								className="bg-green-500 hover:bg-green-700"
								variant={"default"}
								pendingText="Editing..."
							>
								Save
							</SubmitButton>
						</div>
					</form>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
