import Loader from "@/components/ui/loader";
import { wagmiContractConfig } from "@/configs/contracts";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import TransferButton from "../transfer-button";

export default function SendPremiumToken({
  isAddressValid,
  toAddress,
}: {
  isAddressValid: boolean;
  toAddress: string;
}) {
  const { address } = useAccount();
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (error) {
      console.error("Error in contract call", error);
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
      args: [address, toAddress, 0, 1, "0x"],
    });
  };

  useEffect(() => {
    if (error) {
      toast.error("Error in contract call");
    }
  }, [error]);
  
  useEffect(() => {
    if (isConfirmed) {
      toast.success("Transfer Completed!");
    }
  }, [isConfirmed]);

  return (
    <>
      <TransferButton
        label="Transfer Now"
        isPremium={true}
        handleTransfer={handleTransfer}
        isValid={isAddressValid}
      />
      {(isPending || isConfirming) && <Loader />}
    </>
  );
}
