import type { Metadata } from "next";
import Authenticated from "@/components/ui/authenticated";

export const metadata: Metadata = {
  title: "MINT",
  description: "MINT PLUMERIA NFT",
};

export default function MintLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <article className="flex flex-col justify-center items-center p-4">
        {children}
      </article>
      <Authenticated />
    </>
  );
}
