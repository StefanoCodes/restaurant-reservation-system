import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactUs() {
  return (
    <section className="w-full bg-gradient-to-b from-orange-50 to-white py-12 dark:from-gray-900 dark:to-gray-800 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
                Contact <span className="text-[#f37e11]">Us</span>
              </h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                We'd love to hear from you. Send us a message and we'll respond
                as soon as possible.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <MapPin className="text-[#f37e11]" />
                <span className="text-gray-700 dark:text-gray-300">
                  123 Gourmet Street, Foodie City, FC 12345
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-[#f37e11]" />
                <span className="text-gray-700 dark:text-gray-300">
                  (123) 456-7890
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="text-[#f37e11]" />
                <span className="text-gray-700 dark:text-gray-300">
                  info@gourmethaven.com
                </span>
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
      </div>
    </section>
  );
}
