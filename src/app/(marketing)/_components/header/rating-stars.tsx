import { StarFilledIcon } from "@radix-ui/react-icons";

export default function RatingStars({
  rating,
  color,
}: {
  rating: number;
  color: string;
}) {
  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: rating }).map((_, index) => (
        <StarFilledIcon className={`h-4 w-4 ${color}`} key={index} />
      ))}
    </div>
  );
}
