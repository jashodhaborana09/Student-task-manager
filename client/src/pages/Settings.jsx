import React from 'react';
import { FiSave, FiLogOut, FiBell, FiLock, FiUser } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Settings = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      toast.success('Logged out successfully');
      navigate('/login');
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="card p-6 bg-gradient-to-r from-primary-500 to-primary-700 text-white animate-fadeInUp">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-primary-100 mt-1">Manage your account and preferences</p>
      </div>

      {/* Account Information */}
      <div className="card p-6 animate-fadeInUp">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="card p-6 animate-fadeInUp">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FiUser size={20} /> Appearance
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <div>
              <p className="font-semibold">{isDark ? 'Dark Mode' : 'Light Mode'}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isDark ? 'Currently using dark theme' : 'Currently using light theme'}
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
            >
              {isDark ? 'Switch to Light' : 'Switch to Dark'}
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card p-6 animate-fadeInUp">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FiBell size={20} /> Notifications
        </h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-600 transition">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Due date reminders</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-600 transition">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Task completion alerts</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-600 transition">
            <input type="checkbox" className="w-4 h-4" />
            <span>Weekly summary</span>
          </label>
        </div>
      </div>

      {/* Security Settings */}
      <div className="card p-6 animate-fadeInUp">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FiLock size={20} /> Security
        </h2>
        <div className="space-y-3">
          <button className="w-full p-4 text-left bg-gray-50 dark:bg-dark-700 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition">
            <p className="font-semibold">Change Password</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Update your password regularly</p>
          </button>
        </div>
      </div>

      {/* About */}
      <div className="card p-6 animate-fadeInUp">
        <h2 className="text-lg font-bold mb-4">About</h2>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p><span className="font-semibold">App Version:</span> 1.0.0</p>
          <p><span className="font-semibold">Build:</span> Production Ready</p>
          <p><span className="font-semibold">Last Updated:</span> {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card p-6 border-2 border-red-200 dark:border-red-900 animate-fadeInUp">
        <h2 className="text-lg font-bold mb-4 text-red-600 dark:text-red-400">Danger Zone</h2>
        <button
          onClick={handleLogout}
          className="w-full p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold flex items-center justify-center gap-2"
        >
          <FiLogOut size={20} />
          Logout
        </button>
      </div>

      {/* Save Notice */}
      <div className="card p-4 bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 animate-fadeInUp">
        <p className="text-blue-800 dark:text-blue-300 flex items-center gap-2">
          <FiSave size={18} />
          Settings are automatically saved
        </p>
      </div>
    </div>
  );
};

export default Settings;
