"use client";

import Button from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { wagmiContractConfig } from "@/configs/contracts";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

export default function ConfirmingBurn() {
  const { trash } = useSelector((state: RootState) => state.trash);
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (error) {
      console.error("confirming burn", error);
      toast.error("Error in contract call");
    }
  }, [error]);

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Burn Completed!");
    }
  }, [isConfirmed]);

  const disabled = trash.length === 0;

  const handleDelete = () => {
    if(trash.legnth === 0) {
        return;
    } else if( trash.length === 1) {
        writeContract({
            ...wagmiContractConfig,
            functionName: "burn",
            args: [trash[0].tokenId, trash[0].amount],
        });
    } else {
        const tokenIds = [];
        const amounts = [];
        for (let i = 0; i < trash.length; i++) {
            tokenIds.push(trash[i].tokenId);
            amounts.push(trash[i].amount);
        }
        // console.log("debug", tokenIds, amounts);
        writeContract({
            ...wagmiContractConfig,
            functionName: "burnBatch",
            args: [tokenIds, amounts],
        });
    }
  }
  return (
    <>
      <Button
        disabled={disabled || isConfirming || isPending}
        onClick={handleDelete}
        className={twMerge(
          "w-full bg-green-500 hover:bg-green-400 mt-10",
          disabled ? "cursor-not-allowed bg-gray-300 hover:bg-gray-300" : ""
        )}
      >
        Confirm
      </Button>
      {(isConfirming || isPending) && <Loader />}
    </>
  );
}
