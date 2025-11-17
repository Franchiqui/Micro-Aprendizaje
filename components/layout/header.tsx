'use client';

'use client';

import React, { memo, useCallback, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  HomeIcon,
  PlusIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  XMarkIcon } from
'@heroicons/react/24/outline';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

interface ModalState {
  isOpen: boolean;
  type: 'home' | 'add' | 'shopping' | 'stats' | null;
}

const Header: React.FC<HeaderProps> = memo(({ currentPage, onPageChange }) => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: null
  });

  const navigationItems = [
  { id: 'home', label: 'Inicio', icon: HomeIcon },
  { id: 'add', label: 'Agregar', icon: PlusIcon },
  { id: 'shopping', label: 'Lista', icon: ShoppingCartIcon },
  { id: 'stats', label: 'Estadísticas', icon: ChartBarIcon }];


  const handleNavigationClick = useCallback((pageId: string) => {
    onPageChange(pageId);
    setModalState({ isOpen: true, type: pageId as ModalState['type'] });
  }, [onPageChange]);

  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, type: null });
  }, []);

  const renderModalContent = () => {
    switch (modalState.type) {
      case 'home':
        return (
          <div className="space-y-4" data-zeus-id="Z-165">
            <h3 className="text-lg font-semibold text-gray-900" data-zeus-id="Z-166">Inicio</h3>
            <p className="text-gray-600" data-zeus-id="Z-167">Bienvenido a Mi Inventario App</p>
          </div>);


      case 'add':
        return (
          <div className="space-y-4" data-zeus-id="Z-168">
            <h3 className="text-lg font-semibold text-gray-900" data-zeus-id="Z-169">Agregar Producto</h3>
            <form className="space-y-4" data-zeus-id="Z-170">
              <div data-zeus-id="Z-171">
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700" data-zeus-id="Z-172">
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  id="productName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Ingresa el nombre del producto" data-zeus-id="Z-173" />

              </div>
              <div data-zeus-id="Z-174">
                <label htmlFor="barcode" className="block text-sm font-medium text-gray-700" data-zeus-id="Z-175">
                  Código de Barras
                </label>
                <input
                  type="text"
                  id="barcode"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Escanea o ingresa el código" data-zeus-id="Z-176" />

              </div>
              <div data-zeus-id="Z-177">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700" data-zeus-id="Z-178">
                  Cantidad
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0" data-zeus-id="Z-179" />

              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-4 rounded-md hover:from-cyan-600 hover:to-blue-700 transition-all duration-200" data-zeus-id="Z-180">

                Guardar Producto
              </button>
            </form>
          </div>);


      case 'shopping':
        return (
          <div className="space-y-4" data-zeus-id="Z-181">
            <h3 className="text-lg font-semibold text-gray-900" data-zeus-id="Z-182">Lista de Compra</h3>
            <div className="space-y-2" data-zeus-id="Z-183">
              <p className="text-gray-600" data-zeus-id="Z-184">Productos que necesitas comprar:</p>
              {/* Lista de productos vendría aquí */}
            </div>
          </div>);


      case 'stats':
        return (
          <div className="space-y-4" data-zeus-id="Z-185">
            <h3 className="text-lg font-semibold text-gray-900" data-zeus-id="Z-186">Estadísticas</h3>
            <div className="grid grid-cols-2 gap-4" data-zeus-id="Z-187">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-4 rounded-lg text-white text-center" data-zeus-id="Z-188">
                <p className="text-2xl font-bold" data-zeus-id="Z-189">24</p>
                <p className="text-sm" data-zeus-id="Z-190">Productos</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-lg text-white text-center" data-zeus-id="Z-191">
                <p className="text-2xl font-bold" data-zeus-id="Z-192">3</p>
                <p className="text-sm" data-zeus-id="Z-193">Por agotar</p>
              </div>
            </div>
          </div>);


      default:
        return null;
    }
  };

  return (
    <>
      <header className="bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-800 shadow-lg" data-zeus-id="Z-194">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-zeus-id="Z-195">
          <div className="flex justify-between items-center h-16" data-zeus-id="Z-196">
            <div className="flex-shrink-0" data-zeus-id="Z-197">
              <h1 className="text-xl font-bold text-white" data-zeus-id="Z-198">Mi Inventario App</h1>
            </div>
            
            <nav className="flex space-x-8" aria-label="Global" data-zeus-id="Z-199">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigationClick(item.id)}
                    className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive ?
                    'bg-white/20 text-white' :
                    'text-white/80 hover:text-white hover:bg-white/10'}`
                    }
                    aria-current={isActive ? 'page' : undefined} data-zeus-id="Z-200">

                    <Icon className="w-5 h-5 mr-2" aria-hidden="true" data-zeus-id="Z-201" />
                    {item.label}
                  </button>);

              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Modal */}
      <Transition appear show={modalState.isOpen} as={Fragment} data-zeus-id="Z-202">
        <Dialog as="div" className="relative z-10" onClose={closeModal} data-zeus-id="Z-203">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0" data-zeus-id="Z-204">

            <div className="fixed inset-0 bg-black bg-opacity-25" data-zeus-id="Z-205" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto" data-zeus-id="Z-206">
            <div className="flex min-h-full items-center justify-center p-4 text-center" data-zeus-id="Z-207">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95" data-zeus-id="Z-208">

                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all" data-zeus-id="Z-209">
                  <div className="flex justify-between items-center mb-4" data-zeus-id="Z-210">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900" data-zeus-id="Z-211">
                      {modalState.type && navigationItems.find((item) => item.id === modalState.type)?.label}
                    </Dialog.Title>
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={closeModal} data-zeus-id="Z-212">

                      <XMarkIcon className="h-6 w-6" aria-hidden="true" data-zeus-id="Z-213" />
                    </button>
                  </div>
                  
                  {renderModalContent()}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>);

});

Header.displayName = 'Header';

export default Header;