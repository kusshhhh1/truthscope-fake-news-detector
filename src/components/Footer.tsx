import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mt-16 py-6 px-4 w-full flex justify-center items-center bg-transparent border-t-0"
      style={{ minHeight: '60px' }}
    >
      <div className="w-full text-center">
        <span className="font-medium text-base text-gray-400 dark:text-gray-500">
          Made with <span className="text-red-500">❤️</span> by Kushagra Sharma | © 2025 TruthScope
        </span>
      </div>
    </motion.footer>
  );
};

export default Footer;