"use client";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
type ApproveReservationButtonProps = {
	onClick: () => void;
};
export default function ApproveReservationButton({
	onClick,
}: ApproveReservationButtonProps) {
	return (
		<Button
			className={`bg-green-600 hover:bg-green-700 w-full text-white flex items-center justify-center`}
			onClick={onClick}
		>
			<span>Approve Reservation</span>
			<Check className="w-4 h-4" />
		</Button>
	);
}
