"use client";

import DashboardHeader from "./_components/dashboard-header";
import NftCard from "./_components/nft-card";
import Loader from "@/components/ui/loader";
import Progression from "./_components/progression";
import { useAccount, useReadContract } from "wagmi";
import { wagmiContractConfig } from "@/configs/contracts";
import { useEffect } from "react";
import { toast } from "react-toastify";
import HeaderTabs from "./_components/header-tabs";
import { useDispatch, useSelector } from "react-redux";
import { setBalances } from "@/store/slices/balances-slice";

export default function Page() {
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { balances } = useSelector((state: RootState) => state.balances);

  const { data, error, isPending } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getBalances",
    args: [address],
  });

  useEffect(() => {
    const newBalances = (data || []) as bigint[];
    const convertedBalances = newBalances.map(balance => Number(balance));
    dispatch(setBalances(convertedBalances));
  }, [dispatch, data]);

  useEffect(() => {
    if (error) {
      toast.error("Error in contract call");
    }
  }, [error]);

  if (!address) return null;

  return (
    <>
      <DashboardHeader />
      <div className="w-full max-w-lg flex flex-col items-center">
        <HeaderTabs balances={balances} />
        <Progression balances={balances} />
        <div className="w-full grid grid-cols-4 gap-4">
          {(balances as bigint[]).map((el, idx) => {
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
