import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CustomDetection from './pages/CustomDetection';
import LatestNews from './pages/LatestNews';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-all duration-500">
          <Header />
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/custom-detection" element={<CustomDetection />} />
              <Route path="/latest-news" element={<LatestNews />} />
            </Routes>
          </motion.main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;