import { CreateReservationContextProvider } from "@/contexts/createReservationContext";

export default function BookTableLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<CreateReservationContextProvider>
			<div className="max-w-7xl mx-auto p-4 pt-8 sm:pt-12 flex flex-col">
				{children}
			</div>
		</CreateReservationContextProvider>
	);
}
