// "use client";
// import { AnimatedNumber } from "@/components/motion/animated-number";
// import { useInView } from "framer-motion";
// import { RefObject, useRef, useState } from "react";

// export function AnimatedNumberInView() {
//   const [value, setValue] = useState(0);
//   const ref = useRef<HTMLDivElement>(null);
//   const isInView = useInView(ref as RefObject<Element>);

//   if (isInView && value === 0) {
//     setValue(10000);
//   }

//   return (
//     <div className="flex w-full items-center justify-center" ref={ref}>
//       <AnimatedNumber
//         className="inline-flex items-center font-mono text-2xl font-light text-zinc-800 dark:text-zinc-50"
//         springOptions={{
//           bounce: 0,
//           duration: 10000,
//         }}
//         value={value}
//       />
//     </div>
//   );
// }
