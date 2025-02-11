"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function BatchTransfer() {
  const [toAddress, setToAddress] = useState<string>("");
  const [amounts, setAmounts] = useState<number[]>(Array(16).fill(0));
  const [isAddressValid, setIsAddressValid] = useState<boolean>(false);

  const handleAmountChange = (index: number, value: number) => {
    const newAmounts = [...amounts];
    newAmounts[index] = value >= 0 ? value : 0;
    setAmounts(newAmounts);
  };

  return (
    <section className="w-full max-w-md mx-auto mb-20">
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
        <h3 className="text-center text-xl font-bold text-gray-900 mb-6">Batch Transfer</h3>

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

        {/* 토큰 입력 그리드 */}
        <div className="mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 16 }, (_, i) => (
              <div key={i} className="space-y-1">
                <label className="block text-xs sm:text-sm text-gray-600 font-medium">
                  #{i + 1}
                </label>
                <input
                  type="number"
                  min="0"
                  value={amounts[i]}
                  onChange={(e) => handleAmountChange(i, parseInt(e.target.value) || 0)}
                  className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-lg 
                            focus:ring-2 focus:ring-pink-500 text-center
                            hover:border-pink-200 transition-all text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 전송 버튼 */}
        <button
          className={twMerge(
            "w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 sm:py-4 px-6 rounded-xl transition",
            !isAddressValid || amounts.every(a => a === 0)
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-90 hover:-translate-y-0.5"
          )}
        >
          Transfer Selected Tokens
        </button>
      </div>
    </section>
  );
}