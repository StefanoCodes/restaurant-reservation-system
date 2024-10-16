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
import { OPEN_HOURS, CLOSE_HOURS } from "@/lib/data";
import {
  calculateTimeSlots,
  cn,
  formatDateForReservation,
  formatDateToString,
} from "@/lib/utils";
import { UserReservationDetails } from "@/lib/types";
import TablesContainer from "./tables-container";
import { Table, User } from "@/db/schema";
import { useState } from "react";
import { PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { createReservation } from "@/actions/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { sendEmailPendingConfirmation } from "@/actions/email";
export default function BookingForm({
  user,
  tables,
}: {
  user: UserReservationDetails;
  tables: Table[];
}) {
  // States
  const timeSlots = calculateTimeSlots(OPEN_HOURS, CLOSE_HOURS);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const { toast } = useToast();
  const router = useRouter();
  // handle the reservation action
  const handleReservationAction = async (formData: FormData) => {
    console.log(date?.toISOString().split("T")[0]);
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
      sendEmailPendingConfirmation(
        "stefanovidmarbusiness@gmail.com",
        "Reservation Pending Confirmation",
        response.reservationId as string
      );
    } else {
      console.log(response.error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
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
            selectedTable={selectedTable}
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
              />
            </div>
            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                defaultValue={user.email}
                className="bg-white"
              />
            </div>
            {/* PHONE */}
            <div className="flex flex-col gap-2 ">
              <Label>Phone</Label>
              <Input
                type="text"
                name="phoneNumber"
                defaultValue={user.phoneNumber}
                className="bg-white"
              />
            </div>
            {/* DATE */}
            <div className="flex flex-col gap-2">
              <Label>Date</Label>
              <Popover>
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
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* TIME */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="time">Time</Label>
              <Select onValueChange={setTime}>
                <SelectTrigger className="bg-white" id="time" name="time">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* NUMBER OF PEOPLE */}
            <div className="flex flex-col gap-2">
              <Label>Number of People</Label>
              <Input
                placeholder="Number of people"
                type="number"
                className="bg-white"
                name="numberOfPeople"
              />
            </div>
            {/* SPECIAL REQUESTS */}
            <div className="flex flex-col gap-2">
              <Label>Special Requests</Label>
              <Textarea
                placeholder="my special request is..."
                className="bg-white"
                name="specialRequests"
              />
            </div>
            <Button
              className="mt-4"
              type="submit"
              formAction={handleReservationAction}
              disabled={!selectedTable}
            >
              Book Table
            </Button>
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                setSelectedTable(null);
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
