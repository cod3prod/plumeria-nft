"use client";

import { useState } from "react";
import MintHeader from "./_components/mint-header";
import MintForm from "./_components/mint-form";
import MintBatchForm from "./_components/mint-batch-form";
import TabSelector from "./_components/tab-selector";
import { MintFormType } from "@/enums/mint-form-type.enum";
import { useAccount } from "wagmi";

export default function Mint() {
  const { address } = useAccount();
  const [formType, setFormType] = useState<MintFormType>(MintFormType.SINGLE);

  if (!address) return null;

  return (
    <>
      <MintHeader />
      <TabSelector formType={formType} setFormType={setFormType} />
      {formType === MintFormType.SINGLE && <MintForm />}
      {formType === MintFormType.BATCH && <MintBatchForm />}
    </>
  );
}
