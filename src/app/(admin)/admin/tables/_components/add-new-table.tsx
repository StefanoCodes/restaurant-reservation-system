"use client";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addNewTableAction } from "../../_actions/actions";
import { useToast } from "@/hooks/use-toast";
import SubmitButton from "@/components/ui/submit-button";

export default function AddNewTable() {
	const [open, setOpen] = useState(false);
	const [errors, setErrors] = useState<
		{ name?: string[]; capacity?: string[] } | undefined
	>();
	const { toast } = useToast();
	const handleAddNewTable = async (formData: FormData) => {
		const addNewTableResponse = await addNewTableAction(formData);

		if (addNewTableResponse?.success) {
			setOpen(false);
			toast({
				title: addNewTableResponse.message,
				className: "bg-[#222] text-white",
			});
		} else {
			setErrors(addNewTableResponse?.error);
			toast({
				title: addNewTableResponse?.message,
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Add New Table</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] ">
				<DialogHeader>
					<DialogTitle>Add New Table</DialogTitle>
					<DialogDescription>
						Enter the details for the new table. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<form action={handleAddNewTable}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-left">
								Table Name
							</Label>
							<Input
								onFocus={() => {
									setErrors(undefined);
								}}
								id="name"
								name="tableName"
								className="col-span-3"
								placeholder="Enter the name of the table"
							/>
							<div className={"col-span-3"}>
								{errors?.name && <p className="text-red-500">{errors?.name}</p>}
							</div>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="capacity" className="text-left">
								Capacity
							</Label>
							<Input
								id="capacity"
								type="number"
								name="tableCapacity"
								className="col-span-3"
								placeholder="Enter the capacity of the table"
								onFocus={() => {
									setErrors(undefined);
								}}
							/>
							<div className="col-span-3">
								{errors?.capacity && (
									<p className="text-red-500">{errors?.capacity}</p>
								)}
							</div>
						</div>
					</div>
					<DialogFooter>
						<SubmitButton
							className="bg-green-500 hover:bg-green-700"
							variant={"default"}
						>
							Save
						</SubmitButton>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
