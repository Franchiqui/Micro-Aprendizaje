'use client';

'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  PlusIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  XMarkIcon } from
'@heroicons/react/24/outline';
import { useModalStore } from '@/stores/modal-store';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{className?: string;}>;
  modalType: 'home' | 'add-product' | 'shopping-list' | 'statistics';
}

const navItems: NavItem[] = [
{ id: 'home', label: 'Inicio', icon: HomeIcon, modalType: 'home' },
{ id: 'add-product', label: 'Agregar Producto', icon: PlusIcon, modalType: 'add-product' },
{ id: 'shopping-list', label: 'Lista Compra', icon: ShoppingCartIcon, modalType: 'shopping-list' },
{ id: 'statistics', label: 'Estadísticas', icon: ChartBarIcon, modalType: 'statistics' }];


export const Sidebar = React.memo(({ isOpen, onClose }: SidebarProps) => {
  const { openModal } = useModalStore();

  const handleNavItemClick = useCallback((modalType: NavItem['modalType']) => {
    openModal(modalType);
    onClose();
  }, [openModal, onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  return (
    <AnimatePresence data-zeus-id="Z-214">
      {isOpen &&
      <>
          {/* Backdrop */}
          <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick} data-zeus-id="Z-215" />

          
          {/* Sidebar */}
          <motion.div
          className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-cyan-900 via-blue-900 to-black z-50 shadow-2xl lg:static lg:z-auto lg:shadow-none"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }} data-zeus-id="Z-216">

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-cyan-700/30" data-zeus-id="Z-217">
              <h1 className="text-xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" data-zeus-id="Z-218">
                Mi Inventario
              </h1>
              <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-cyan-800/30 transition-colors"
              aria-label="Cerrar menú" data-zeus-id="Z-219">

                <XMarkIcon className="w-6 h-6 text-cyan-300" data-zeus-id="Z-220" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2" data-zeus-id="Z-221">
              {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavItemClick(item.modalType)}
                  className="w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-200 hover:bg-cyan-800/30 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-blue-900"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Abrir ${item.label}`} data-zeus-id="Z-222">

                    <Icon className="w-6 h-6 text-cyan-300 flex-shrink-0" data-zeus-id="Z-223" />
                    <span className="text-white font-medium text-lg" data-zeus-id="Z-224">
                      {item.label}
                    </span>
                  </motion.button>);

            })}
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-cyan-700/30" data-zeus-id="Z-225">
              <p className="text-cyan-300/70 text-sm text-center" data-zeus-id="Z-226">
                Gestiona tu hogar inteligentemente
              </p>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

});

Sidebar.displayName = 'Sidebar';