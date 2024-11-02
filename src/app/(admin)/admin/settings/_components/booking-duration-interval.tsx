"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { updateBookingDurationInterval } from "../../_actions/actions";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
type Errors = {
  interval: string;
};
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  );
}

export default function BookingDurationHours({
  bookingDurationInterval,
}: {
  bookingDurationInterval: number;
}) {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Errors | undefined>(undefined);
  const handleUpdateBookingDurationInterval = async (formData: FormData) => {
    const response = await updateBookingDurationInterval(formData);
    if (response.success) {
      toast({
        title: response.message,
      });
    } else {
      if (response.error) {
        setErrors({
          interval: response.error.interval,
        });
      }
      toast({
        title: response.message,
      });
    }
  };
  return (
    <form
      action={handleUpdateBookingDurationInterval}
      className="w-full flex-[0.5]"
    >
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Booking Duration Interval</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor={`booking-duration-interval`}>Interval:</Label>
            <Input
              id={`booking-duration-interval`}
              type="number"
              min="0"
              max="4"
              name="bookingDurationInterval"
              onFocus={() => setErrors(undefined)}
              defaultValue={bookingDurationInterval}
              className="w-full"
            />
          </div>
          {errors?.interval && (
            <span>
              <p className="text-red-500">{errors.interval}</p>
            </span>
          )}
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
