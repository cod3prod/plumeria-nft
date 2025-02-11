import Image from "next/image";
import { images } from "@/data/image";

export default function NftCard({
  index,
  balance,
}: {
  index: number;
  balance: number;
}) {
  return (
    <div className="relative aspect-square w-full">
      {balance > 0 ? (
        <Image
          src={images[index + 1]}
          alt={`puzzle ${index + 1}`}
          className="object-cover"
        />
      ) : (
        <div className="bg-black/50 aspect-square w-full animate-pulse"></div>
      )}
    </div>
  );
}
