export type User = {
  name: string;
  id: string;
  role: "user" | "admin" | null;
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
