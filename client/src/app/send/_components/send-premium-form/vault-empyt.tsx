"use client";

import { useRouter } from "next/navigation";

export default function VaultEmpty() {
  const router = useRouter();

  return (
    <div className="text-center py-8 space-y-6">
      <div className="animate-pulse">
        <div className="text-6xl mb-4">🔒</div>
        <p className="text-gray-600 text-lg font-medium">
          Premium Token Vault Empty
        </p>
      </div>
      <button
        onClick={() => router.push("/mint")}
        className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-8 py-3 rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all cursor-pointer"
      >
        Get Your Flower
      </button>
    </div>
  );
}
