"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import ImagePreview from "@/app/mint/_components/mint-form/image-preview";

export default function SendPremiumForm() {
  const [toAddress, setToAddress] = useState<string>("");
  const [isAddressValid, setIsAddressValid] = useState<boolean>(false);
  const [hasPrimeToken, setHasPrimeToken] = useState<boolean>(true); // 임시 상태

  return (
    <section className="w-full max-w-md mx-auto mb-20">
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 relative overflow-hidden border-2 border-amber-100">
        {/* 프리미엄 배지 */}
        <div className="absolute top-3 -right-8 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-1 text-xs font-bold rotate-45 shadow-md">
          PREMIUM TOKEN
        </div>

        <h3 className="text-center text-xl font-bold text-gray-900 mb-6">
          <span className="bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
            Prime Transfer
          </span>
        </h3>

        {hasPrimeToken ? (
          <>
            {/* 토큰 프리뷰 섹션 */}
            <div className="mb-8 relative group">
              <div className="absolute inset-0 bg-amber-50/30 rounded-xl transform group-hover:scale-[1.02] transition-all" />
              <ImagePreview tokenId={0} />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1 text-sm rounded-full flex items-center gap-2">
                <span className="text-amber-200">✦</span>
                Premium Tier
                <span className="text-amber-200">✦</span>
              </div>
            </div>

            {/* 주소 입력 섹션 */}
            <div className="mb-8 space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Address
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                  className="flex-1 p-3 border-2 border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm sm:text-base placeholder-amber-300"
                  placeholder="Prime token holder address"
                />
                <button
                  onClick={() => setIsAddressValid(true)}
                  className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors text-sm sm:text-base flex items-center gap-2"
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

            {/* 특별 전송 버튼 */}
            <button
              className={twMerge(
                "w-full bg-gradient-to-br from-amber-500 via-amber-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl transition-all",
                "hover:shadow-xl hover:scale-[1.02]",
                "flex items-center justify-center gap-3",
                !isAddressValid ? "opacity-50 cursor-not-allowed grayscale" : ""
              )}
            >
              <span className="text-xl">🚀</span>
              Initiate Premium Transfer
              <span className="text-xl">✨</span>
            </button>
          </>
        ) : (
          <div className="text-center py-8 space-y-6">
            {/* 프라임 토큰 없을 때 */}
            <div className="animate-pulse">
              <div className="text-6xl mb-4">🔒</div>
              <p className="text-gray-600 text-lg font-medium">
                Premium Token Vault Empty
              </p>
            </div>
            <button
              className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-8 py-3 rounded-xl
                       hover:from-amber-500 hover:to-amber-600 transition-all"
            >
              Unlock Premium Status
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
