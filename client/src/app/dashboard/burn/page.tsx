"use client";

import { useAccount, useReadContract } from "wagmi";
import BurnHeader from "./_components/burn-header";
import TableItem from "./_components/table-item";
import EmptyTable from "./_components/empty-table";
import { useSelector } from "react-redux";
import { wagmiContractConfig } from "@/configs/contracts";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/ui/loader";
import ConfirmingBurn from "./_components/confirming-burn";


export default function Page() {
  const { address } = useAccount();
  const { trash } = useSelector((state: RootState) => state.trash);
  const { data, error, isPending } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getBalances",
    args: [address],
    query: {
      enabled: !!address,
    },
  })

  const holdings = data ? (data as bigint[]).map((el: bigint) => Number(el)) : Array(17).fill(0);
 
  console.log(holdings);
  useEffect(()=>{
    if(error) {
      console.error("burn", error);
      toast.error("Error in contract call");
    }
  },[error])

  if (!address) return null;

  return (
    <>
      <BurnHeader />
      <section className="w-full max-w-xl mx-auto mb-20">
        <div className="bg-white rounded-lg shadow-xl p-8 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="pb-3 px-4 text-center">Token ID</th>
                <th className="pb-3 px-4 text-center">Amount</th>
                <th className="pb-3 px-4 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {trash.length > 0 ? (
                trash.map((item:TrashItem) => (
                  <TableItem key={item.tokenId} item={item} holding={holdings[item.tokenId]} />
                ))
              ) : (
                <EmptyTable />
              )}
            </tbody>
          </table>
          <ConfirmingBurn />
        </div>
      </section>
      {isPending && <Loader />}
    </>
  );
}
