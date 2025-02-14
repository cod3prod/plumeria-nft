"use client";

import { deleteTrash, updateTrash } from "@/store/slices/trash-slice";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";

export default function NumberStepper({
  item,
  holding,
}: {
  item: TrashItem;
  holding: number;
}) {
  const dispatch = useDispatch();

  const handleDecrement = () => {
    if (item.amount === 1) {
      dispatch(deleteTrash({ tokenId: item.tokenId }));
    } else {
      dispatch(updateTrash({ tokenId: item.tokenId, amount: -1 }));
    }
  };

  const handleIncrement = () => {
    if (item.amount === holding) return;
    dispatch(updateTrash({ tokenId: item.tokenId, amount: 1 }));
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition cursor-pointer"
        onClick={handleDecrement}
      >
        -
      </button>
      <span className="w-12 text-center">{item.amount}</span>
      <button
        className={twMerge(
          "px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition cursor-pointer",
          item.amount === holding && "cursor-not-allowed text-gray-400"
        )}
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
}
