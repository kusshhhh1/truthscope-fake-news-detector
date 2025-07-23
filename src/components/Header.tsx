import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 glass-effect shadow-lg fade-in theme-transition"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <ShieldCheckIcon className="h-10 w-10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 pulse-ring"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">TruthScope</h1>
              <p className="text-xs text-gray-600 dark:text-gray-300">Unmask the Truth</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 theme-transition ${
                location.pathname === '/'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-lg'
              }`}
            >
              Home
            </Link>
            <Link
              to="/custom-detection"
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 theme-transition ${
                location.pathname === '/custom-detection'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-lg'
              }`}
            >
              Custom Detection
            </Link>
            <Link
              to="/latest-news"
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 theme-transition ${
                location.pathname === '/latest-news'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-lg'
              }`}
            >
              Latest News
            </Link>
          </nav>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="btn theme-transition p-3 w-12 h-12 flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-700"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <SunIcon className="h-6 w-6 text-yellow-400 drop-shadow-md" />
            ) : (
              <MoonIcon className="h-6 w-6 text-blue-700" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;