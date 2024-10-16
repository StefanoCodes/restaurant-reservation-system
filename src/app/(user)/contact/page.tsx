import { Label } from "@/components/ui/label";
import { Contact } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "../../loading";

export default function Page() {
  return (
    <main className="h-full w-full overflow-hidden ">
      <div className="w-full lg:grid lg:grid-cols-2 md:min-h-screen px-4 sm:px-0 relative">
        <div className="flex items-center justify-center py-8 relative">
          <div className="mx-auto grid max-w-xl gap-6 z-10">
            <div className="gap-2 flex flex-col">
              <h1 className="text-4xl font-bold">Contact Information</h1>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="font-medium text-xl ">
                  Email:{" "}
                  <span className="font-normal text-muted-foreground">
                    info@restaurant.com
                  </span>
                </Label>
                <Label className="font-medium text-xl ">
                  Phone:{" "}
                  <span className="font-normal text-muted-foreground">
                    +39 800 000 000
                  </span>
                </Label>
                <Label className="font-medium text-xl">
                  Address:{" "}
                  <span className="font-normal text-muted-foreground">
                    123 Main St, Trastevere, Italy
                  </span>
                </Label>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43472.056165786926!2d31.230741205865964!3d30.04510286966119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fad4c1e581b%3A0x8955d1d337fef452!2sRed%20Elephant%20Restaurant!5e0!3m2!1sen!2seg!4v1728903388357!5m2!1sen!2seg"
                  width="600"
                  height="450"
                  style={{ border: "0" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-muted lg:block z-4">
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
