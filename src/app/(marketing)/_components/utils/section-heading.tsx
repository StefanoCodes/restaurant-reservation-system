import { cn } from "@/lib/utils";

export default function SectionHeading({
  title,
  highlightedText,
  className,
}: {
  title: string;
  highlightedText: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-shadow text-5xl font-bold tracking-tighter text-gray-900 dark:text-white sm:text-6xl",
        className,
      )}
    >
      {title} <span className="text-template-one">{highlightedText}</span>
    </h2>
  );
}
