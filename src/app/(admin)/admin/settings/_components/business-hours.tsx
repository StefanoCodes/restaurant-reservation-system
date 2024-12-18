"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { updateBusinessHoursAction } from "../../_actions/actions";
import { useToast } from "@/hooks/use-toast";
import { useFormStatus } from "react-dom";
import { BusinessHourData } from "@/db/schema";
import ShowBusinessHours from "./show-business-hours";
import ButtonPendingLoader from "@/components/button-pending-loader";
import { use } from "react";
const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="ml-auto" disabled={pending}>
      {pending ? <ButtonPendingLoader /> : "Save Changes"}
    </Button>
  );
};

export default function BusinessHoursSettings({
  initialHoursPromise,
}: {
  initialHoursPromise: Promise<BusinessHourData[]>;
}) {
  const { toast } = useToast();
  const initialHours = use(initialHoursPromise);
  const [businessHours, setBusinessHours] =
    useState<BusinessHourData[]>(initialHours);

  const handleUpdateBusinessHours = async () => {
    const updateBusinessHoursResponse =
      await updateBusinessHoursAction(businessHours);
    if (updateBusinessHoursResponse.success) {
      toast({
        title: updateBusinessHoursResponse.message,
      });
    } else {
      toast({
        title: "Error",
        description: updateBusinessHoursResponse.message,
      });
    }
  };
  return (
    <form action={handleUpdateBusinessHours} className="flex-1">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Business Hours Settings</CardTitle>
        </CardHeader>
        <ShowBusinessHours
          businessHours={businessHours}
          setBusinessHours={setBusinessHours}
        />
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
