import { Label } from "@/components/ui/label";
import Image from "next/image";
import { isAuthorizedUser } from "@/app/(auth)/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default async function Page() {
  const { user, userInDb } = await isAuthorizedUser();
  if (!user || userInDb) return;

  return (
    <main className="h-full w-full overflow-hidden">
      <div className="relative flex min-h-[100dvh] w-full flex-col px-4 sm:px-0 md:flex-row">
        <div className="flex flex-1 items-center justify-center py-8 md:py-0">
          <div className="z-10 mx-auto max-w-xl gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold">Contact Information</h1>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-4">
                <Label className="text-xl font-medium">
                  Email:{" "}
                  <span className="font-normal text-muted-foreground">
                    info@restaurant.com
                  </span>
                </Label>
                <Label className="text-xl font-medium">
                  Phone:{" "}
                  <span className="font-normal text-muted-foreground">
                    +39 800 000 000
                  </span>
                </Label>
                <Label className="text-xl font-medium">
                  Address:{" "}
                  <span className="font-normal text-muted-foreground">
                    123 Main St, Trastevere, Italy
                  </span>
                </Label>
                <Button
                  asChild
                  className="border-none bg-gradient-to-tr from-orange-500 via-orange-600 to-orange-700 text-white transition-all duration-300 hover:scale-105"
                >
                  <Link
                    href={
                      "https://www.google.com/maps/place/Red+Elephant+Restaurant/@30.0451029,31.2307412,17z/data=!3m1!4b1!4m6!3m5!1s0x14583fad4c1e581b:0x8955d1d337fef452!8m2!3d30.0451029!4d31.2333169!16s%2Fg%2F11c48yf53j"
                    }
                  >
                    View on Google Maps
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Image
            src="/bg-restaurant.jpg"
            alt="Image"
            priority={true}
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </main>
  );
}
