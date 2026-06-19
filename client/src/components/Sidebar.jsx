import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiLayout, FiCheckSquare, FiBarChart2, FiSettings } from 'react-icons/fi';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: FiLayout, label: 'Dashboard', path: '/dashboard' },
    { icon: FiCheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: FiBarChart2, label: 'Analytics', path: '/analytics' },
    { icon: FiSettings, label: 'Settings', path: '/settings' }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 bg-white dark:bg-dark-800 shadow-lg transform transition-transform duration-300 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 font-semibold'
                      : 'text-dark-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700'
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
