import { CalendarDays, Clock, Users, Utensils } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReservationCardProps } from "@/lib/types";
export default function BookingCard({
  reservation,
  table,
  user,
}: ReservationCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-lg">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="flex justify-between items-center">
          <span>{user?.name || "Guest"}'s Reservation</span>
          <Badge
            variant="secondary"
            className={`${getStatusColor(
              reservation?.status || ""
            )} text-white`}
          >
            {reservation?.status || "Unknown"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-4 space-y-4">
        <div className="flex items-center space-x-2">
          <CalendarDays className="w-5 h-5 text-muted-foreground" />
          <span>{formatDate(reservation?.createdAt || "")}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <span>
            {reservation?.startTime || "N/A"} - {reservation?.endTime || "N/A"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Utensils className="w-5 h-5 text-muted-foreground" />
          <span>
            {table?.name || "Table not assigned"} (Capacity:{" "}
            {table?.capacity || "N/A"})
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-muted-foreground" />
          <span>{reservation?.numberOfPeople || "N/A"} people</span>
        </div>
      </CardContent>
      <CardFooter className="bg-secondary text-secondary-foreground p-4">
        <div className="w-full text-sm space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Email:</span>
            <span>{user?.email || "Not provided"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Phone:</span>
            <span>{user?.phoneNumber || "Not provided"}</span>
          </div>
          {reservation?.notes && (
            <div className="mt-3 pt-3 border-t border-secondary-foreground/20">
              <span className="font-semibold block mb-1">Notes:</span>
              <p className="text-xs italic">{reservation.notes}</p>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
