import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";
import { marketingConfig } from "@/app/(marketing)/_templates/_template-one/marketing.config";
const { title, highlightedText, description, address, phone, email } =
  marketingConfig.ContactUs;
export default function ContactUs() {
  return (
    <section
      id="contact"
      className="w-full bg-gradient-to-b from-orange-50 to-white px-4 py-12 dark:from-gray-900 dark:to-gray-800 sm:px-6 md:px-8 md:py-24 lg:py-32"
      aria-label="Contact Us"
    >
      <div className="container grid gap-10 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
              {title}{" "}
              <span className="text-primary-brand-color">
                {highlightedText}
              </span>
            </h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <MapPin className="text-primary-brand-color" />
              <span className="text-gray-700 dark:text-gray-300">
                {address}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="text-primary-brand-color" />
              <span className="text-gray-700 dark:text-gray-300">{phone}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="text-primary-brand-color" />
              <span className="text-gray-700 dark:text-gray-300">{email}</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Name
              </label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <Input id="email" placeholder="Enter your email" type="email" />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Message
            </label>
            <Textarea
              className="min-h-[100px]"
              id="message"
              placeholder="Enter your message"
            />
          </div>
          <Button className="w-full bg-[#f37e11] text-white hover:bg-[#e06c00]">
            Send Message
          </Button>
        </div>
      </div>
    </section>
  );
}
