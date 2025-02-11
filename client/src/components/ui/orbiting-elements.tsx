"use client";

import { motion } from "framer-motion";

export default function OrbitingElements() {
  return (
    <div className="absolute top-10 left-0 h-96 w-96 mx-auto">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-24 w-24 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-full blur-xl"
          animate={{
            rotate: 360,
            x: [0, 100 * Math.cos((i * 120 * Math.PI) / 180), 0],
            y: [0, 100 * Math.sin((i * 120 * Math.PI) / 180), 0],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
