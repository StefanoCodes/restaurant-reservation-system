import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export default function SecondaryCta({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link href={href} target="_blank" aria-label={label}>
      <Button variant="outline" className="flex gap-1">
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </Link>
  );
}
