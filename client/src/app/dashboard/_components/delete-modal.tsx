"use client";

import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { addTrash } from "@/store/slices/trash-slice";
import { SetStateAction, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
export default function DeleteModal({
  tokenId,
  setIsModalOpen,
}: {
  tokenId: number;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { trash } = useSelector((state: RootState) => state.trash);
  const dispatch = useDispatch();
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleThrow = () => {
    const hasTokenId = trash.some(
      (item: TrashItem) => item.tokenId === tokenId
    );
    if (!hasTokenId) {
      dispatch(addTrash({ tokenId, amount: 1 }));
      toast.success("Flower thrown!");
    } else {
      toast("Flower has already been thrown.");
    }
    handleClose();
  };

  return (
    <Modal title="Throw your flower" onClose={handleClose}>
      <Button onClick={handleThrow} className="w-full mt-5">
        Confirm
      </Button>
    </Modal>
  );
}
