// "use client";
import Confetti, { ConfettiRef } from "@/components/ui/confetti";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ReservationSuccess() {
  const confettiRef = useRef<ConfettiRef>(null);
  useEffect(() => {
    // Start confetti when component mounts
    confettiRef.current?.fire();
  }, []);
  return (
    <div className="relative flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
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

          <Confetti
            ref={confettiRef}
            className="absolute left-0 top-0 z-10 h-full w-full"
            manualstart
          />
        </div>
      </motion.div>
    </div>
  );
}
