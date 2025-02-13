import { twMerge } from "tailwind-merge";

export default function TransferButton({
  isValid,
  isPremium,
  label,
  handleTransfer,
}: {
  isValid: boolean;
  isPremium: boolean;
  label: string;
  handleTransfer: () => void;
}) {
  return (
    <>
      {!isPremium ? (
        <button
          onClick={handleTransfer}
          className={twMerge(
            "w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 sm:py-4 px-6 rounded-xl transition cursor-pointer",
            isValid
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-90 hover:-translate-y-0.5"
          )}
        >
          {label}
        </button>
      ) : (
        <button
          onClick={handleTransfer}
          className={twMerge(
            "w-full bg-gradient-to-br from-amber-500 via-amber-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl transition-all",
            "hover:shadow-xl hover:scale-[1.02] cursor-pointer",
            "flex items-center justify-center gap-3",
            !isValid ? "opacity-50 cursor-not-allowed grayscale" : ""
          )}
        >
          <span className="text-xl">🚀</span>
          Transfer Now
          <span className="text-xl">✨</span>
        </button>
      )}
    </>
  );
}
