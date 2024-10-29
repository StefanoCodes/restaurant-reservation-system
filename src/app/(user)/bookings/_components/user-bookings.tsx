import BookingCard from "./booking-card";
import NoBookingsFound from "./no-bookings-found";
import { getBookingsForUser } from "@/lib/data/user";

export default async function UserBookings() {
	const bookings = await getBookingsForUser();
	const isBookingsEmpty = bookings.length === 0;
	if (isBookingsEmpty) return <NoBookingsFound />;
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{bookings.map(({ reservation, table, user }) => (
				<BookingCard
					key={reservation.id}
					reservation={{
						...reservation,
					}}
					table={table}
				/>
			))}
		</div>
	);
}
