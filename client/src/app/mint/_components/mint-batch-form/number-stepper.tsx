import { twMerge } from "tailwind-merge";

export default function NumberStepper({
  amount,
  tokenId,
  handleIncrement,
  handleDecrement,
}: {
  amount: number;
  tokenId: number;
  handleIncrement: (id: number) => void;
  handleDecrement: (id: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-1 md:gap-4">
      <button
        className={twMerge(
          "w-8 h-8 rounded-md flex items-center justify-center cursor-pointer border-1 transition-colors duration-200",
          amount === 0
            ? "border-gray-200 text-gray-300 cursor-not-allowed"
            : "border-blue-500 text-blue-500 hover:bg-blue-50"
        )}
        onClick={() => handleDecrement(tokenId)}
        disabled={amount === 0}
      >
        <span className="text-xl font-light">-</span>
      </button>

      <span className="text-lg font-semibold text-gray-700 w-8 text-center">
        {amount}
      </span>

      <button
        className={twMerge(
          "w-8 h-8 rounded-md flex items-center justify-center cursor-pointer border-1 transition-colors duration-200",
          amount === 10
            ? "border-gray-200 text-gray-300 cursor-not-allowed"
            : "border-green-500 text-green-500 hover:bg-green-50"
        )}
        onClick={() => handleIncrement(tokenId)}
        disabled={amount === 10}
      >
        <span className="text-xl font-light">+</span>
      </button>
    </div>
  );
}
