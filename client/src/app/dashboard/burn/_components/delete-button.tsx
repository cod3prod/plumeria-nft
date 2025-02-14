"use client";

import { deleteTrash } from "@/store/slices/trash-slice";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function DeleteButton({ item }: { item: TrashItem }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTrash({ tokenId: item.tokenId }));
    toast.success("Trash deleted!");
  }
  return (
    <button onClick={handleDelete} className="text-gray-700 hover:text-gray-500 transition duration-300 cursor-pointer">
      <FaTrash size={18} />
    </button>
  );
}
