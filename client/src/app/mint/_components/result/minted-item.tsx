import { images } from "@/data/image";
import { json } from "@/data/json";
import Image from "next/image";

export default function MintedItem({
  amount,
  tokenId,
}: {
  amount: number;
  tokenId: number;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <p className="absolute top-2 right-4 text-base md:text-xl font-semibold bg-white bg-opacity-50 px-2 md:px-4 rounded-full">
          x{amount}
        </p>
        <Image
          src={images[tokenId]}
          alt={json[tokenId].name}
          className="grow-1 h-auto"
        />
      </div>
      <p className="text-xl md:text-2xl font-semibold mt-4">
        {json[tokenId].name}
      </p>
      <p className="text-lg md:text-xl mt-2">{json[tokenId].description}</p>
    </div>
  );
}
