import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  DocumentTextIcon, 
  NewspaperIcon, 
  ShieldCheckIcon,
  LightBulbIcon,
  ChartBarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <DocumentTextIcon className="h-8 w-8" />,
      title: "Custom Text Analysis",
      description: "Analyze any news article or text for authenticity using advanced ML algorithms"
    },
    {
      icon: <NewspaperIcon className="h-8 w-8" />,
      title: "Real-time News Feed",
      description: "Get the latest headlines with instant fake news detection and classification"
    },
    {
      icon: <LightBulbIcon className="h-8 w-8" />,
      title: "AI Explainability",
      description: "Understand why content is flagged with detailed explanations and keyword analysis"
    },
    {
      icon: <ChartBarIcon className="h-8 w-8" />,
      title: "Confidence Scoring",
      description: "Get precise confidence scores and reliability metrics for every analysis"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto fade-in theme-transition">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 card p-10"
      >
        <div className="floating-animation inline-block mb-8">
          <div className="relative">
            <ShieldCheckIcon className="h-24 w-24 text-blue-600 dark:text-blue-400 mx-auto" />
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 pulse-ring"></div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">TruthScope</h1>
        
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          <em>"Unmask the Truth – One Article at a Time"</em>
        </p>
        
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            In today's digital landscape, misinformation spreads faster than ever. TruthScope leverages 
            cutting-edge machine learning algorithms to analyze news content, detect potential fake news, 
            and provide you with confidence scores and detailed explanations. Whether you're fact-checking 
            a viral story or staying informed with the latest headlines, TruthScope empowers you to make 
            informed decisions based on verified information.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/custom-detection"
              className="btn flex items-center justify-center text-lg min-w-[220px] shadow-lg theme-transition gap-2"
            >
              <DocumentTextIcon className="h-5 w-5" />
              <span>Detect Custom News</span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/latest-news"
              className="btn flex items-center justify-center text-lg min-w-[220px] shadow-lg theme-transition gap-2 dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-500"
            >
              <NewspaperIcon className="h-5 w-5" />
              <span>Get Latest News</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">Why Choose TruthScope?</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              className="card rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group theme-transition"
            >
              <div className="text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="card rounded-3xl p-8 mb-16 fade-in theme-transition"
      >
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">94%</div>
            <div className="text-gray-600 dark:text-gray-300">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">50K+</div>
            <div className="text-gray-600 dark:text-gray-300">Articles Analyzed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-300">Real-time Monitoring</div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="text-center card rounded-3xl p-12 fade-in theme-transition"
      >
        <GlobeAltIcon className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Ready to Fight Misinformation?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of users who trust TruthScope to help them navigate the complex world of digital information.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/custom-detection"
            className="btn text-lg shadow-lg theme-transition"
          >
            Start Analyzing Now
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;