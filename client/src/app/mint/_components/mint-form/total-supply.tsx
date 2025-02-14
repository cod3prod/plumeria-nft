"use client";

import { wagmiContractConfig } from "@/configs/contracts";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useReadContract } from "wagmi";

export default function TotalSupply({
  tokenId,
  setIsFull,
}: {
  tokenId: number;
  setIsFull: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    data: totalSupply,
    error,
    isPending,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "totalSupply",
    args: [tokenId],
  });

  useEffect(() => {
    if (error) {
      console.error("total supply", error);
      toast.error("Error in contract call")
    };

    if (totalSupply === 5000 || error || isPending) {
      setIsFull(true);
    } else {
      setIsFull(false);
    }
  }, [totalSupply, error, isPending, setIsFull]);

  const formatedSupply = (totalSupply || (0 as number)).toLocaleString();

  return (
    <div className="bg-gray-50 rounded-xl p-4 justify-center items-center flex flex-col">
      {isPending ? (
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-pink-500" />
      ) : (
        <>
          <p className="text-xl font-bold text-pink-500">{`${formatedSupply} / 5,000`}</p>
          <p className="text-gray-600">Minted</p>
        </>
      )}
    </div>
  );
}
