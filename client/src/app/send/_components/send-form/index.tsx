"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import ImagePreview from "@/app/mint/_components/mint-form/image-preview";
import NumberStepper from "@/app/mint/_components/mint-form/number-stepper";

export default function SendForm() {
  const [toAddress, setToAddress] = useState<string>("");
  const [tokenId, setTokenId] = useState<number>(1);
  const [amount, setAmount] = useState<number>(1);
  const [isAddressValid, setIsAddressValid] = useState<boolean>(false);

  const handleTransfer = () => {
    /* 전송 로직 */
  };

  return (
    <section className="w-full max-w-md mx-auto mb-20">
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
        <h3 className="text-center text-xl font-bold text-gray-900 mb-6">
          Single Transfer
        </h3>

        {/* 이미지 프리뷰 */}
        <ImagePreview tokenId={tokenId} />

        {/* 토큰 ID 선택기 */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <NumberStepper
            value={tokenId}
            setValue={setTokenId}
            min={1}
            max={16}
            label="Token ID"

          />
          <NumberStepper
            value={amount}
            setValue={setAmount}
            min={1}
            max={10}
            label="Amount"

          />
        </div>

        {/* 주소 입력 섹션 */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Address
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
              placeholder="0x..."
            />
            <button
              onClick={() => setIsAddressValid(true)}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors text-sm sm:text-base"
            >
              Verify
            </button>
          </div>
          {isAddressValid && (
            <p className="text-sm text-green-500 mt-2">✓ Valid address</p>
          )}
        </div>

        {/* 전송 버튼 */}
        <button
          onClick={handleTransfer}
          disabled={!isAddressValid || amount < 1}
          className={twMerge(
            "w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 sm:py-4 px-6 rounded-xl transition",
            !isAddressValid || amount < 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-90 hover:-translate-y-0.5"
          )}
        >
          Transfer Now
        </button>
      </div>
    </section>
  );
}