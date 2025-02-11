"use client";

import { motion } from "framer-motion";

export default function AnimatedBackgroundElements() {
  return (
    <motion.div
      className="absolute bottom-1/55 right-0 h-80 w-80 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}
