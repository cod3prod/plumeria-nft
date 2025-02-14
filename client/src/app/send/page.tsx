"use client";

import { useState } from "react";
import SendBatchForm from "./_components/send-batch-form";
import SendHeader from "./_components/send-header";
import TabSelector from "./_components/tab-selector";
import { SendFormType } from "@/enums/send-form-type.enum";
import SendForm from "./_components/send-form";
import SendPremiumForm from "./_components/send-premium-form";
import { useAccount } from "wagmi";

export default function Page() {
  const { address } = useAccount();
  const [formType, setFormType] = useState<SendFormType>(SendFormType.SINGLE);

  if(!address) return null;
  return (
    <>
      <SendHeader />
      <TabSelector formType={formType} setFormType={setFormType} />
      {formType === SendFormType.SINGLE && <SendForm />}
      {formType === SendFormType.BATCH && <SendBatchForm />}
      {formType === SendFormType.PREMIUM && <SendPremiumForm />}
    </>
  );
}
