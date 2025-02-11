import type { Metadata } from "next";
import Authenticated from "@/components/ui/authenticated";

export const metadata: Metadata = {
  title: "SEND",
  description: "MINT PLUMERIA NFT",
};

export default function SendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <article className="flex flex-col w-full justify-center items-center">
        {children}
      </article>
      <Authenticated />
    </>
  );
}
