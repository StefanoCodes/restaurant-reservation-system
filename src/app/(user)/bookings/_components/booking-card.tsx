import { CalendarDays, Clock, Users, Utensils } from "lucide-react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReservationCardProps } from "@/lib/types";
import { cn, formatDateToString } from "@/lib/utils";
import NoBookingsFound from "./no-bookings-found";

export default function BookingCard({
	reservation,
	table,
	user,
}: ReservationCardProps) {
	if (!reservation && !table && !user) return <NoBookingsFound />;
	return (
		<Card className="w-full max-w-md mx-auto overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-lg">
			<CardHeader className="bg-primary text-primary-foreground">
				<CardTitle className="flex justify-between items-center">
					<span>{reservation.reservationName}'s Reservation</span>
					<Badge
						variant="secondary"
						className={cn(
							`text-white`,
							reservation.status === "pending"
								? "bg-yellow-500"
								: reservation.status === "confirmed"
								? "bg-green-500"
								: "bg-red-500"
						)}
					>
						{reservation.status}
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
					<span>{reservation.startTime || "N/A"}</span>
				</div>
				<div className="flex items-center space-x-2">
					<Utensils className="w-5 h-5 text-muted-foreground" />
					<span>
						{table.name} (Capacity: {table.capacity})
					</span>
				</div>
				<div className="flex items-center space-x-2">
					<Users className="w-5 h-5 text-muted-foreground" />
					<span>{reservation.numberOfPeople} people</span>
				</div>
			</CardContent>
			<CardFooter className="bg-secondary text-secondary-foreground p-4">
				<div className="w-full text-sm space-y-2">
					<div className="flex justify-between">
						<span className="font-semibold">Email:</span>
						<span>{reservation.reservationEmail}</span>
					</div>
					<div className="flex justify-between">
						<span className="font-semibold">Phone:</span>
						<span>{reservation.reservationPhone}</span>
					</div>
					{reservation?.notes && (
						<div className="mt-3 pt-3 border-t border-secondary-foreground/20">
							<span className="font-semibold block mb-1">Notes:</span>
							<p className="text-xs italic">{reservation.notes}</p>
						</div>
					)}
				</div>
			</CardFooter>
		</Card>
	);
}
