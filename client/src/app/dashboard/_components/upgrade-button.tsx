"use client";

import Loader from "@/components/ui/loader";
import { wagmiContractConfig } from "@/configs/contracts";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export default function UpgradeButton({ canUpgrade }: { canUpgrade: boolean }) {
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (error) {
      toast.error("Error in contract call");
    }
  }, [error]);

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Upgrade Completed!");
    }
  }, [isConfirmed]);


  const handleUpgrade = () => {
    if (!canUpgrade) return;
    writeContract({
      ...wagmiContractConfig,
      functionName: "upgrade",
      args: [],
    });
  };

  return (
    <>
      <button
        disabled={!canUpgrade}
        onClick={handleUpgrade}
        className={twMerge(
          "px-4 py-2 font-medium text-sm md:text-base border-b-2 border-b-transparent transition-colors duration-200 cursor-pointer",
          canUpgrade
            ? "hover:border-b-2 hover:border-blue-500 hover:text-blue-600 text-gray-500"
            : "cursor-not-allowed text-gray-300"
        )}
      >
        Upgrade
      </button>
      {(isPending || isConfirming) && <Loader />}
    </>
  );
}
