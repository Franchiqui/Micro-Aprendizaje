'use client';

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface FooterProps {
  className?: string;
}

interface NavigationLink {
  href: string;
  label: string;
  external?: boolean;
}

const Footer: React.FC<FooterProps> = React.memo(({ className = '' }) => {
  const pathname = usePathname();

  const currentYear = new Date().getFullYear();

  const navigationLinks: NavigationLink[] = [
    { href: '/cursos', label: 'Cursos' },
    { href: '/categorias', label: 'Categorías' },
    { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
    { href: '/contacto', label: 'Contacto' },
    { href: '/privacidad', label: 'Privacidad' },
    { href: '/terminos', label: 'Términos' },
    { href: '/ayuda', label: 'Ayuda' },
    { href: 'https://github.com/skillburst', label: 'GitHub', external: true },
  ];

  const socialLinks = [
    { 
      href: 'https://twitter.com/skillburst', 
      label: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
        </svg>
      )
    },
    { 
      href: 'https://linkedin.com/company/skillburst', 
      label: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    { 
      href: 'https://youtube.com/skillburst', 
      label: 'YouTube',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93 .502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871 .505 -9 .505 -9 .505s7 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -9 .505 -}}))]