"use client";

import Logo from "./logo";
import PCNav from "./pc-nav";
import ConnectWallet from "@/components/ui/connect-wallet";
import MobileNav from "./mobile-nav";

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-lg shadow-sm z-40">
      <div className="mx-auto max-w-7xl px-4 md:px-8 h-20 flex justify-between items-center">
        <Logo />
        <div className="hidden md:flex gap-2">
          <PCNav />
          <ConnectWallet />
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
