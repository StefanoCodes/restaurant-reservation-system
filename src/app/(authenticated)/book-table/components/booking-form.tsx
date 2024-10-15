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
import { calculateTimeSlots, cn, formatDate } from "@/lib/utils";
import { UserReservationDetails } from "@/lib/types";
import TablesContainer from "./tables-container";
import { Table } from "@/db/schema";
import { useState } from "react";
import { PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
export default function BookingForm({
  user,
  tables,
}: {
  user: UserReservationDetails;
  tables: Table[];
}) {
  const timeSlots = calculateTimeSlots(OPEN_HOURS, CLOSE_HOURS);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <div className="flex gap-5">
      <div className="flex-1">
        <TablesContainer
          tables={tables}
          onTableClick={setSelectedTable}
          selectedTable={selectedTable}
        />
      </div>

      <div className="flex-[0.5]">
        <form
          className={cn(
            "flex flex-col gap-4 opacity-0 invisible transition-all duration-300",
            selectedTable && "opacity-100 visible"
          )}
        >
          {/* NAME */}
          <div className="flex flex-col gap-2">
            <Label>Name</Label>
            <Input type="text" defaultValue={user.name} className="bg-white" />
          </div>
          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              defaultValue={user.email}
              className="bg-white"
            />
          </div>
          {/* PHONE */}
          <div className="flex flex-col gap-2 ">
            <Label>Phone</Label>
            <Input
              type="text"
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
                  {date ? formatDate(date) : <span>Pick a date</span>}
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
            <Select>
              <SelectTrigger className="bg-white" id="time">
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
            />
          </div>
          {/* SPECIAL REQUESTS */}
          <div className="flex flex-col gap-2">
            <Label>Special Requests</Label>
            <Textarea
              placeholder="my special request is..."
              className="bg-white"
            />
          </div>
          <Button className="mt-4" type="submit">
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
  );
}
