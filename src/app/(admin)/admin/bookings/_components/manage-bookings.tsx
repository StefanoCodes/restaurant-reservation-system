import { getBookings } from "@/lib/data";
import AdminReservationCard from "./reservation-card";

export default async function ManageBookings() {
	const reservations = await getBookings();
	return (
		<>
			{reservations.map((reservation, idx) => (
				<AdminReservationCard
					key={idx}
					reservation={reservation.reservation}
					table={reservation.table}
					user={reservation.user}
				/>
			))}
		</>
	);
}
