import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useFormStatus } from "react-dom";
export default function ApproveReservationButton() {
	const { pending } = useFormStatus();
	return (
		<Button
			disabled={pending}
			className={`bg-green-600 hover:bg-green-700 w-full text-white flex items-center justify-center`}
		>
			<span>{pending ? "Approving..." : " Approve Reservation"}</span>
			{!pending && <Check className="w-4 h-4" />}
		</Button>
	);
}
