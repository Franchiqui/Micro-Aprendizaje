'use client';

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'ghost';
  hover?: boolean;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  withSeparator?: boolean;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  withSeparator?: boolean;
}

const Card = React.memo(
  React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', hover = false, ...props }, ref) => {
      const variants = {
        default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm',
        outline: 'border-2 border-gray-300 dark:border-gray-600',
        ghost: 'bg-transparent border-none shadow-none'
      };

      const hoverStyles = hover 
        ? 'transition-all duration-200 hover:shadow-md hover:scale-[1.02] focus-within:shadow-md focus-within:scale-[1.02]' 
        : '';

      return (
        <div
          ref={ref}
          className={cn(
            'rounded-lg overflow-hidden',
            variants[variant],
            hoverStyles,
            className
          )}
          {...props}
        />
      );
    }
  )
);

const CardHeader = React.memo(
  React.forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, withSeparator = false, ...props }, ref) => (
      <div
        ref={ref}
        className={cn(
          'flex flex-col space-y-1.5 p-6',
          withSeparator && 'border-b border-gray-200 dark:border-gray-700',
          className
        )}
        {...props}
      />
    )
  )
);

const CardTitle = React.memo(
  React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
      <h3
        ref={ref}
        className={cn(
          'text-lg font-semibold leading-none tracking-tight text-gray-900 dark:text-white',
          className
        )}
        {...props}
      />
    )
  )
);

const CardDescription = React.memo(
  React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
      <p
        ref={ref}
        className={cn('text-sm text-gray-500 dark:text-gray-400', className)}
        {...props}
      />
    )
  )
);

const CardContent = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
    )
  )
);

const CardFooter = React.memo(
  React.forwardRef<HTMLDivElement, CardFooterProps>(
    ({ className, withSeparator = false, ...props }, ref) => (
      <div
        ref={ref}
        className={cn(
          'flex items-center p-6 pt-0',
          withSeparator && 'border-t border-gray-200 dark:border-gray-700',
          className
        )}
        {...props}
      />
    )
  )
);

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };