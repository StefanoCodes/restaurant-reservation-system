import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginButton() {
  return (
    <Link href="/login">
      <Button className="bg-orange-500 text-white hover:text-white hover:bg-orange-600">
        Login
      </Button>
    </Link>
  );
}
