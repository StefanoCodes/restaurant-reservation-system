import Link from "next/link";

export default function NoBookingsFound() {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-semibold">No bookings found</h2>
        <Link
          href="/book-table"
          className="bg-orange-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-orange-600 transition-colors"
        >
          Book a table
        </Link>
      </div>
    );
  }