import AdminReservationCard from "./reservation-card";
import { getAllBookings } from "@/lib/data/admin";

export default async function ManageBookings() {
	const reservations = await getAllBookings();
	const isBookingsEmpty = reservations.length === 0;
	// TODO: add no bookings found component
	if (isBookingsEmpty) return <div>No bookings found</div>;
	return (
		<>
			{reservations.map((reservation, idx) => (
				<AdminReservationCard
					key={idx}
					reservation={reservation.reservation}
					table={reservation.table}
				/>
			))}
		</>
	);
}
