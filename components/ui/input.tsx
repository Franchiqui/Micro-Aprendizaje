'use client';

'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  [
  'flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm',
  'placeholder:text-gray-500',
  'focus:outline-none focus:ring-2 focus:ring-offset-1',
  'disabled:cursor-not-allowed disabled:opacity-50',
  'transition-all duration-200 ease-in-out'],

  {
    variants: {
      variant: {
        default: [
        'border-gray-300',
        'focus:border-blue-500 focus:ring-blue-500/20',
        'hover:border-gray-400'],

        error: [
        'border-red-500',
        'focus:border-red-500 focus:ring-red-500/20',
        'hover:border-red-600'],

        success: [
        'border-green-500',
        'focus:border-green-500 focus:ring-green-500/20',
        'hover:border-green-600']

      },
      size: {
        sm: 'h-8 px-2 py-1 text-xs',
        md: 'h-10 px-3 py-2 text-sm',
        lg: 'h-12 px-4 py-3 text-base'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

export interface InputProps extends
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
  VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
  {
    className,
    variant,
    size,
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    id,
    disabled,
    ...props
  },
  ref) =>
  {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;

    return (
      <div className="w-full space-y-1" data-zeus-id="Z-249">
        {label &&
        <label
          htmlFor={inputId}
          className={clsx(
            'block text-sm font-medium leading-6 text-gray-900',
            disabled && 'text-gray-400'
          )} data-zeus-id="Z-250">

            {label}
          </label>
        }
        
        <div className="relative" data-zeus-id="Z-251">
          {leftIcon &&
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" data-zeus-id="Z-252">
              {leftIcon}
            </div>
          }
          
          <input
            id={inputId}
            className={clsx(
              inputVariants({ variant: hasError ? 'error' : variant, size, className }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10'
            )}
            ref={ref}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
            hasError ?
            `${inputId}-error` :
            helperText ?
            `${inputId}-helper` :
            undefined
            }
            {...props} data-zeus-id="Z-253" />

          
          {rightIcon &&
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" data-zeus-id="Z-254">
              {rightIcon}
            </div>
          }
        </div>

        {hasError &&
        <p
          id={`${inputId}-error`}
          className="text-sm text-red-600"
          role="alert" data-zeus-id="Z-255">

            {error}
          </p>
        }

        {helperText && !hasError &&
        <p
          id={`${inputId}-helper`}
          className="text-sm text-gray-500" data-zeus-id="Z-256">

            {helperText}
          </p>
        }
      </div>);

  }
);

Input.displayName = 'Input';

export default React.memo(Input);