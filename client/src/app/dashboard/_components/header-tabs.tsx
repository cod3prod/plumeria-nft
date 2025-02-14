"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function HeaderTabs({ balances }: { balances: bigint[] }) {
  const [canUpgrade, setCanUpgrade] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!balances || balances.length === 0) {
      setCanUpgrade(false);
      return;
    }

    let isUpgradeable = true;
    for (let i = 1; i < balances.length; i++) {
      if (Number(balances[i]) === 0) {
        isUpgradeable = false;
        break;
      }
    }
    setCanUpgrade(isUpgradeable);
  }, [balances]);

  return (
    <div className="mb-6">
      <div className="flex border-b border-gray-200">
        <button
          disabled={!canUpgrade}
          className={twMerge(
            "px-4 py-2 font-medium text-sm md:text-base border-b-2 border-b-transparent transition-colors duration-200 cursor-pointer",
            canUpgrade
              ? "hover:border-b-2 hover:border-blue-500 hover:text-blue-600 text-gray-500"
              : "cursor-not-allowed text-gray-300"
          )}
        >
          Upgrade
        </button>
        <button
          onClick={() => router.push("/dashboard/burn")}
          className="px-4 py-2 font-medium text-sm md:text-base text-gray-500 border-b-2 border-b-transparent hover:border-b-2 hover:border-blue-500 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
        >
          Burn
        </button>
      </div>
    </div>
  );
}
