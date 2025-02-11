import Image from "next/image";
import { images } from "@/data/image";
import TokenInfo from "./token-info";

export default function ImagePreview({
  tokenId,
  data,
}: {
  tokenId: number;
  data:
    | {
        error?: undefined;
        result: unknown;
        status: "success";
      }
    | {
        error: Error;
        result?: undefined;
        status: "failure";
      }
    | undefined;
}) {


  return (
    <div className="group relative bg-gray-100 border border-gray-200 rounded-lg w-full aspect-square flex items-center justify-center mb-4 overflow-hidden">
      <Image
        src={images[tokenId]}
        alt="NFT Preview"
        fill
        className="object-cover aspect-square"
      />
      <TokenInfo tokenId={tokenId} result={data?.result as number | undefined} />
    </div>
  );
}
