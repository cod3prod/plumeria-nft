"use client";

import { MintFormType } from "@/enums/mint-form-type.enum";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

export default function TabSelector({
  formType,
  setFormType,
}: {
  formType: MintFormType;
  setFormType: Dispatch<SetStateAction<MintFormType>>;
}) {
  return (
    <div className="flex p-1 space-x-1 bg-gray-200 rounded-t-lg">
      <button
        className={twMerge(
          "flex-1 py-2 px-4 rounded-md text-sm font-medium cursor-pointer",
          formType === MintFormType.SINGLE
            ? "bg-white text-gray-900 shadow"
            : "text-gray-500 hover:bg-gray-100",
          "transition-colors duration-200"
        )}
        onClick={() => setFormType(MintFormType.SINGLE)}
      >
        Single
      </button>
      <button
        className={twMerge(
          "flex-1 py-2 px-4 rounded-md text-sm font-medium cursor-pointer",
          formType === MintFormType.BATCH
            ? "bg-white text-gray-900 shadow"
            : "text-gray-500 hover:bg-gray-100",
          "transition-colors duration-200"
        )}
        onClick={() => setFormType(MintFormType.BATCH)}
      >
        Batch
      </button>
    </div>
  );
}
