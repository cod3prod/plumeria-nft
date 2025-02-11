"use client";

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { ComponentPropsWithRef } from "react";

interface InputProps extends ComponentPropsWithRef<"input"> {
  label: string;
  placeholder?: string;
  id: string;
  value?: string | number;
  className?: string;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, id, label, value, required, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="text-sm md:text-base font-bold mb-2">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={twMerge(
            value ? "inserted transition-colors duration-500" : "",
            className
          )}
          value={value}
          placeholder={placeholder}
          required={required || false}
          {...rest}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
