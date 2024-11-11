import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import EditUserInformationForm from "./edit-user-information-form";

type UserSettingsProps = {
  user: {
    name: string;
    email: string;
    phoneNumber: string;
    createdAt: Date;
    userId: string;
  };
};
// we want to cache this page
export default function UserSettings({ user }: UserSettingsProps) {
  const { name, email, phoneNumber, createdAt, userId } = user;
  const displayName =
    name.slice(0, 1).toUpperCase() + name.slice(-1).toUpperCase();
  const formattedCreatedAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(createdAt);
  return (
    <div className="w-full">
      <div className="relative w-full">
        {/* Full-width Gradient Banner */}
        <div
          className="h-40 w-full bg-gradient-to-r from-orange-200 via-orange-300 to-purple-600 sm:h-48 md:h-56"
          aria-hidden="true"
        />

        {/* Content Container */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Profile Picture Container */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 sm:-top-20 md:-top-24">
            <div className="relative h-32 w-32 sm:h-40 sm:w-40">
              {/* Gradient Border Container */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 p-1">
                <Avatar className="h-full w-full rounded-full">
                  <AvatarFallback className="bg-orange-500 text-white">
                    {displayName}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
          {/* Profile Info */}
          <div className="mb-4 pb-4 pt-20 text-center sm:pt-24 md:pt-28">
            <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              {user.name}
            </h1>
            <div className="mt-2 flex items-center justify-center gap-1 text-base text-muted-foreground sm:text-lg">
              <span>Created At:</span>
              <span>{formattedCreatedAt}</span>
            </div>
          </div>
        </div>
        {/* USER INFORMATION / EDIT FORM */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EditUserInformationForm user={user} />
        </div>
      </div>
    </div>
  );
}
