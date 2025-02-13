"use client";

import TransferButton from "../transfer-button";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { wagmiContractConfig } from "@/configs/contracts";
import Loader from "@/components/ui/loader";

export default function SendToken({
  isAddressValid,
  toAddress,
  amount,
  tokenId
}: {
  isAddressValid: boolean;
  toAddress: string;
  amount: number;
  tokenId: number;
}) {
  const { address } = useAccount();
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (error) {
      // console.error("send-token debug", error);
      toast.error("Error in contract call");
    }
  }, [error]);

  useEffect(() => {
    if (isConfirmed) toast.success("Transfer Completed!");
  }, [isConfirmed]);

  const handleTransfer = () => {
    console.log("debug", isAddressValid);
    if (!isAddressValid) return;
    writeContract({
      ...wagmiContractConfig,
      functionName: "safeTransferFrom",
      args: [address, toAddress, tokenId, amount, "0x"],
    });
  };
  return (
    <>
      <TransferButton
        handleTransfer={handleTransfer}
        isPremium={false}
        isValid={!isAddressValid || amount < 1}
        label="Transfer Now"
      />
      {(isPending || isConfirming) && <Loader />}
    </>
  );
}
