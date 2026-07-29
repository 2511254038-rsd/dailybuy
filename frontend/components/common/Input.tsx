import { InputHTMLAttributes } from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  register: UseFormRegister<any>;
  name: string;
}

export default function Input({ label, error, register, name, ...props }: InputProps) {
  return (
    <div>
      <input
        {...register(name)}
        {...props}
        className="w-full border rounded px-3 py-2"
        placeholder={label || props.placeholder}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}