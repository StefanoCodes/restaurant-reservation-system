// "use client";

// import { motion } from "framer-motion";
// import { useIsMobile } from "@/hooks/use-mobile";

// const SpinnerSVG = ({ isMobile }: { isMobile: boolean }) => (
//   <svg
//     className="absolute inset-0 h-full w-full"
//     viewBox="0 0 100 100"
//     preserveAspectRatio="xMidYMid slice"
//   >
//     <motion.path
//       d="M50 10 A40 40 0 0 1 90 50 A40 40 0 0 1 50 90 A40 40 0 0 1 10 50 A40 40 0 0 1 50 10"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="0.5"
//       strokeLinecap="round"
//       initial={{ pathLength: 0 }}
//       animate={{ pathLength: 1 }}
//       transition={{
//         duration: 2,
//         ease: "easeInOut",
//         repeat: Infinity,
//         repeatType: "reverse",
//       }}
//     />
//     <motion.path
//       d="M50 10 A40 40 0 0 1 90 50 A40 40 0 0 1 50 90 A40 40 0 0 1 10 50 A40 40 0 0 1 50 10"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="0.5"
//       strokeLinecap="round"
//       initial={{ pathLength: 0 }}
//       animate={{ pathLength: 1, rotate: isMobile ? 0 : 360 }}
//       transition={{
//         duration: 4,
//         ease: "linear",
//         repeat: Infinity,
//       }}
//     />
//   </svg>
// );

// export default function MobileDetectionAnimation() {
//   const isMobile = useIsMobile();

//   return (
//     <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-100">
//       <div className="absolute inset-0 text-gray-200 opacity-20">
//         <SpinnerSVG isMobile={isMobile} />
//       </div>
//       {isMobile ? (
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//           className="relative z-10 rounded-lg bg-white bg-opacity-80 p-6 text-center shadow-xl backdrop-blur-sm"
//         >
//           <motion.h1
//             className="mb-4 text-3xl font-bold text-gray-800"
//             animate={{ scale: [1, 1.05, 1] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           >
//             Better to use this page on a desktop
//           </motion.h1>
//           <p className="text-gray-600">
//             For the best experience, please view this page on a larger screen.
//           </p>
//         </motion.div>
//       ) : (
//         <motion.h1
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="relative z-10 text-4xl font-bold text-gray-800"
//         >
//           Welcome to the desktop version!
//         </motion.h1>
//       )}
//     </div>
//   );
// }
