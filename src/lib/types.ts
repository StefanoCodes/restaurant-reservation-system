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
};
