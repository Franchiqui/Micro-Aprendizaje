'use client';

'use client';

import React, { memo, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  HomeIcon, 
  BookOpenIcon, 
  ChartBarIcon, 
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

interface SidebarProps {
  className?: string;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const navigation: NavigationItem[] = [
  { name: 'Inicio', href: '/', icon: HomeIcon },
  { name: 'Mis Cursos', href: '/my-courses', icon: BookOpenIcon, badge: 3 },
  { name: 'Progreso', href: '/progress', icon: ChartBarIcon },
  { name: 'Configuración', href: '/settings', icon: CogIcon },
];

const categories = [
  { name: 'Tecnología', icon: AcademicCapIcon, href: '/categories/technology' },
  { name: 'Idiomas', icon: GlobeAltIcon, href: '/categories/languages' },
  { name: 'Finanzas', icon: CurrencyDollarIcon, href: '/categories/finance' },
  { name: 'Bienestar', icon: HeartIcon, href: '/categories/wellness' },
];

const Sidebar = memo<SidebarProps>(({ className }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const isActiveLink = useCallback((href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }, [pathname]);

  return (
    <motion.div
      className={clsx(
        'flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64',
        className
      )}
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg" />
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                SkillBurst
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={isCollapsed ? 'Expandir sidebar' : 'Contraer sidebar'}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = isActiveLink(item.href);
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className={clsx('flex-shrink-0', isCollapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3')} />
              
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 truncate"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>

              {item.badge && !isCollapsed && (
                <span className="ml-auto bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Categories Section */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 border-t border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Categorías
            </h3>
            <div className="space-y-1">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = isActiveLink(category.href);
                
                return (
                  <Link
                    key={category.name}
                    href={category.href}
                    className={clsx(
                      'flex items-center rounded-lg px-3 py-2 text-sm transition-colors',
                      isActive
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    <span className="truncate">{category.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className={clsx('flex items-center', isCollapsed ? 'justify-center' : 'space-x-3')}>
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />
          
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  Usuario
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  120 min aprendidos
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;