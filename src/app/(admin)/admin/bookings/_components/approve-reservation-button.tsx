import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useFormStatus } from "react-dom";
export default function ApproveReservationButton({
  reservationStatus,
}: {
  reservationStatus: "pending" | "confirmed" | "cancelled";
}) {
  const { pending } = useFormStatus();
  const approved = reservationStatus === "confirmed";
  return (
    <Button
      disabled={pending || approved}
      className={`flex w-full items-center justify-center bg-green-600 text-white hover:bg-green-700`}
    >
      <span>
        {pending && !approved && "Approving..."}
        {!pending && approved && "Approved"}
        {!pending && !approved && "Approve Reservation"}
      </span>
      {!pending && approved && <Check className="h-4 w-4" />}
    </Button>
  );
}
