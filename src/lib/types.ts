export type User = {
  name: string;
  id: string;
  email: string;
  phoneNumber: string;
  userId: string;
  createdAt: Date;
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
    numberOfPeople: number;
    createdAt: Date | null;
    notes: string | null;
    reservationDate: Date | string;
    reservationName: string;
    reservationPhone: string;
    reservationEmail: string;
    reservationStatus: "pending" | "confirmed" | "cancelled";
  };
  table: {
    name: string;
    capacity: number;
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
export type BusinessHour = {
  id: string;
  weekDay: string;
  openTime: number;
  closeTime: number;
  closed: boolean;
};
export type MarketingTemplate = {
  id: string;
  name: TemplateNames;
  updatedAt: Date;
};

export type AdminType = User & {
  id: string;
  role: "admin";
  createdAt: Date;
  memberId: string;
};
export type TemplateNames = "TemplateOne" | "TemplateTwo" | "TemplateThree";
