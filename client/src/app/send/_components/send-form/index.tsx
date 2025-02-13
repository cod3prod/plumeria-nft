"use client";

import { useState } from "react";
import ImagePreview from "@/app/mint/_components/mint-form/image-preview";
import TokenIdSelector from "./token-id-selector";
import ToAddressVerifier from "../to-address-verifier";
import SendToken from "./send-token";

export default function SendForm() {
  const [toAddress, setToAddress] = useState<string>("");
  const [tokenId, setTokenId] = useState<number>(1);
  const [amount, setAmount] = useState<number>(0);
  const [isAddressValid, setIsAddressValid] = useState<boolean>(false);

  return (
    <section className="w-full max-w-md mx-auto mb-20">
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
        <h3 className="text-center text-xl font-bold text-gray-900 mb-6">
          Single Transfer
        </h3>

        <ImagePreview tokenId={tokenId} />

        <TokenIdSelector
          tokenId={tokenId}
          amount={amount}
          setTokenId={setTokenId}
          setAmount={setAmount}
        />

        <ToAddressVerifier
          toAddress={toAddress}
          setToAddress={setToAddress}
          setIsAddressValid={setIsAddressValid}
          isAddressValid={isAddressValid}
        />

        <SendToken
          isAddressValid={isAddressValid}
          toAddress={toAddress}
          amount={amount}
          tokenId={tokenId}
        />
      </div>
    </section>
  );
}
