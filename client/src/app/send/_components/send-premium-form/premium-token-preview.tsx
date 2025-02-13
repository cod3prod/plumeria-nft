import Image from "next/image";
import { images } from "@/data/image";

export default function PremiumTokenPreview() {
  return (
    <div className="mb-8 relative group">
      <div className="absolute inset-0 bg-amber-50/30 rounded-xl transform group-hover:scale-[1.02] transition-all" />
      <div className="relative w-full aspect-square rounded-2xl bg-gray-50 mb-8 overflow-hidden">
        <Image
          src={images[0]}
          alt="NFT Preview"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1 text-sm rounded-full flex items-center gap-2">
        <span className="text-amber-200">✦</span>
        Premium Tier
        <span className="text-amber-200">✦</span>
      </div>
    </div>
  );
}
