"use client";

import { useAccount } from "wagmi";
import ConnectWallet from "./connect-wallet";

export default function Authenticated() {
  const { address } = useAccount();

  return (
    <>
      {!address && (
        <section className="h-screen flex flex-col justify-center items-center">
          <h1 className="headline text-3xl md:text-5xl font-bold mb-4 animate-bounce">
            로그인이 필요합니다
          </h1>
          <ConnectWallet />
        </section>
      )}
    </>
  );
}
