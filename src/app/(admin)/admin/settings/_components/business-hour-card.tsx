import { BusinessHourData } from "@/db/schema";
import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BusinessHour } from "@/lib/types";
export default function BusinessHourCard({
  length,
  setBusinessHours,
  data,
  idx,
}: {
  length: number;
  setBusinessHours: Dispatch<SetStateAction<BusinessHourData[]>>;
  data: BusinessHourData;
  idx: number;
}) {
  const handleInputChange = (
    id: string,
    field: keyof BusinessHour,
    value: any,
  ) => {
    setBusinessHours((prevHours) =>
      prevHours.map((data) =>
        data.id === id ? { ...data, [field]: value } : data,
      ),
    );
  };
  return (
    <>
      <div key={data.id} className={`w-full flex-col gap-4`}>
        <Input
          type="text"
          className="border-none p-0 md:max-w-24"
          disabled
          value={data.weekDay}
        />
        <div className="flex items-center py-2">
          <Label htmlFor={`open-${data.id}`} className="flex-1 md:w-12">
            Open:
          </Label>
          <Input
            id={`open-${data.id}`}
            type="number"
            min="0"
            max="23"
            value={data.openTime}
            onChange={(e) =>
              handleInputChange(data.id, "openTime", parseInt(e.target.value))
            }
            className="flex-1 md:w-16"
          />
        </div>
        <div className="flex items-center py-2">
          <Label htmlFor={`close-${data.id}`} className="flex-1 md:w-12">
            Close:
          </Label>
          <Input
            id={`close-${data.id}`}
            type="number"
            name="closeTime"
            min="0"
            max="23"
            value={data.closeTime}
            onChange={(e) =>
              handleInputChange(data.id, "closeTime", parseInt(e.target.value))
            }
            className="flex-1 md:w-16"
          />
        </div>
        <div className="flex items-center justify-between py-2">
          {/* todo:fix weird bug with checkbox */}
          <Label htmlFor={`closed-${data.id}`}>Closed:</Label>
          <input
            type="checkbox"
            className="mt-0 h-4 w-4 pt-0"
            id={`closed-${data.id}`}
            checked={data.closed}
            onChange={(e) =>
              handleInputChange(data.id, "closed", e.target.checked)
            }
          />
        </div>
      </div>
      {idx < length - 1 && <hr className="w-full border-gray-300" />}
    </>
  );
}
