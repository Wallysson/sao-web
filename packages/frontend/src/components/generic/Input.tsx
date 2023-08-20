import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  error?: string | null;
  variant?: 'standard' | 'outlined';
}

export function Input({
  variant = 'standard',
  error = null,
  register,
  ...props
}: InputFieldProps) {
  const inputClasses = `mt-1 p-2 w-full border ${
    variant === 'outlined'
      ? 'rounded border-gray-300'
      : 'rounded-md border-gray-300'
  } ${error ? 'border-red-500' : ''}`;

  return (
    <div>
      <input className={inputClasses} {...props} {...register} />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
