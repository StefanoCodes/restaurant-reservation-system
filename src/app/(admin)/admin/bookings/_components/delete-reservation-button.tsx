import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { formatDateToString } from "@/lib/utils";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import SubmitButton from "@/components/ui/submit-button";
import { ReservationCardProps } from "@/lib/types";
type DeleteReservationButtonProps = {
	reservation: ReservationCardProps["reservation"];
	isDialogOpen: boolean;
	setIsDialogOpen: (open: boolean) => void;
	handleDeleteReservation: (reservationId: string) => Promise<void>;
};
export default function DeleteReservationButton({
	reservation,
	isDialogOpen,
	setIsDialogOpen,
	handleDeleteReservation,
}: DeleteReservationButtonProps) {
	return (
		<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<AlertDialogTrigger asChild>
				<Button
					variant="destructive"
					className="w-full flex items-center justify-center"
				>
					<span>Delete Reservation</span>
					<Trash2 className="w-4 h-4" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete the
						reservation for {reservation.reservationName} on{" "}
						{formatDateToString(reservation.createdAt)}.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<form
						className=" px-0 py-0"
						action={handleDeleteReservation.bind(null, reservation.id)}
					>
						<SubmitButton>Delete</SubmitButton>
					</form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
