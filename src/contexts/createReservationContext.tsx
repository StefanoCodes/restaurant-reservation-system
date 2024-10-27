"use client";
import { newReservationInitialValuesType } from "@/validations";
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

const defaultReservationData: newReservationInitialValuesType = {
	date: "",
	time: "",
	numberOfPeople: "",
	name: "",
	email: "",
	phone: "",
};

type CreateReservationContextType = {
	reservationData: newReservationInitialValuesType;
	updateReservationDetails: (
		reservationDetails: Partial<newReservationInitialValuesType>
	) => void;
};

export const CreateReservationContext =
	createContext<CreateReservationContextType | null>(null);

export const CreateReservationContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [reservationData, setReservationData] =
		useState<newReservationInitialValuesType>(defaultReservationData);

	const updateReservationDetails = useCallback(
		(reservationDetails: Partial<newReservationInitialValuesType>) => {
			setReservationData((prev) => ({ ...prev, ...reservationDetails }));
		},
		[]
	);

	const contextValue = useMemo(
		() => ({
			reservationData,
			updateReservationDetails,
		}),
		[reservationData, updateReservationDetails]
	);

	return (
		<CreateReservationContext.Provider value={contextValue}>
			{children}
		</CreateReservationContext.Provider>
	);
};

export function useCreateReservationContext() {
	const context = useContext(CreateReservationContext);
	if (context === null) {
		throw new Error(
			"useCreateReservationContext must be used within a CreateReservationContextProvider"
		);
	}
	return context;
}
