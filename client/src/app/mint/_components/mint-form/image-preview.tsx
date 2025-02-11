import Image from "next/image";
import { images } from "@/data/image";

export default function ImagePreview({ tokenId }: { tokenId: number }) {
  return (
    <div className="relative w-full aspect-square rounded-2xl bg-gray-50 mb-8 overflow-hidden">
      <Image
        src={images[tokenId]}
        alt="NFT Preview"
        fill
        className="object-cover"
      />
    </div>
  );
}