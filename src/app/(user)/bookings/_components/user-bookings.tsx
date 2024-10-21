import { getBookingsForUser } from "@/lib/data";
import BookingCard from "./booking-card";
import NoBookingsFound from "./no-bookings-found";
export default async function UserBookings({ userId }: { userId: string }) {
	const bookings = await getBookingsForUser(userId).catch((error) => {
		console.error("Error fetching bookings:", error);
		return [];
	});
	return bookings.length === 0 ? (
		<NoBookingsFound />
	) : (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{bookings.map(({ reservation, table, user }) => (
				<BookingCard
					key={reservation.id}
					reservation={{
						...reservation,
					}}
					table={table}
					user={user}
				/>
			))}
		</div>
	);
}
