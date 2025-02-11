import { abi } from "@/data/abi";
import { Abi } from "viem";

const contractAdress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

if (!contractAdress)
  throw new Error("NEXT_PUBLIC_CONTRACT_ADDRESS is not defined");

if (!abi) throw new Error("ABI is not defined");

export const wagmiContractConfig = {
  address: contractAdress as `0x${string}`,
  abi: abi as Abi,
} as const;
