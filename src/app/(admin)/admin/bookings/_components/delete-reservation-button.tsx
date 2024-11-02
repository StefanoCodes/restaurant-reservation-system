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
          className="flex w-full items-center justify-center"
        >
          <span>Delete Reservation</span>
          <Trash2 className="h-4 w-4" />
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
        <AlertDialogFooter className="flex w-full flex-row items-center justify-center gap-4 sm:justify-end">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={handleDeleteReservation.bind(null, reservation.id)}>
            <SubmitButton>Delete</SubmitButton>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
