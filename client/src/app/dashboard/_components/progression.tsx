import { FaRunning } from "react-icons/fa";
import PremiumInfo from "./premium-info";

export default function Progression({ balances }: { balances: bigint[] }) {
  const temp = balances.filter((value) => {
    if (value) {
      return value;
    }
  });

  const progress =
    balances.length === 0 ? 0 : (temp.length / (balances.length - 1)) * 100;

  return (
    <div className="relative w-full flex flex-col justify-center items-center gap-4 mb-8">
      <p className="flex text-lg">
        <FaRunning className="text-purple-400 translate-y-1.5 mr-1" />{" "}
        Progression
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-purple-500 h-full rounded-full animate-pulse"
          style={{ width: `${progress}%` }}
        />
      </div>
      <PremiumInfo holding={balances[0]} />
    </div>
  );
}
