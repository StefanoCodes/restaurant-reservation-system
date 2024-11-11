import { StarFilledIcon } from "@radix-ui/react-icons";

export default function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: rating }).map((_, index) => (
        <StarFilledIcon
          className="h-4 w-4 text-primary-brand-color"
          key={index}
        />
      ))}
    </div>
  );
}
