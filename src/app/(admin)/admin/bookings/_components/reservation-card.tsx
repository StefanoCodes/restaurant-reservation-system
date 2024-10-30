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
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn, formatDateToString } from "@/lib/utils";
import { deleteUserReservationAction } from "../../_actions/actions";

import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import SubmitButton from "@/components/ui/submit-button";

export default function AdminReservationCard({
	reservation,
	table,
}: ReservationCardProps) {
	const { toast } = useToast();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleDeleteReservation = async (reservationId: string) => {
		const reservationDeletedResponse = await deleteUserReservationAction(
			reservationId
		);
		if (reservationDeletedResponse?.success) {
			setIsDialogOpen(false);
			toast({
				title: "Reservation deleted successfully",
				description: reservationDeletedResponse.message,
			});
		} else {
			toast({
				title: "Failed to delete reservation",
				description: reservationDeletedResponse?.message,
			});
		}
	};
	return (
		<Card className="w-full max-w-md mx-auto overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-lg">
			<CardHeader className="bg-primary text-primary-foreground">
				<CardTitle className="flex justify-between items-center">
					<span>{reservation.reservationName}'s Reservation</span>
					<Badge
						variant="secondary"
						className={cn(
							`text-white`,
							reservation.reservationStatus === "pending"
								? "bg-yellow-500"
								: reservation.reservationStatus === "confirmed"
								? "bg-green-500"
								: "bg-red-500"
						)}
					>
						{reservation.reservationStatus}
					</Badge>
				</CardTitle>
			</CardHeader>

			<CardContent className="mt-4 space-y-4">
				<div className="flex items-center space-x-2">
					<CalendarDays className="w-5 h-5 text-muted-foreground" />
					<span>{formatDateToString(reservation.createdAt)}</span>
				</div>
				<div className="flex items-center space-x-2">
					<Clock className="w-5 h-5 text-muted-foreground" />
					<span>
						{reservation.startTime} - {reservation.endTime}
					</span>
				</div>
				<div className="flex items-center space-x-2">
					<Utensils className="w-5 h-5 text-muted-foreground" />
					<span>
						{reservation.reservationName} (Capacity: {table.capacity})
					</span>
				</div>
				<div className="flex items-center space-x-2">
					<Users className="w-5 h-5 text-muted-foreground" />
					<span>{reservation.numberOfPeople} people</span>
				</div>
			</CardContent>
			<CardFooter className="bg-secondary text-secondary-foreground p-4 flex flex-col items-start space-y-4">
				<div className="w-full text-sm space-y-2">
					<div className="flex justify-between">
						<span className="font-semibold">Email:</span>
						<span>{reservation.reservationEmail}</span>
					</div>
					<div className="flex justify-between">
						<span className="font-semibold">Phone:</span>
						<span>{reservation.reservationPhone}</span>
					</div>
					{reservation.notes && (
						<div className="mt-3 pt-3 border-t border-secondary-foreground/20">
							<span className="font-semibold block mb-1">Notes:</span>
							<p className="text-xs italic">{reservation.notes}</p>
						</div>
					)}
				</div>
				<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<AlertDialogTrigger asChild>
						<Button variant="destructive" className="w-full">
							<Trash2 className="w-4 h-4 mr-2" />
							Delete Reservation
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
			</CardFooter>
		</Card>
	);
}
