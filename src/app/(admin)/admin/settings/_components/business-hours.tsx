"use client";
import { useState, useEffect, useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateBusinessHoursAction } from "../../_actions/actions";
import { BusinessHour } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useFormStatus } from "react-dom";
import { BusinessHourData } from "@/db/schema";
import { useRouter } from "next/navigation";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="ml-auto" disabled={pending}>
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  );
};

export default function BusinessHoursSettings({
  initialHours,
}: {
  initialHours: BusinessHourData[];
}) {
  const { toast } = useToast();
  const [businessHours, setBusinessHours] =
    useState<BusinessHourData[]>(initialHours);

  const handleInputChange = (
    id: string,
    field: keyof BusinessHour,
    value: any,
  ) => {
    setBusinessHours((prevHours) =>
      prevHours.map((hour) =>
        hour.id === id ? { ...hour, [field]: value } : hour,
      ),
    );
  };

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
    <form action={handleUpdateBusinessHours}>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Business Hours Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {businessHours.map((hour) => (
            <div key={hour.id} className="flex items-center space-x-4">
              <Input disabled value={hour.weekDay} />
              <div className="flex items-center space-x-2">
                <Label htmlFor={`open-${hour.id}`} className="w-12">
                  Open:
                </Label>
                <Input
                  id={`open-${hour.id}`}
                  type="number"
                  min="0"
                  max="23"
                  value={hour.openTime}
                  onChange={(e) =>
                    handleInputChange(
                      hour.id,
                      "openTime",
                      parseInt(e.target.value),
                    )
                  }
                  className="w-16"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor={`close-${hour.id}`} className="w-12">
                  Close:
                </Label>
                <Input
                  id={`close-${hour.id}`}
                  type="number"
                  name="closeTime"
                  min="0"
                  max="23"
                  value={hour.closeTime}
                  onChange={(e) =>
                    handleInputChange(
                      hour.id,
                      "closeTime",
                      parseInt(e.target.value),
                    )
                  }
                  className="w-16"
                />
              </div>
              <div className="flex items-center space-x-2">
                {/* todo:fix weird bug with checkbox */}
                <input
                  type="checkbox"
                  id={`closed-${hour.id}`}
                  checked={hour.closed}
                  onChange={(e) =>
                    handleInputChange(hour.id, "closed", e.target.checked)
                  }
                />
                <Label htmlFor={`closed-${hour.id}`}>Closed</Label>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
