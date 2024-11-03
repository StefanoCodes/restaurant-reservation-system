"use client";
import { ReservationCardProps } from "@/lib/types";
import { CalendarDays, Clock, Users, Utensils, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatDateToString } from "@/lib/utils";
import {
  approveUserReservationAction,
  deleteUserReservationAction,
} from "../../_actions/actions";

import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import DeleteReservationButton from "./delete-reservation-button";
import ApproveReservationButton from "./approve-reservation-button";
import { ToastAction } from "@/components/ui/toast";

export default function AdminReservationCard({
  reservation,
  table,
}: ReservationCardProps) {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteReservation = async (reservationId: string) => {
    const { success, message } =
      await deleteUserReservationAction(reservationId);
    if (success) {
      setIsDialogOpen(false);
      toast({
        title: message,
      });
    } else {
      toast({
        title: message,
      });
    }
  };

  const handleApproveReservation = async (
    reservationStatus: string,
    reservationId: string,
  ) => {
    const { success, message } =
      await approveUserReservationAction(reservationId);

    if (!success) {
      toast({
        title: message,
        action: (
          <ToastAction
            onClick={handleApproveReservation.bind(
              null,
              reservationStatus,
              reservationId,
            )}
            altText="Try Again"
          >
            Try Again
          </ToastAction>
        ),
      });
    } else {
      toast({
        title: message,
      });
    }
  };

  return (
    <Card className="mx-auto flex w-full max-w-md flex-col justify-between overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-lg">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="flex items-center justify-between">
          <span>{reservation.reservationName}'s Reservation</span>
          <Badge
            variant="secondary"
            className={cn(
              `text-white`,
              reservation.reservationStatus === "pending"
                ? "bg-yellow-500"
                : reservation.reservationStatus === "confirmed"
                  ? "bg-green-500"
                  : "bg-red-500",
            )}
          >
            {reservation.reservationStatus}
          </Badge>
        </CardTitle>
      </CardHeader>
      <div className="flex flex-col">
        <CardContent className="mt-4 space-y-4">
          <div className="flex items-center space-x-2">
            <CalendarDays className="h-5 w-5 text-muted-foreground" />
            <span>{formatDateToString(reservation.createdAt)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span>
              {reservation.startTime} - {reservation.endTime}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Utensils className="h-5 w-5 text-muted-foreground" />
            <span>
              {reservation.reservationName} (Capacity: {table.capacity})
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span>{reservation.numberOfPeople} people</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-4 bg-secondary p-4 text-secondary-foreground">
          <div className="w-full space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-semibold">Email:</span>
              <span>{reservation.reservationEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Phone:</span>
              <span>{reservation.reservationPhone}</span>
            </div>
            <div className="mt-3 border-t border-secondary-foreground/20 pt-3">
              <span className="mb-1 block font-semibold">Notes:</span>
              {reservation.notes && (
                <p className="text-xs italic">{reservation.notes}</p>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <DeleteReservationButton
              reservation={reservation}
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
              handleDeleteReservation={handleDeleteReservation}
            />
            <form
              action={handleApproveReservation.bind(
                null,
                reservation.reservationStatus,
                reservation.id,
              )}
            >
              <ApproveReservationButton
                reservationStatus={reservation.reservationStatus}
              />
            </form>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
