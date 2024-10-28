export type User = {
	name: string;
	id: string;
	email: string;
	phoneNumber: string;
	userId: string;
};
export type UserReservationDetails = {
	name: string;
	email: string;
	phoneNumber: string;
	userId: string;
};

export type ReservationDetails = {
	reservationDate: string;
	time: string;
	tableId: string;
	userId: string;
};
export type ReservationCardProps = {
	reservation: {
		id: string;
		startTime: string;
		endTime: string;
		status: "pending" | "confirmed" | "cancelled" | null;
		numberOfPeople: number;
		createdAt: Date | null;
		notes: string | null;
		reservationDate: Date | string;
		reservationName: string;
		reservationPhone: string;
		reservationEmail: string;
	};
	table: {
		name: string;
		capacity: number;
	};
	user: {
		name: string;
		email: string;
		phoneNumber: string;
	};
};

export type FormErrors = {
	name?: string;
	email?: string;
	phoneNumber?: string;
	reservationDate?: string;
	time?: string;
	numberOfPeople?: string;
	specialRequests?: string;
	// in future we add other possible errors we could get back from the server
};

export type RoutesLink = {
	name: string;
	path: string;
	icon: React.ElementType;
};

export type StepOneFormDataErrors = {
	date?: string;
	time?: string;
	numberOfPeople?: string;
};
