import { Button } from "@/components/ui/button";

export default function AddNewButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Button variant={"outline"}>
      <span className="flex items-center space-x-2">
        <span>{children}</span>
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
        </span>
      </span>
    </Button>
  );
}
