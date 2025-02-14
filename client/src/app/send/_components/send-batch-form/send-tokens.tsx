"use client";

import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import TransferButton from "../transfer-button";
import { wagmiContractConfig } from "@/configs/contracts";
import Loader from "@/components/ui/loader";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function SendTokens({
  isAddressValid,
  amounts,
  toAddress
}: {
  isAddressValid: boolean;
  amounts: number[];
  toAddress: string;
}) {
  const { address } = useAccount();
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleTransfer = () => {
    if (!isAddressValid) return;

    const tokenIds: number[] = [];
    const sendAmounts: number[] = [];

    amounts.forEach((amount, index) => {
      if (amount > 0) {
        tokenIds.push(index + 1);
        sendAmounts.push(amount);
      }
    });
    
    if(sendAmounts.length === 0 || (sendAmounts.length !== tokenIds.length)) return;
    
    // console.log("debug", tokenIds, sendAmounts);
    writeContract({
      ...wagmiContractConfig,
      functionName: "safeBatchTransferFrom",
      args: [
        address,
        toAddress,
        tokenIds,
        sendAmounts,
        "0x",
      ],
    });
  };

  useEffect(() => {
    if (error) {
      console.log("send-tokens", error);
      toast.error("Error in contract call");
    }
  }, [error]);

  useEffect(()=>{
    if(isConfirmed){
        toast.success("Transfer Completed!");
    }
  },[isConfirmed])

  return (
    <>
      <TransferButton
        isPremium={false}
        label={"Transfer Selected Tokens"}
        isValid={!isAddressValid || amounts.every((a) => a === 0)}
        handleTransfer={handleTransfer}
      />
      {(isPending || isConfirming) && <Loader />}
    </>
  );
}
