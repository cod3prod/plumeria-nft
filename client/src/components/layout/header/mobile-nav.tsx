"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import Dropdown from "./dropdown";

export default function MobileNav() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <FaChevronDown
          className={twMerge(
            "w-6 h-6 cursor-pointer transition-transform text-purple-500",
            isMenuOpen && "rotate-180 text-pink-500"
          )}
        />
      </button>
      {isMenuOpen && <Dropdown onClose={() => setIsMenuOpen(false)} />}
    </div>
  );
}