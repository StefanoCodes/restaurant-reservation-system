"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { OPEN_HOURS, CLOSE_HOURS } from "@/utils/constants";
import {
	calculateTimeSlots,
	cn,
	formatDateForReservation,
	formatDateToString,
} from "@/lib/utils";
import { FormErrors, UserReservationDetails } from "@/lib/types";
import TablesContainer from "./tables-container";
import { Table, User } from "@/db/schema";
import { useEffect, useState } from "react";
import { PopoverTrigger } from "@/components/ui/popover";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { createReservation } from "@/actions/actions";
import { useToast } from "@/hooks/use-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { sendEmailPendingConfirmation } from "@/actions/email";
import { useFormStatus } from "react-dom";
import ButtonPendingLoader from "@/app/button-pending-loader";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function SubmitFormButton({ selectedTable }: { selectedTable: Table | null }) {
	const { pending } = useFormStatus();
	return (
		<Button
			className={cn(
				"mt-4 w-full",
				pending && "opacity-75 cursor-not-allowed",
				!selectedTable && "cursor-not-allowed"
			)}
			type="submit"
			disabled={!selectedTable || pending}
		>
			{pending ? <ButtonPendingLoader /> : "Book Table"}
		</Button>
	);
}
export default function BookingForm({
	user,
	tables,
	searchParams,
}: {
	user: UserReservationDetails;
	tables: Table[];
	searchParams?: { date: string; time: string };
}) {
	// useEffect(() => {
	//   async function checkAvailability() {
	//     if (searchParams?.date && searchParams?.time) {
	//       const userHasOverlap = await checkUserOverlap(user.userId, searchParams.date, searchParams.time);
	//       const availableTables = await checkTableAvailability(tables, searchParams.date, searchParams.time);

	//       setIsAvailable(!userHasOverlap && availableTables.length > 0);
	//       setAvailableTables(availableTables);

	//       if (userHasOverlap) {
	//         toast({
	//           title: "Booking Conflict",
	//           description: "You already have a reservation at this time.",
	//           variant: "destructive",
	//         });
	//       } else if (availableTables.length === 0) {
	//         toast({
	//           title: "No Tables Available",
	//           description: "All tables are booked for this time slot.",
	//           variant: "destructive",
	//         });
	//       }
	//     }
	//   }

	//   checkAvailability();
	// }, [searchParams, user.userId, tables]);
	// States
	const timeSlots = calculateTimeSlots(OPEN_HOURS, CLOSE_HOURS);
	const [selectedTable, setSelectedTable] = useState<Table | null>(null);
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [time, setTime] = useState<string | undefined>(undefined);
	const [errors, setErrors] = useState<FormErrors | null>(null);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [prevSelectedTable, setPrevSelectedTable] = useState<Table | null>(
		null
	);
	const { toast } = useToast();
	const searchParamsData = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	// useEffect(() => {
	// 	// Only reset if a table is deselected or a different table is selected
	// 	if (
	// 		!selectedTable ||
	// 		(prevSelectedTable && prevSelectedTable.id !== selectedTable.id)
	// 	) {
	// 		setErrors(null);
	// 		setDate(undefined);
	// 		setTime(undefined);

	// 		// Use a timeout to ensure this runs after the current render cycle
	// 		setTimeout(() => {
	// 			// handleSearch("", "");
	// 		}, 0);
	// 	}

	// 	// Update the previous selected table reference
	// 	setPrevSelectedTable(selectedTable);
	// }, [selectedTable]);
	// handle the search params
	// const handleSearch = (date: string, time: string) => {
	// 	const params = new URLSearchParams(searchParamsData);

	// 	if (date) {
	// 		params.set("date", date);
	// 	} else {
	// 		params.delete("date");
	// 	}

	// 	if (time) {
	// 		params.set("time", time);
	// 	} else {
	// 		params.delete("time");
	// 	}

	// 	router.replace(`${pathname}?${params.toString()}`);
	// 	console.log(params);
	// };

	// handle the reservation action
	const handleReservationAction = async (formData: FormData) => {
		const response = await createReservation(formData, {
			reservationDate: formatDateForReservation(date as Date),
			time: time as string,
			tableId: selectedTable?.id as string,
			userId: user.userId as string,
		});

		if (response.success) {
			router.push("/bookings");
			toast({
				title: "Reservation created successfully",
				description:
					"Your reservation has been created successfully check your email",
				duration: 5000,
			});
		} else {
			if (response.error) {
				console.log(response.error);
				setErrors(response.error);
				toast({
					title: "Error",
					description: "Data inserted is not valid",
					variant: "destructive",
				});
			} else if (response.emailError) {
				toast({
					title: "Error",
					description: response.emailError,
					variant: "destructive",
				});
			} else {
				toast({
					title: "Error",
					description: "Something went wrong",
					variant: "destructive",
				});
			}
		}
	};
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-xl font-semibold text-center md:text-left">
				Table Selected: {selectedTable?.name}
			</h1>
			<div className="flex flex-col md:flex-row gap-5 px-4 md:px-0 text-left">
				{/* TABLES CONTAINER */}
				<div className="flex-1">
					<TablesContainer
						tables={tables}
						onTableClick={setSelectedTable}
						selectedTable={selectedTable as Table | null}
					/>
				</div>
				{/* FORM */}
				<div className="flex-[0.5]">
					<div
						className={cn(
							`text-center text-sm md:text-base text-gray-500 transition-all duration-300 opacity-0 invisible`,
							!selectedTable && "opacity-100 visible"
						)}
					>
						Please select a table
					</div>
					<form
						action={handleReservationAction}
						className={cn(
							"flex flex-col gap-4 opacity-0 invisible transition-all duration-300 self-end",
							selectedTable && "opacity-100 visible"
						)}
					>
						{/* NAME */}
						<div className="flex flex-col gap-2">
							<Label>Name</Label>
							<Input
								type="text"
								name="name"
								defaultValue={user.name}
								className="bg-white"
								onFocus={() => setErrors(null)}
								required
							/>
							{errors?.name && <p className="text-red-500">{errors.name}</p>}
						</div>
						{/* EMAIL */}
						<div className="flex flex-col gap-2">
							<Label>Email</Label>
							<Input
								type="email"
								name="email"
								defaultValue={user.email}
								className="bg-white"
								required
								onFocus={() => setErrors(null)}
							/>
							{errors?.email && <p className="text-red-500">{errors.email}</p>}
						</div>
						{/* PHONE */}
						<div className="flex flex-col gap-2 ">
							<Label>Phone</Label>
							<Input
								type="text"
								name="phoneNumber"
								defaultValue={user.phoneNumber}
								className="bg-white"
								required
								onFocus={() => setErrors(null)}
							/>
							{errors?.phoneNumber && (
								<p className="text-red-500">{errors.phoneNumber}</p>
							)}
						</div>
						{/* Calendar */}

						<div className="flex flex-col gap-2">
							<Label>Date</Label>

							<Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										className={cn(
											"w-full justify-start text-left font-normal bg-white",
											!date && "text-muted-foreground"
										)}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{date ? formatDateToString(date) : <span>Pick a date</span>}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										value={date}
										minDate={new Date()}
										maxDate={
											new Date(
												new Date().setFullYear(new Date().getFullYear() + 1)
											)
										}
										className="bg-white"
										onClickDay={(dateValue) => {
											setDate(dateValue);
											setIsCalendarOpen(false);
										}}
									/>
								</PopoverContent>
							</Popover>
							{errors?.reservationDate && (
								<p className="text-red-500">{errors.reservationDate}</p>
							)}
						</div>
						{/* TIME */}
						<div className="flex flex-col gap-2">
							<Label htmlFor="time">Time</Label>
							<Select
								value={time}
								onValueChange={(timeValue) => {
									setTime(timeValue);
									// handleSearch(date ? formatDateToString(date) : "", timeValue);
								}}
								required
							>
								<SelectTrigger className="bg-white" id="time" name="time">
									<SelectValue placeholder="Select a time">
										{time ? time : "Select a time"}
									</SelectValue>
								</SelectTrigger>
								<SelectContent>
									{timeSlots.map((slot) => (
										<SelectItem key={slot} value={slot}>
											{slot}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors?.time && <p className="text-red-500">{errors.time}</p>}
						</div>
						{/* NUMBER OF PEOPLE */}
						<div className="flex flex-col gap-2">
							<Label>Number of People</Label>
							<Input
								placeholder="Number of people"
								type="number"
								className="bg-white"
								name="numberOfPeople"
								required
								onFocus={() => setErrors(null)}
							/>
							{errors?.numberOfPeople && (
								<p className="text-red-500">{errors.numberOfPeople}</p>
							)}
						</div>
						{/* SPECIAL REQUESTS */}
						<div className="flex flex-col gap-2">
							<Label>Special Requests (optional)</Label>
							<Textarea
								placeholder="my special request is..."
								className="bg-white"
								name="specialRequests"
								onFocus={() => setErrors(null)}
							/>
						</div>
						<SubmitFormButton selectedTable={selectedTable} />
						<Button
							variant="outline"
							onClick={(e) => {
								e.preventDefault();
								setSelectedTable(null);
								// handleSearch("", "");
							}}
						>
							Cancel
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}
