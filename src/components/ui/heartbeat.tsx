"use client";

import { useEffect } from "react";
import { motion, useCycle } from "framer-motion";

export default function Heartbeat() {
  const [isBeating, cycleBeating] = useCycle(false, true);

  useEffect(() => {
    const interval = setInterval(() => {
      cycleBeating();
    }, 800);
    return () => clearInterval(interval);
  }, [cycleBeating]);

  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{ scale: isBeating ? 1.3 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-16 h-16 rounded-full shadow-lg"
      >
        <svg
          viewBox="0 0 24 24"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-2"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>
    </div>
  );
}
