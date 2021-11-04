import React, {
  ChangeEventHandler,
  DetailedHTMLProps,
  InputHTMLAttributes,
  LegacyRef,
} from 'react';
import { HiExclamationCircle } from 'react-icons/hi';

export interface TextFieldProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'value' | 'onChange'
  > {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: string;
  inputRef?: LegacyRef<HTMLInputElement>;
}

export default function TextField({
  id,
  label,
  value,
  onChange,
  title,
  required,
  pattern,
  error,
  inputRef,
  className,
  ...restProps
}: TextFieldProps) {
  const isError = Boolean(error);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative mt-1">
        <input
          id={id}
          ref={inputRef}
          value={value}
          onChange={onChange}
          title={title}
          pattern={pattern}
          required={required}
          autoComplete="none"
          aria-invalid={isError}
          aria-describedby={isError ? `${id}-error` : undefined}
          className={`block w-full border rounded-md shadow-sm appearance-none focus:outline-none sm:text-sm px-3 py-2 ${
            isError
              ? 'text-red-900 placeholder-red-300 border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'placeholder-gray-400 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
          } ${className}`}
          {...restProps}
        />

        {isError && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <HiExclamationCircle
              className="w-5 h-5 text-red-500 pointer-events-none"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {isError && (
        <div id={`${id}-error`} className="mt-2 text-sm text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}
