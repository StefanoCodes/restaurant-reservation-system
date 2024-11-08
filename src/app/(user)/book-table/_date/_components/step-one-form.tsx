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
import {
  calculateTimeSlots,
  cn,
  getLocalizedDateTime,
  isDateInFuture,
  isTimeInBetweenOpeningAndClosingHours,
} from "@/lib/utils";
import { formatDateToString } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { StepOneFormDataErrors } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { handleStepOneAction } from "../actions";
import { useFormStatus } from "react-dom";
import { useQueryState } from "nuqs";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import ButtonPendingLoader from "@/app/button-pending-loader";
function SubmitTableButton({
  reservationDate,
  reservationTime,
  numberOfPeople,
}: {
  reservationDate: string | null;
  reservationTime: string | null;
  numberOfPeople: string | null;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      className="w-full sm:min-w-[7.5rem] sm:max-w-[14rem]"
      disabled={
        !reservationDate || !reservationTime || !numberOfPeople || pending
      }
    >
      {pending && <ButtonPendingLoader />}
      {!reservationDate && "Select A Date"}
      {reservationDate && !reservationTime && "Select A Time"}
      {reservationDate &&
        reservationTime &&
        !numberOfPeople &&
        "Select number of people"}
      {reservationDate &&
        reservationTime &&
        numberOfPeople &&
        !pending &&
        "Next"}
    </Button>
  );
}
export default function StepOneForm() {
  // Local State
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [errors, setErrors] = useState<StepOneFormDataErrors | undefined>(
    undefined,
  );
  const router = useRouter();
  const { toast } = useToast();
  const timeSlots = calculateTimeSlots();

  // Search Params
  const [reservationDate, setReservationDate] = useQueryState("date", {
    defaultValue: "",
  });
  const [reservationTime, setReservationTime] = useQueryState("time", {
    defaultValue: "",
  });
  const [numberOfPeople, setNumberOfPeople] = useQueryState("numberOfPeople", {
    defaultValue: "",
  });

  // this is just for better user expeircein in the case the script kiddie tried to be sneaky by changing the url to a an invalid time or date when going back to change the date or time the
  useEffect(() => {
    if (reservationTime) {
      const isValidTime =
        isTimeInBetweenOpeningAndClosingHours(reservationTime);
      if (!isValidTime) {
        setReservationTime("");
      }
    }
    if (reservationDate) {
      const isValidDate = isDateInFuture(reservationDate);
      if (!isValidDate) {
        setReservationDate("");
      }
    }
  }, []);

  const handleStepOne = async () => {
    try {
      if (!reservationDate || !reservationTime || !numberOfPeople) {
        return toast({
          title: "Reservation Data Is Incorrect",
          variant: "destructive",
        });
      }

      const formDataObject = {
        date: reservationDate,
        time: reservationTime,
        numberOfPeople,
      };
      const response = await handleStepOneAction(formDataObject);
      if (!response.success) {
        setErrors(response?.errors);
        return;
      }
      // if all goes good we can redirect the user to the second step
      toast({
        title: response.message,
      });
      router.push(
        `/book-table/availability/?date=${reservationDate}&time=${reservationTime}&numberOfPeople=${numberOfPeople}`,
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      action={handleStepOne}
      className="flex w-full max-w-2xl flex-col gap-4"
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
                !reservationDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {reservationDate ? (
                formatDateToString(new Date(reservationDate))
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              value={reservationDate ? new Date(reservationDate) : new Date()}
              minDate={new Date()}
              maxDate={
                new Date(new Date().setFullYear(new Date().getFullYear() + 1))
              }
              className="bg-white"
              onClickDay={(dateValue: Date) => {
                setReservationDate(getLocalizedDateTime(dateValue));
                setIsCalendarOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
        {errors?.date && <p className="text-red-500">{errors.date}</p>}
      </div>
      {/* TIME */}
      <div className="flex w-full flex-col gap-4">
        <Label htmlFor="time">
          Select A Time <span className="text-red-500">*</span>
        </Label>
        <Select
          value={reservationTime}
          onValueChange={(timeValue) => {
            setReservationTime(timeValue);
          }}
          required
        >
          <SelectTrigger className="bg-white" id="time" name="time">
            <SelectValue placeholder="Select a time">
              {reservationTime ?? "Select a time"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {reservationDate ? (
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
      <div className="mb-2 flex w-full flex-col gap-4">
        <Label>
          Number of People <span className="text-red-500">*</span>
        </Label>
        <Input
          defaultValue={numberOfPeople}
          placeholder="Number of people"
          type="number"
          className="bg-white"
          name="numberOfPeople"
          onChange={(e) => setNumberOfPeople(e.target.value)}
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
        <SubmitTableButton
          numberOfPeople={numberOfPeople}
          reservationDate={reservationDate}
          reservationTime={reservationTime}
        />
      </div>
    </form>
  );
}
