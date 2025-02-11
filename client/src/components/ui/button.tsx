import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export default function Button(props: ComponentPropsWithoutRef<"button">) {
  const { children, className, ...rest } = props;
  return (
    <button
      className={twMerge(
        "cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
