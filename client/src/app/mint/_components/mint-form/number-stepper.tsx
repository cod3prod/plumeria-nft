import Button from "@/components/ui/button";
import { SetStateAction } from "react";

export default function NumberStepper({
  value,
  setValue,
  max,
  min,
  label,
}: {
  value: number;
  setValue: (value: SetStateAction<number>) => void;
  max: number;
  min: number;
  label: string;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <p className="text-sm md:text-base font-bold">{label}</p>
      <div className="flex justify-center items-center gap-4 mb-4">
        <Button
          onClick={() => setValue(value == min ? max : value - 1)}
          className="text-center text-xl font-bold w-6 shadow-none text-black bg-gray-100 hover:bg-gray-200 rounded-lg px-0 py-2 transition"
        >
          -
        </Button>
        <span className="inline-block w-6 text-center text-xl font-bold">
          {value}
        </span>
        <Button
          onClick={() => setValue(value === max ? min : value + 1)}
          className="text-center text-xl font-bold w-6 shadow-none text-black bg-gray-100 hover:bg-gray-200 rounded-lg px-0 py-2 transition"
        >
          +
        </Button>
      </div>
    </div>
  );
}
