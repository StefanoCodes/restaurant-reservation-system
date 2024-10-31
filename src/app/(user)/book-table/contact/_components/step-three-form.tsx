"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/submit-button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
	defaultReservationData,
	useCreateReservationContext,
} from "@/contexts/createReservationContext";
import { useState } from "react";
import { User } from "@/lib/types";
import { stepThreeAction } from "../actions";
import { Textarea } from "@/components/ui/textarea";

type StepThreeFormDataErrors = {
	name: string;
	phone: string;
	email: string;
	specialRequests: string;
};

export default function StepThreeForm({ user }: { user: User }) {
	const [errors, setErrors] = useState<StepThreeFormDataErrors | undefined>(
		undefined
	);
	const router = useRouter();
	const { toast } = useToast();
	const { reservationData, updateReservationDetails } =
		useCreateReservationContext();

	const handleStepThree = async (formData: FormData) => {
		const formDataObject = {
			...reservationData,
			name: formData.get("name") as string,
			phone: formData.get("phone") as string,
			email: formData.get("email") as string,
			specialRequests: formData.get("specialRequests") as string,
			numberOfPeople: parseInt(reservationData.numberOfPeople),
		};
		try {
			const response = await stepThreeAction(formDataObject);
			if (!response.success) {
				setErrors(response.errors as StepThreeFormDataErrors);
				toast({
					title: "Error",
					description: response.message,
					variant: "destructive",
				});
				if (response.message === "Reservation already exists") {
					router.push("/book-table");
				}
				return;
			}
			// if the response is success we will show the success toast and redirect the user to the bookings page
			toast({
				title: "Success!",
				description: "Check your Email for confirmation",
			});
			updateReservationDetails(defaultReservationData);
			router.push("/bookings");
		} catch (error) {
			toast({
				title: "System Error",
				description: "Something went wrong. Please try again.",
				variant: "destructive",
			});
		}
	};

	return (
		<form
			action={handleStepThree}
			className="flex flex-col gap-4 mt-4 sm:px-4 md:px-13 max-w-2xl mx-auto"
		>
			<div className="flex flex-col gap-4">
				<Label>Name:</Label>
				<Input
					defaultValue={user.name}
					placeholder="Name"
					className="bg-white"
					name="name"
					required
					onFocus={() => setErrors(undefined)}
				/>
				{errors?.name && <p className="text-red-500">{errors.name}</p>}
			</div>

			<div className="flex flex-col gap-4">
				<Label>Phone:</Label>
				<Input
					defaultValue={user.phoneNumber}
					placeholder="Phone"
					className="bg-white"
					name="phone"
					required
					onFocus={() => setErrors(undefined)}
				/>
				{errors?.phone && <p className="text-red-500">{errors.phone}</p>}
			</div>

			<div className="flex flex-col gap-4">
				<Label>Email:</Label>
				<Input
					defaultValue={user.email}
					placeholder="Email"
					className="bg-white"
					name="email"
					required
					onFocus={() => setErrors(undefined)}
				/>
				{errors?.email && <p className="text-red-500">{errors.email}</p>}
			</div>
			<div className="flex flex-col gap-4">
				<Label>Special Request:</Label>
				<Textarea
					placeholder="Special Request"
					className="bg-white"
					name="specialRequests"
					onFocus={() => setErrors(undefined)}
				/>
				{errors?.specialRequests && (
					<p className="text-red-500">{errors.specialRequests}</p>
				)}
			</div>
			<div className="flex justify-end">
				<SubmitButton>Create Reservation</SubmitButton>
			</div>
		</form>
	);
}
