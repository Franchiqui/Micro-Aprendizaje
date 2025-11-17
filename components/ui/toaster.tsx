'use client';

import { useToast } from '@/hooks/use-toast';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport } from
'@/components/ui/toast';

interface ToasterProps {}

export function Toaster({}: ToasterProps) {
  const { toasts } = useToast();

  return (
    <ToastProvider data-zeus-id="Z-271">
      {toasts.map((toast) => {
        const { id, title, description, action, ...props } = toast;
        return (
          <Toast key={id} {...props} data-zeus-id="Z-272">
            <div className={"grid gap-1"} data-zeus-id="Z-273">
              {title && <ToastTitle data-zeus-id="Z-274">{title}</ToastTitle>}
              {description &&
              <ToastDescription data-zeus-id="Z-275">{description}</ToastDescription>
              }
            </div>
            {action}
            <ToastClose data-zeus-id="Z-276" />
          </Toast>);

      })}
      <ToastViewport data-zeus-id="Z-277" />
    </ToastProvider>);

}