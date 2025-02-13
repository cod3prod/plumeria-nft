import { twMerge } from "tailwind-merge";

export default function TokenInputs({
  amounts,
  handleAmountChange,
  holdings,
}: {
  amounts: number[];
  handleAmountChange: (index: number, value: number) => void;
  holdings: number[];
}) {
  return (
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
              max={String(holdings[i + 1])}
              value={amounts[i]}
              onChange={(e) =>
                handleAmountChange(i, parseInt(e.target.value) || 0)
              }
              className={twMerge(
                "w-full p-2 sm:p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-center hover:border-pink-200 transition-all text-sm",
                holdings[i + 1] === 0 && "bg-gray-100 cursor-not-allowed"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
