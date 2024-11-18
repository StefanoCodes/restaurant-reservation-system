import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Template({
  children,
  preview = false,
}: {
  children: React.ReactNode;
  preview?: boolean;
}) {
  return (
    <div className="relative w-full">
      {preview && (
        <div className="absolute left-0 right-0 top-0 z-50 p-2">
          <Button variant="link" asChild>
            <Link href="/admin/marketing">Go Back</Link>
          </Button>
        </div>
      )}
      <main className="relative overflow-hidden">{children}</main>
    </div>
  );
}
