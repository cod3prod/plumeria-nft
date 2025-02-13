"use client";

import { useState } from "react";
import PremiumBadge from "./premium-badge";
import PremiumTitle from "./premiun-title";
import ToAddressVerifier from "./to-address-verifier";
import PremiumTokenPreview from "./premium-token-preview";
import SendPremiumToken from "./send-premium-token";
import VaultEmpty from "./vault-empyt";
import { useAccount, useReadContract } from "wagmi";
import { wagmiContractConfig } from "@/configs/contracts";

export default function SendPremiumForm() {
  const [toAddress, setToAddress] = useState<string>("");
  const [isAddressValid, setIsAddressValid] = useState<boolean>(false);
  const { address } = useAccount();
  const { data } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getBalances",
    args: [address],
  });
  const balances = data
    ? (data as BigInt[]).map((el: BigInt) => Number(el))
    : [0];

  return (
    <section className="w-full max-w-md mx-auto mb-20">
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 relative overflow-hidden border-2 border-amber-100">
        <PremiumBadge />
        <PremiumTitle />
        {balances[0] ? (
          <>
            <PremiumTokenPreview />
            <ToAddressVerifier
              toAddress={toAddress}
              isAddressValid={isAddressValid}
              setIsAddressValid={setIsAddressValid}
              setToAddress={setToAddress}
            />
            <SendPremiumToken
              isAddressValid={isAddressValid}
              toAddress={toAddress}
            />
          </>
        ) : (
          <VaultEmpty />
        )}
      </div>
    </section>
  );
}
