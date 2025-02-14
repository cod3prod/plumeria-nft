"use client";

import { useEffect, useState } from "react";
import Result from "../result";
import Button from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import Loader from "@/components/ui/loader";
import ImagePreview from "./image-preview";
import NumberStepper from "@/components/ui/number-stepper";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { wagmiContractConfig } from "@/configs/contracts";
import TokenPrice from "./token-price";
import TotalSupply from "./total-supply";
import { toast } from "react-toastify";

export default function MintForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenId, setTokenId] = useState(1);
  const [amount, setAmount] = useState(0);
  const [isFull, setIsFull] = useState(false);

  const { address, chainId } = useAccount();
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    setIsModalOpen(isConfirmed);
  }, [isConfirmed]);

  const handleMint = async () => {
    console.log("click");
    if (!address || !tokenId || !amount) {
      // alert("debug");
      return;
    }

    if (chainId !== 11155111) {
      // Sepolia의 체인 ID는 11155111
      toast.error("Please use Sepolia chain");
      return;
    }
    console.log("mint", address, tokenId, amount);
    writeContract({
      ...wagmiContractConfig,
      functionName: "mint",
      args: [tokenId, amount],
    });
  };

  useEffect(() => {
    if (error) {
      console.error("mint", error);
      toast.error("Error in contract call");
    }
  }, [error]);

  if (!address) return null;
  const disable = tokenId === 0 || amount === 0 || isPending || isFull;

  return (
    <>
      <section className="w-full max-w-md mx-auto mb-20">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <ImagePreview tokenId={tokenId} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <TokenPrice />
            <TotalSupply tokenId={tokenId} setIsFull={setIsFull} />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <NumberStepper
              value={tokenId}
              setValue={setTokenId}
              min={1}
              max={16}
              label="NFT ID"
            />
            <NumberStepper
              value={amount}
              setValue={setAmount}
              min={0}
              max={10}
              label="AMOUNT"
            />
          </div>

          <Button
            disabled={disable}
            onClick={handleMint}
            className={twMerge(
              "w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 px-8 rounded-xl transition transform",
              disable
                ? "opacity-50 cursor-not-allowed"
                : "hover:-translate-y-1 hover:opacity-90"
            )}
          >
            Mint Now
          </Button>
        </div>
      </section>

      <Result
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mintedItems={[{ tokenId: tokenId, amount: amount }]}
      />
      {isPending || (isConfirming && <Loader />)}
    </>
  );
}
