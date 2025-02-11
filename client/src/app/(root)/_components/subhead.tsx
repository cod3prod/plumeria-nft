import { motion } from "framer-motion";

export default function Subhead() {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-md md:text-xl text-gray-500 max-w-2xl mx-auto mb-8"
    >
     조각들을 모아 당신의 플루메리아를 완성하세요
    </motion.p>
  );
}
