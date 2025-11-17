'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" data-zeus-id="Z-227">
      <div className="container flex h-14 items-center" data-zeus-id="Z-228">
        <div className="mr-4 hidden md:flex" data-zeus-id="Z-229">
          <a className="mr-6 flex items-center space-x-2" href="/" data-zeus-id="Z-230">
            <span className="hidden font-bold sm:inline-block" data-zeus-id="Z-231">
              Mi Aplicación
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end" data-zeus-id="Z-232">
          <div className="w-full flex-1 md:w-auto md:flex-none" data-zeus-id="Z-233">
            {/* Aquí puedes añadir más elementos de navegación */}
          </div>
          <nav className="flex items-center" data-zeus-id="Z-234">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} data-zeus-id="Z-235">

              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" data-zeus-id="Z-236" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" data-zeus-id="Z-237" />
              <span className="sr-only" data-zeus-id="Z-238">Cambiar tema</span>
            </Button>
          </nav>
        </div>
      </div>
    </nav>);

}