"use client";

import { motion } from "framer-motion";
import Headline from "./headline";
import Subhead from "./subhead";
import CallToAction from "./call-to-action";

export default function Hero() {
  return (
    <section className="relative flex flex-col justify-center items-center min-h-screen">
      <div className="relative flex flex-col items-center justify-center z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Headline />
          <Subhead />
          <CallToAction />
        </motion.div>
      </div>
    </section>
  );
}
