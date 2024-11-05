// "use client";
import { motion } from "framer-motion";
import { Check, CalendarCheck, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

export default function ReservationSuccess() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          >
            <div className="mb-8">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 p-3">
                <Check className="h-12 w-12 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="mb-4 text-3xl font-bold text-gray-800">
              Reservation Confirmed!
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="Thank you for choosing our restaurant. We look forward to serving you!">
              Thank you for choosing our restaurant. We look forward to serving
              you!
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="mb-8 flex justify-center space-x-4">
              <div className="flex items-center">
                <CalendarCheck className="mr-2 h-5 w-5 text-green-600" />
                <span className="text-gray-700">
                  Reservation details sent to your email
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex justify-center">
              <Link
                href="/bookings"
                className="flex items-center rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-green-700"
              >
                <UtensilsCrossed className="mr-2 h-5 w-5" />
                View Bookings
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
