"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PremiumBadge() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const animateScroll = () => {
      setOffset((prevOffset) => {
        // Reset offset when it goes beyond a certain point
        return prevOffset >= 200 ? -100 : prevOffset + 1;
      });
    };

    const animationFrame = requestAnimationFrame(() => {
      const intervalId = setInterval(animateScroll, 20);
      return () => clearInterval(intervalId);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="absolute top-3 -right-8 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-1 text-xs font-bold rotate-45 shadow-md">
      <motion.div
        animate={{ x: offset }}
        transition={{ duration: 0 }}
        className="inline-block"
      >
        PREMIUM TOKEN
      </motion.div>
    </div>
  );
}
