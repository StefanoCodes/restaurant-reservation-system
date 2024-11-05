"use client";
import { cn } from "@/lib/utils";
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
  // Replace path length logic with direct path comparison
  const pathname = usePathname();
  const isActive = steps.findIndex((s) => s.link === pathname) >= idx;
  const index = idx + 1;

  return (
    <>
      <div key={idx} className="flex flex-col items-center p-2">
        <div
          className={cn(
            `flex h-10 w-10 items-center justify-center rounded-full text-white`,
            isActive ? "bg-orange-500" : "bg-gray-300",
          )}
        >
          {index}
        </div>
        <p className="mt-2 text-nowrap text-sm">{step.title}</p>
      </div>
      {idx !== steps.length - 1 && (
        <div
          className={cn(
            `h-1 w-full`,
            isActive ? "bg-orange-500" : "bg-gray-300",
          )}
        ></div>
      )}
    </>
  );
};

export default function DisplaySteps() {
  return steps.map((step, idx) => <Step key={idx} idx={idx} step={step} />);
}
