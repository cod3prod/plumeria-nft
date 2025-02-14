import NumberStepper from "@/components/ui/number-stepper";
import { wagmiContractConfig } from "@/configs/contracts";
import { Dispatch, SetStateAction } from "react";
import { useAccount, useReadContract } from "wagmi";

export default function TokenIdSelector({
  tokenId,
  setTokenId,
  amount,
  setAmount,
}: {
  tokenId: number;
  setTokenId: Dispatch<SetStateAction<number>>;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
}) {
  const { address } = useAccount();
  const { data } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getBalances",
    args: [address],
  });

  const balances = (data || []) as bigint[];

  console.log("debug", balances);
  const holding  = balances ? Number(balances[tokenId]) : 0;

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <NumberStepper
        value={tokenId}
        setValue={setTokenId}
        min={1}
        max={16}
        label="Token ID"
      />
      <NumberStepper
        value={amount}
        setValue={setAmount}
        min={0}
        max={Math.min(10, holding)}
        label="Amount"
        onLimit={true}
      />
    </div>
  );
}
