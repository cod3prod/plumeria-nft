"use client";

import { useEffect, useState } from "react";
import ToAddressVerifier from "../to-address-verifier";
import TokenInputs from "./token-inputs";
import { useAccount, useReadContract } from "wagmi";
import { wagmiContractConfig } from "@/configs/contracts";
import { toast } from "react-toastify";
import SendTokens from "./send-tokens";

export default function BatchTransfer() {
  const [toAddress, setToAddress] = useState<string>("");
  const [amounts, setAmounts] = useState<number[]>(Array(16).fill(0));
  const [isAddressValid, setIsAddressValid] = useState<boolean>(false);
  const { address } = useAccount();

  const { data, error } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getBalances",
    args: [address],
  });

  const holdings = data
    ? (data as bigint[]).map((el: bigint) => Number(el))
    : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const handleAmountChange = (index: number, value: number) => {
    const newAmounts = [...amounts];
    newAmounts[index] = value >= 0 ? value : 0;
    setAmounts(newAmounts);
  };

  useEffect(() => {
    toast.error(error?.message);
  }, [error]);

  return (
    <section className="w-full max-w-md mx-auto mb-20">
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
        <h3 className="text-center text-xl font-bold text-gray-900 mb-6">
          Batch Transfer
        </h3>
        <ToAddressVerifier
          toAddress={toAddress}
          isAddressValid={isAddressValid}
          setToAddress={setToAddress}
          setIsAddressValid={setIsAddressValid}
        />
        <TokenInputs
          amounts={amounts}
          handleAmountChange={handleAmountChange}
          holdings={holdings}
        />

        <SendTokens toAddress={toAddress} isAddressValid={isAddressValid} amounts={amounts} />
      </div>
    </section>
  );
}
