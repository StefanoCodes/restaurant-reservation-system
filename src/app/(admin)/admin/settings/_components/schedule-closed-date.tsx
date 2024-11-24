"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { scheduleClosedDateAction } from "../../_actions/actions";
import { use, useActionState, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  cn,
  convertDateFormat,
  formatDateToString,
  getLocalizedDateTime,
} from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

export default function ScheduleClosedDate({
  closedDatesPromise,
}: {
  closedDatesPromise: Promise<
    | {
        closedDate: string;
      }[]
    | []
  >;
}) {
  const closedDates = use(closedDatesPromise);

  const { toast } = useToast();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedClosedDate, setSelectedClosedDate] = useState<string | null>(
    null,
  );

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      if (!selectedClosedDate) return;
      const response = await scheduleClosedDateAction(
        prevState,
        formData,
        selectedClosedDate,
      );
      if (response.success) {
        toast({
          title: response.message,
        });
        setSelectedClosedDate(null);
      } else {
        toast({
          title: response.message,
        });
      }

      return response;
    },
    null,
  );

  return (
    <form action={formAction} className="w-full flex-[0.5]">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Schedule Closed Date</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
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
                      !selectedClosedDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedClosedDate ? (
                      formatDateToString(new Date(selectedClosedDate))
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    value={
                      selectedClosedDate
                        ? new Date(selectedClosedDate)
                        : new Date()
                    }
                    minDate={new Date()}
                    maxDate={
                      new Date(
                        new Date().setFullYear(new Date().getFullYear() + 1),
                      )
                    }
                    locale="IT"
                    tileDisabled={({ date }) => {
                      const isClosedDate = closedDates.some(
                        (closed) =>
                          new Date(closed.closedDate).toDateString() ===
                          date.toDateString(),
                      );
                      return isClosedDate;
                    }}
                    onClickDay={(dateValue: Date) => {
                      console.log(dateValue);
                      setSelectedClosedDate(convertDateFormat(dateValue));
                      setIsCalendarOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              {state?.error?.closedDate && (
                <span>
                  <p className="text-red-500">{state.error?.closedDate}</p>
                </span>
              )}
            </div>
          </div>

          <div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor={`reason`}>Reason:</Label>
              <Textarea
                id={`reason`}
                name="reason"
                className="w-full"
                disabled={isPending}
                aria-disabled={isPending}
                aria-describedby="reason-error"
                defaultValue={state?.formData?.reason}
                placeholder="Enter the reason for closing the date"
              />
            </div>
            {state?.error?.reason && (
              <span>
                <p className="text-red-500">{state.error?.reason}</p>
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={isPending} type="submit">
            {isPending ? "Scheduling..." : "Schedule"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
