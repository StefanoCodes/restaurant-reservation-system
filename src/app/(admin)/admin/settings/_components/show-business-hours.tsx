import { CardContent } from "@/components/ui/card";
import { BusinessHourData } from "@/db/schema";
import { Dispatch, SetStateAction } from "react";
import BusinessHourCard from "./business-hour-card";
export default function ShowBusinessHours({
  setBusinessHours,
  businessHours,
}: {
  setBusinessHours: Dispatch<SetStateAction<BusinessHourData[]>>;
  businessHours: BusinessHourData[];
}) {
  const businessHoursLength = businessHours.length;
  return (
    <CardContent className="flex flex-col gap-4">
      {businessHours.map((data, idx) => (
        <BusinessHourCard
          key={data.id}
          data={data}
          idx={idx}
          length={businessHoursLength}
          setBusinessHours={setBusinessHours}
        />
      ))}
    </CardContent>
  );
}
