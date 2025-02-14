"use client";

import React, { useEffect, useState } from "react";
import NumberStepper from "./number-stepper";
import ImagePreview from "./image-preview";
import Button from "@/components/ui/button";
import Result from "../result";
import Loader from "@/components/ui/loader";
import { twMerge } from "tailwind-merge";
import {
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { wagmiContractConfig } from "@/configs/contracts";
import { toast } from "react-toastify";

type TokenState = {
  [key: number]: number;
};

export default function MintBatchForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [amounts, setAmounts] = useState<number[]>([]);

  const contracts = Array(16)
    .fill(null)
    .map((_, index) => ({
      ...wagmiContractConfig,
      functionName: "totalSupply",
      args: [index + 1] as const,
    }));

  const result = useReadContracts({
    contracts,
  });

  const { data: totalSupplies, isPending } = result;

  const {
    data: hash,
    error,
    isPending: isLoading,
    writeContract,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (error) {
      toast.error("Error in contract call");
    }
  }, [error]);

  useEffect(() => {
    setIsModalOpen(isConfirmed);
  }, [isConfirmed]);

  const initialState: TokenState = {};
  for (let i = 1; i <= 16; i++) {
    initialState[i] = 0;
  }

  const [tokenState, setTokenState] = useState<TokenState>(initialState);

  const handleIncrement = (id: number) => {
    setTokenState((prev) => ({
      ...prev,
      [id]: Math.min(prev[id] + 1, 10),
    }));
  };

  const handleDecrement = (id: number) => {
    setTokenState((prev) => ({
      ...prev,
      [id]: Math.max(prev[id] - 1, 0),
    }));
  };

  const handleMint = async () => {
    if (disable || !totalSupplies) return;

    const tooMuchMint = Object.values(tokenState)
      .map((amount, index) => {
        const totalSupply = totalSupplies[index];
        if (totalSupply.status === "success") {
          return amount + Number(totalSupply.result);
        }
        return amount;
      })
      .some((amount) => amount > 5000);

    if (tooMuchMint) {
      toast.error("Too much mint");
      return;
    }

    const tokenIds: number[] = [];
    const amounts: number[] = [];

    Object.entries(tokenState).forEach(([id, amount]) => {
      if (amount > 0) {
        tokenIds.push(Number(id));
        amounts.push(amount);
      }
    });

    writeContract({
      ...wagmiContractConfig,
      functionName: "mintBatch",
      args: [tokenIds, amounts],
    });

    setAmounts(amounts);
    setTokenIds(tokenIds);
  };

  const disable = Object.values(tokenState).every((amount) => amount === 0);

  return (
    <>
      <section className="w-full">
        <div className="bg-white p-4 rounded-lg max-w-5xl mx-auto mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(16)].map((_, index) => {
              const id = index + 1;
              return (
                <div
                  key={id}
                  className="bg-gray-100 rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
                >
                  <ImagePreview
                    tokenId={id}
                    data={totalSupplies && totalSupplies[index]}
                  />
                  <NumberStepper
                    amount={tokenState[id]}
                    tokenId={id}
                    handleDecrement={handleDecrement}
                    handleIncrement={handleIncrement}
                  />
                </div>
              );
            })}
          </div>
          <Button
            disabled={disable}
            onClick={handleMint}
            className={twMerge(
              "mt-10 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 px-8 rounded-xl transition transform",
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
        mintedItems={tokenIds.map((tokenId, index) => ({
          tokenId,
          amount: amounts[index],
        }))}
      />
      {isPending || isLoading || (isConfirming && <Loader />)}
    </>
  );
}
