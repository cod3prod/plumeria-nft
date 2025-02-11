"use client";

import Button from "@/components/ui/button";
import metamaskIcon from "@/assets/icons/metamask.svg";
import Image from "next/image";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function ConnectWallet() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors, connect } = useConnect();
  // console.log(connectors);
  const connector = connectors[2];

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {address ? (
        <Button
          className={
            "w-36 flex justify-center items-center bg-gray-100 text-gray-900 hover:text-white px-6 py-2 rounded-full hover:bg-red-500 font-semibold transition-all"
          }
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => disconnect()}
        >
          {!isHovered
            ? `${address.substring(0, 4)}...${address.slice(-4)}`
            : "Disconnect"}
        </Button>
      ) : (
        <Button
          onClick={() => connect({ connector: connector })}
          className="w-36 flex justify-center items-center bg-amber-400 text-gray-900 px-6 py-2 rounded-full hover:bg-amber-300 font-semibold transition-all"
        >
          <Image
            src={metamaskIcon}
            alt="metamask icon"
            className="w-6 h-6 mr-1"
          />
          Connect
        </Button>
      )}
    </>
  );
}
