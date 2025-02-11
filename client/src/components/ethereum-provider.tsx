"use client";

import { useState } from "react";
import { State, WagmiProvider } from "wagmi";
import { getConfig } from "@/configs/wagmi-config";

export default function EthereumProvider({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState: State | undefined;
}) {
  const [config] = useState(() => getConfig());

  return (
    <WagmiProvider config={config} initialState={initialState}>
      {children}
    </WagmiProvider>
  );
}
