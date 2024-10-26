"use client";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarIcon } from "lucide-react";
import { calculateTimeSlots, cn, getLocalizedDateTime } from "@/lib/utils";
import { formatDateToString } from "@/lib/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { StepOneFormDataErrors } from "@/lib/types";
import { CLOSE_HOURS, OPEN_HOURS } from "@/utils/constants";
import { Input } from "@/components/ui/input";
import { handleStepOneAction } from "../actions";
import SubmitButton from "@/components/ui/submit-button";
import { useRouter } from "next/navigation";

export default function StepOneForm({ userId }: { userId: string }) {
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [time, setTime] = useState<string | undefined>(undefined);
	const [errors, setErrors] = useState<StepOneFormDataErrors | undefined>(
		undefined
	);
	const timeSlots = calculateTimeSlots(OPEN_HOURS, CLOSE_HOURS);
	const router = useRouter();
	const handleStepOne = async (formData: FormData) => {
		const numberOfPeople = formData.get("numberOfPeople");
		if (
			!time ||
			!date ||
			!numberOfPeople ||
			typeof numberOfPeople !== "string"
		) {
			throw new Error("Invalid form data");
		}
		// making sure the data is in the correct format and locale
		const dateString = getLocalizedDateTime(date);
		const formDataObject = {
			date: dateString,
			time,
			numberOfPeople,
		};
		const response = await handleStepOneAction(formDataObject, userId);
		if (!response.success) {
			setErrors(response?.errors);
		} else {
			router.push("/book-table/availability");
		}
	};
	return (
		<form
			action={handleStepOne}
			className="flex flex-col gap-4 mt-4 sm:px-4 md:px-13 max-w-2xl mx-auto"
		>
			{/* Date */}
			<div className="flex flex-col gap-4">
				<Label>
					Select A Date <span className="text-red-500">*</span>
				</Label>
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
								new Date(new Date().setFullYear(new Date().getFullYear() + 1))
							}
							className="bg-white"
							onClickDay={(dateValue: Date) => {
								setDate(dateValue);
								setIsCalendarOpen(false);
							}}
						/>
					</PopoverContent>
				</Popover>
				{errors?.date && <p className="text-red-500">{errors.date}</p>}
			</div>
			{/* TIME */}
			<div className="flex flex-col gap-4">
				<Label htmlFor="time">Time</Label>
				<Select
					value={time}
					onValueChange={(timeValue) => {
						setTime(timeValue);
					}}
					required
				>
					<SelectTrigger className="bg-white" id="time" name="time">
						<SelectValue placeholder="Select a time">
							{time ? time : "Select a time"}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{/* at the moment we are rendering all the time slots without checking for availabity  */}
						{date ? (
							timeSlots.map((slot) => (
								<SelectItem key={slot} value={slot}>
									{slot}
								</SelectItem>
							))
						) : (
							<SelectItem disabled value="disabled">
								Select A Date First Please
							</SelectItem>
						)}
					</SelectContent>
				</Select>
				{errors?.time && <p className="text-red-500">{errors.time}</p>}
			</div>
			{/* Number Of People */}
			<div className="flex flex-col gap-4">
				<Label>Number of People</Label>
				<Input
					placeholder="Number of people"
					type="number"
					className="bg-white"
					name="numberOfPeople"
					required
					onFocus={() => setErrors(undefined)}
				/>
				{errors?.numberOfPeople && (
					<p className="text-red-500">{errors.numberOfPeople}</p>
				)}
			</div>
			<SubmitButton pendingText="Submitting...">Next</SubmitButton>
		</form>
	);
}
