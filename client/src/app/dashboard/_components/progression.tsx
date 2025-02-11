import { FaRunning } from "react-icons/fa";

export default function Progression({ progress }: { progress: number }) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 mb-8">
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
    </div>
  );
}
