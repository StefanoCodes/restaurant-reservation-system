import { cn } from "@/lib/utils";

export default function FormErrorMessage({
  errorMessage,
  className,
}: {
  errorMessage: string | string[];
  className?: string;
}) {
  return (
    <p className={cn("text-sm text-red-500", className)}>{errorMessage}</p>
  );
}
