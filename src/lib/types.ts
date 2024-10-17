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
		status: string;
		numberOfPeople: number;
		createdAt: Date;
		notes: string;
		reservationDate: Date | string;
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
