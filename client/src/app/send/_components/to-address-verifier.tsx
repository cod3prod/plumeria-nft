import {
  isContractAddress,
  isValidAddress,
  supportERC1155,
} from "@/utils/ethers";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

export default function ToAddressVerifier({
  toAddress,
  setToAddress,
  setIsAddressValid,
  isAddressValid,
}: {
  toAddress: string;
  setToAddress: Dispatch<SetStateAction<string>>;
  setIsAddressValid: Dispatch<SetStateAction<boolean>>;
  isAddressValid: boolean;
}) {
  const handleVerify = async () => {
    if (!toAddress) {
      toast("Type some address");
      setIsAddressValid(false);
      return;
    }

    if (!isValidAddress(toAddress)) {
      toast.error("Wrong Address!");
      setIsAddressValid(false);
      return;
    }

    const isCA = await isContractAddress(toAddress);
    if (isCA) {
      const isERC1155 = await supportERC1155(toAddress);
      if (isERC1155) {
        setIsAddressValid(true);
      } else {
        setIsAddressValid(false);
        toast.error("This address cannot receive ERC-1155");
      }
    } else {
      setIsAddressValid(true);
    }
  };

  return (
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Recipient Address
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={toAddress}
          onChange={(e) => {
            setToAddress(e.target.value);
            setIsAddressValid(false);
          }}
          className="flex-1 p-3 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
          placeholder="0x..."
        />
        <button
          onClick={handleVerify}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors text-sm sm:text-base cursor-pointer"
        >
          Verify
        </button>
      </div>
      {isAddressValid && (
        <p className="text-sm text-green-500 mt-2">✓ Valid address</p>
      )}
    </div>
  );
}
