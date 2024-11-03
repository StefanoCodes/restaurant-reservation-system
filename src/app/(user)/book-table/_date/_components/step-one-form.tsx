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
import { Input } from "@/components/ui/input";
import { handleStepOneAction } from "../actions";
import { useRouter } from "next/navigation";
import { useCreateReservationContext } from "@/contexts/createReservationContext";
import { useFormStatus } from "react-dom";
import ButtonLoader from "@/app/button-loader";
import Link from "next/link";
function SubmitTableButton() {
  const { pending } = useFormStatus();
  const { reservationData } = useCreateReservationContext();
  return (
    <Button
      className="w-full sm:w-[7.5rem]"
      disabled={!reservationData.date || !reservationData.time || pending}
    >
      {reservationData.date &&
        reservationData.time !== "select a time" &&
        !pending &&
        "Next"}
      {pending && <ButtonLoader />}
      {!reservationData.date && !reservationData.time && "Select A Date"}
    </Button>
  );
}
export default function StepOneForm() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [errors, setErrors] = useState<StepOneFormDataErrors | undefined>(
    undefined,
  );

  const router = useRouter();
  const { reservationData, updateReservationDetails } =
    useCreateReservationContext();
  const timeSlots = calculateTimeSlots(reservationData.date);
  const handleStepOne = async (formData: FormData) => {
    const numberOfPeople = formData.get("numberOfPeople");
    try {
      if (
        !reservationData.time ||
        !reservationData.date ||
        !numberOfPeople ||
        typeof numberOfPeople !== "string"
      ) {
        throw new Error("Invalid form data");
      }
      // check what is the date being selected is it accruate ?
      const formDataObject = {
        date: reservationData.date,
        time: reservationData.time,
        numberOfPeople,
      };

      const response = await handleStepOneAction(formDataObject);
      if (!response.success) {
        setErrors(response?.errors);
        return;
      }
      router.push(
        `/book-table/availability?date=${reservationData.date}&time=${reservationData.time}&numberOfPeople=${numberOfPeople}`,
      );
      updateReservationDetails(formDataObject);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      action={handleStepOne}
      className="md:px-13 mx-auto mt-4 flex w-full max-w-2xl flex-col gap-4 sm:px-4"
    >
      {/* Date */}
      <div className="flex w-full flex-col gap-4">
        <Label>
          Select A Date <span className="text-red-500">*</span>
        </Label>
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start bg-white text-left font-normal",
                !reservationData.date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {reservationData.date ? (
                formatDateToString(new Date(reservationData.date))
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              value={
                reservationData.date
                  ? new Date(reservationData.date)
                  : new Date()
              }
              minDate={new Date()}
              maxDate={
                new Date(new Date().setFullYear(new Date().getFullYear() + 1))
              }
              className="bg-white"
              onClickDay={(dateValue: Date) => {
                updateReservationDetails({
                  ...reservationData,
                  date: getLocalizedDateTime(dateValue),
                });
                setIsCalendarOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
        {errors?.date && <p className="text-red-500">{errors.date}</p>}
      </div>
      {/* TIME */}
      <div className="flex w-full flex-col gap-4">
        <Label htmlFor="time">Time</Label>
        <Select
          value={reservationData.time}
          onValueChange={(timeValue) => {
            updateReservationDetails({ ...reservationData, time: timeValue });
          }}
          required
        >
          <SelectTrigger className="bg-white" id="time" name="time">
            <SelectValue placeholder="Select a time">
              {reservationData.time ? reservationData.time : "Select a time"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {reservationData.date ? (
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
      <div className="flex w-full flex-col gap-4">
        <Label>Number of People</Label>
        <Input
          defaultValue={reservationData.numberOfPeople}
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
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Button asChild variant={"outline"}>
          <Link href={"/"}>Cancel</Link>
        </Button>
        <SubmitTableButton />
      </div>
    </form>
  );
}
