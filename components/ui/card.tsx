'use client';

'use client';

import React, { forwardRef, memo } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const cn = (...inputs: any[]) => twMerge(clsx(inputs));

const Card = memo(forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', hover = false, ...props }, ref) => {
    const baseStyles = 'rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-black text-white shadow-lg';

    const variants = {
      default: 'border border-gray-700/50',
      outlined: 'border-2 border-cyan-400/30',
      elevated: 'shadow-2xl shadow-blue-900/20'
    };

    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8'
    };

    const hoverStyles = hover ?
    'transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-900/30' :
    '';

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          paddings[padding],
          hoverStyles,
          className
        )}
        {...props} data-zeus-id="Z-243" />);


  }
));

Card.displayName = 'Card';

const CardHeader = memo(forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, description, ...props }, ref) =>
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props} data-zeus-id="Z-244">

      {title &&
    <h3 className="text-xl font-semibold leading-none tracking-tight text-white" data-zeus-id="Z-245">
          {title}
        </h3>
    }
      {description &&
    <p className="text-sm text-cyan-100/80" data-zeus-id="Z-246">{description}</p>
    }
    </div>

));

CardHeader.displayName = 'CardHeader';

const CardContent = memo(forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) =>
  <div
    ref={ref}
    className={cn('pt-0', className)}
    {...props} data-zeus-id="Z-247" />


));

CardContent.displayName = 'CardContent';

const CardFooter = memo(forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) =>
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props} data-zeus-id="Z-248" />


));

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardContent, CardFooter };