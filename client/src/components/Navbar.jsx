import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ onMenuToggle, isMenuOpen }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-dark-800 shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold">
                ST
              </div>
              <h1 className="text-xl font-bold gradient-text hidden sm:block">
                Task Manager
              </h1>
            </div>
          </div>

          {/* User Info and Actions */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium hidden sm:block">
              Welcome, <span className="text-primary-600 dark:text-primary-400">{user?.name}</span>
            </span>
            
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition"
              title="Toggle theme"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            <button
              onClick={handleLogout}
              className="p-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 rounded-lg transition"
              title="Logout"
            >
              <FiLogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
