import { StarFilledIcon } from "@radix-ui/react-icons";

export default function RatingStars({
  rating,
  color,
}: {
  rating: number;
  color: "orange" | "green" | "blue" | "yellow" | "purple" | "red";
}) {
  const ratingColor = {
    orange: `text-orange-500`,
    green: `text-green-500`,
    blue: `text-blue-500`,
    yellow: `text-yellow-500`,
    purple: `text-purple-500`,
    red: `text-red-500`,
  };

  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: rating }).map((_, index) => (
        <StarFilledIcon
          className={`h-4 w-4 ${ratingColor[color]}`}
          key={index}
        />
      ))}
    </div>
  );
}
