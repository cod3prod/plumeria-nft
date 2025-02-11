"use client";

import { SendFormType } from "@/enums/send-form-type.enum";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

export default function TabSelector({
  formType,
  setFormType,
}: {
  formType: SendFormType;
  setFormType: Dispatch<SetStateAction<SendFormType>>;
}) {
  return (
    <div className="flex p-1 space-x-1 bg-gray-200 rounded-t-lg">
      <button
        className={twMerge(
          "flex-1 py-2 px-4 rounded-md text-sm font-medium cursor-pointer",
          formType === SendFormType.PREMIUM
            ? "bg-white text-gray-900 shadow"
            : "text-gray-500 hover:bg-gray-100",
          "transition-colors duration-200"
        )}
        onClick={() => setFormType(SendFormType.PREMIUM)}
      >
        Premium
      </button>
      <button
        className={twMerge(
          "flex-1 py-2 px-4 rounded-md text-sm font-medium cursor-pointer",
          formType === SendFormType.SINGLE
            ? "bg-white text-gray-900 shadow"
            : "text-gray-500 hover:bg-gray-100",
          "transition-colors duration-200"
        )}
        onClick={() => setFormType(SendFormType.SINGLE)}
      >
        Single
      </button>
      <button
        className={twMerge(
          "flex-1 py-2 px-4 rounded-md text-sm font-medium cursor-pointer",
          formType === SendFormType.BATCH
            ? "bg-white text-gray-900 shadow"
            : "text-gray-500 hover:bg-gray-100",
          "transition-colors duration-200"
        )}
        onClick={() => setFormType(SendFormType.BATCH)}
      >
        Batch
      </button>
    </div>
  );
}
