"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
// Configuration
const steps = [
	{
		link: "/book-table",
		title: "Date",
	},
	{
		link: "/book-table/availability",
		title: "Availability",
	},
	{
		link: "/book-table/contact",
		title: "Contact",
	},
];

const Step = ({ idx, step }: { idx: number; step: (typeof steps)[0] }) => {
	const currentStep = usePathname().split("/").length;
	const index = idx + 1;
	return (
		<>
			<div key={idx} className="flex flex-col items-center p-2">
				<Link
					prefetch
					className={cn(
						`w-10 h-10 flex items-center justify-center rounded-full text-white`,
						index < currentStep ? "bg-orange-500" : "bg-gray-300"
					)}
					href={step.link}
				>
					{index}
				</Link>
				<p className="text-sm mt-2 text-nowrap">{step.title}</p>
			</div>
			{idx !== steps.length - 1 && (
				<div
					className={cn(
						`h-1 w-full`,
						index + 1 < currentStep ? "bg-orange-500" : "bg-gray-300"
					)}
				></div>
			)}
		</>
	);
};

export default function DisplaySteps() {
	return steps.map((step, idx) => <Step key={idx} idx={idx} step={step} />);
}