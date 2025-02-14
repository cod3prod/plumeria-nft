"use client";

import DashboardHeader from "./_components/dashboard-header";
import NftCard from "./_components/nft-card";
import Loader from "@/components/ui/loader";
import Progression from "./_components/progression";
import { useAccount, useReadContract } from "wagmi";
import { wagmiContractConfig } from "@/configs/contracts";
import { useEffect} from "react";
import { toast } from "react-toastify";
import HeaderTabs from "./_components/header-tabs";

export default function Page() {

  const { address } = useAccount();

  const { data, error, isPending } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getBalances",
    args: [address],
  });

  const balances = (data || []) as bigint[];
  // console.log("debug balances", balances);
  const temp = balances.filter((value) => {
    if (value) {
      return value;
    }
  });

  const progress =
    balances.length === 0 ? 0 : (temp.length / (balances.length - 1)) * 100;

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Error in contract call");
    }
  }, [error]);

  if (!address) return null;

  return (
    <>
      <DashboardHeader />
      <div className="w-full max-w-lg flex flex-col items-center">
        <HeaderTabs balances={balances} />
        <Progression progress={progress} />
        <div className="w-full grid grid-cols-4 gap-4">
          {balances.map((el, idx) => {
            if (idx === 0) return;
            return (
              <NftCard key={idx - 1} index={idx - 1} balance={Number(el)} />
            );
          })}
        </div>
      </div>
      {isPending && <Loader />}
    </>
  );
}
