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
  isAddressValid,
  setIsAddressValid,
}: {
  toAddress: string;
  setToAddress: Dispatch<SetStateAction<string>>;
  isAddressValid: boolean;
  setIsAddressValid: Dispatch<SetStateAction<boolean>>;
}) {
  const handleVerify = async () => {
    if (!toAddress) {
      toast("입력해주세요!");
      setIsAddressValid(false);
      return;
    }

    if (!isValidAddress(toAddress)) {
      toast.error("잘못된 주소입니다!");
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
        toast.error("ERC-1155 지원하지 않는 주소입니다!");
      }
    } else {
      setIsAddressValid(true);
    }
  };

  return (
    <div className="mb-8 space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Recipient Address
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          className="flex-1 p-3 border-2 border-amber-200 outline-none rounded-lg focus:ring-2 focus:ring-amber-500 text-sm sm:text-base placeholder-amber-300"
          placeholder="Prime token holder address"
        />
        <button
          onClick={handleVerify}
          className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors text-sm sm:text-base flex items-center gap-2 cursor-pointer"
        >
          <span>Verify</span>
          <span className="text-lg">↗</span>
        </button>
      </div>
      {isAddressValid && (
        <p className="text-sm text-emerald-500 font-medium mt-2 flex items-center gap-2">
          <span className="text-lg">✓</span>
          Prime-ready address verified
        </p>
      )}
    </div>
  );
}
