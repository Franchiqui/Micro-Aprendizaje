'use client';

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'
import Script from 'next/script';
import { Providers } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children


}: {children: React.ReactNode;}) {
  return (
    <html lang="en" suppressHydrationWarning data-zeus-id="Z-8">
      <body className={inter.className} data-zeus-id="Z-9">
        <Providers data-zeus-id="Z-10">
          {children}
        </Providers>
              <Script src="http://localhost:3030/inspector-client.js" strategy="afterInteractive" />
      </body>
    </html>);

}