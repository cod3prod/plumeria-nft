import Button from "@/components/ui/button";
import { SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

export default function NumberStepper({
  value,
  setValue,
  max,
  min,
  label,
  onLimit,
}: {
  value: number;
  setValue: (value: SetStateAction<number>) => void;
  max: number;
  min: number;
  label: string;
  onLimit?: boolean;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <p className="text-sm md:text-base font-bold">{label}</p>
      <div className="flex justify-center items-center gap-4 mb-4">
        <Button
          disabled={onLimit && value === min}
          onClick={() => setValue(value == min ? max : value - 1)}
          className={twMerge(
            "text-center text-xl font-bold w-6 shadow-none text-black bg-gray-100 hover:bg-gray-200 rounded-lg px-0 py-2 transition",
            onLimit && value === min && "cursor-not-allowed text-gray-400"
          )}
        >
          -
        </Button>
        <span className="inline-block w-6 text-center text-xl font-bold">
          {value}
        </span>
        <Button
          disabled={onLimit && value === max}
          onClick={() => setValue(value === max ? min : value + 1)}
          className={twMerge(
            "text-center text-xl font-bold w-6 shadow-none text-black bg-gray-100 hover:bg-gray-200 rounded-lg px-0 py-2 transition",
            onLimit && value === max && "cursor-not-allowed text-gray-400"
          )}
        >
          +
        </Button>
      </div>
    </div>
  );
}
