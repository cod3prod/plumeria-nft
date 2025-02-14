import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BURN",
  description: "MINT PLUMERIA NFT",
};

export default function BurnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
