import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import Link from "next/link";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export interface PrimaryCtaProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href: string;
  label: string;
}

export default function PrimaryCta({ href, label, ...props }: PrimaryCtaProps) {
  return (
    <Link href={href} aria-label={label}>
      <Button className="bg-primary-brand-color" {...props}>
        {label}
      </Button>
    </Link>
  );
}
