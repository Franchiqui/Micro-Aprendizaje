'use client';

'use client';

import React, { memo, useCallback } from 'react';
import { HomeIcon, PlusIcon, ShoppingCartIcon, ChartBarIcon } from '@heroicons/react/24/outline';

interface FooterProps {
  onHomeClick: () => void;
  onAddProductClick: () => void;
  onShoppingListClick: () => void;
  onStatsClick: () => void;
}

const Footer = memo(({
  onHomeClick,
  onAddProductClick,
  onShoppingListClick,
  onStatsClick
}: FooterProps) => {
  const buttonClasses = "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400";
  const iconClasses = "w-6 h-6 text-white";
  const textClasses = "text-xs text-white mt-1 font-medium";

  const handleHomeClick = useCallback(() => {
    onHomeClick();
  }, [onHomeClick]);

  const handleAddProductClick = useCallback(() => {
    onAddProductClick();
  }, [onAddProductClick]);

  const handleShoppingListClick = useCallback(() => {
    onShoppingListClick();
  }, [onShoppingListClick]);

  const handleStatsClick = useCallback(() => {
    onStatsClick();
  }, [onStatsClick]);

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 border-t border-blue-400 shadow-lg z-50" data-zeus-id="Z-150">
      <div className="max-w-md mx-auto px-4 py-2" data-zeus-id="Z-151">
        <nav className="flex justify-between items-center" role="navigation" aria-label="Navegación principal" data-zeus-id="Z-152">
          <button
            onClick={handleHomeClick}
            className={buttonClasses}
            aria-label="Ir al inicio" data-zeus-id="Z-153">

            <HomeIcon className={iconClasses} data-zeus-id="Z-154" />
            <span className={textClasses} data-zeus-id="Z-155">Inicio</span>
          </button>

          <button
            onClick={handleAddProductClick}
            className={buttonClasses}
            aria-label="Agregar producto" data-zeus-id="Z-156">

            <PlusIcon className={iconClasses} data-zeus-id="Z-157" />
            <span className={textClasses} data-zeus-id="Z-158">Agregar</span>
          </button>

          <button
            onClick={handleShoppingListClick}
            className={buttonClasses}
            aria-label="Lista de compra" data-zeus-id="Z-159">

            <ShoppingCartIcon className={iconClasses} data-zeus-id="Z-160" />
            <span className={textClasses} data-zeus-id="Z-161">Compras</span>
          </button>

          <button
            onClick={handleStatsClick}
            className={buttonClasses}
            aria-label="Ver estadísticas" data-zeus-id="Z-162">

            <ChartBarIcon className={iconClasses} data-zeus-id="Z-163" />
            <span className={textClasses} data-zeus-id="Z-164">Estadísticas</span>
          </button>
        </nav>
      </div>
    </footer>);

});

Footer.displayName = 'Footer';

export default Footer;