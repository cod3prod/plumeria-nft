"use client";

import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import DeleteModal from "./delete-modal";

export default function DeleteButton({ tokenId }: { tokenId: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative flex justify-end">
        <div className="group/button">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-white p-2 bg-red-500 rounded-full hover:bg-red-600 transition cursor-pointer"
          >
            <FaTrash size={20} />
          </button>
          <span className="absolute -top-7 left-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/button:opacity-100 transition-opacity">
            Delete
          </span>
        </div>
      </div>
      {isModalOpen && (
        <DeleteModal tokenId={tokenId} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
}
