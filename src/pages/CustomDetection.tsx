import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DocumentTextIcon, 
  ShieldCheckIcon, 
  ExclamationTriangleIcon,
  InformationCircleIcon,
  SparklesIcon,
  ClipboardDocumentIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface AnalysisResult {
  isReal: boolean;
  confidence: number;
  explanation: string[];
  keywords: string[];
  sentiment: string;
  readabilityScore: number;
}

const CustomDetection: React.FC = () => {
  const [newsText, setNewsText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeNews = async (text: string): Promise<AnalysisResult> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const suspiciousKeywords = [
      'exclusive', 'breaking', 'shocking', 'revealed', 'secret', 'hidden truth',
      'they don\'t want you to know', 'mainstream media', 'cover-up', 'exposed',
      'unbelievable', 'miraculous', 'instant cure', 'doctors hate this',
      'government conspiracy', 'wake up', 'sheeple'
    ];
    const reliableIndicators = [
      'according to', 'research shows', 'study published', 'expert says',
      'data indicates', 'statistics show', 'peer-reviewed', 'university',
      'institute', 'journal', 'analysis', 'evidence suggests'
    ];
    const lowerText = text.toLowerCase();
    const suspiciousCount = suspiciousKeywords.filter(keyword => lowerText.includes(keyword)).length;
    const reliableCount = reliableIndicators.filter(indicator => lowerText.includes(indicator)).length;
    let fakeScore = suspiciousCount * 0.15;
    let realScore = reliableCount * 0.2;
    const wordCount = text.split(' ').length;
    if (wordCount < 20) fakeScore += 0.3;
    if (text.includes('!!!') || text.includes('???')) fakeScore += 0.2;
    if (text.toUpperCase() === text && text.length > 50) fakeScore += 0.4;
    const netScore = fakeScore - realScore;
    const isReal = netScore < 0.3;
    const confidence = Math.min(95, Math.max(55, Math.abs(netScore) * 100 + 50));
    const explanation = [];
    if (suspiciousCount > 0) {
      explanation.push(`Contains ${suspiciousCount} suspicious keyword(s) commonly found in misinformation`);
    }
    if (reliableCount > 0) {
      explanation.push(`Contains ${reliableCount} indicator(s) of credible journalism`);
    }
    if (wordCount < 20) {
      explanation.push('Very short content length raises credibility concerns');
    }
    if (text.includes('!!!') || text.includes('???')) {
      explanation.push('Excessive punctuation often indicates sensationalized content');
    }
    const foundSuspicious = suspiciousKeywords.filter(keyword => lowerText.includes(keyword));
    const foundReliable = reliableIndicators.filter(indicator => lowerText.includes(indicator));
    return {
      isReal,
      confidence: Math.round(confidence),
      explanation: explanation.length > 0 ? explanation : ['Analysis based on content structure and linguistic patterns'],
      keywords: [...foundSuspicious, ...foundReliable],
      sentiment: suspiciousCount > reliableCount ? 'Sensationalized' : 'Neutral',
      readabilityScore: Math.max(1, Math.min(10, 10 - suspiciousCount + reliableCount))
    };
  };

  const handleAnalyze = async () => {
    if (!newsText.trim()) return;
    setIsAnalyzing(true);
    try {
      const analysisResult = await analyzeNews(newsText);
      setResult(analysisResult);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setNewsText('');
    setResult(null);
  };

  const exampleTexts = [
    "Breaking: Scientists at MIT have discovered a revolutionary method to detect fake news using advanced machine learning algorithms. The study, published in the Journal of Information Science, shows 94% accuracy in identifying misinformation across social media platforms.",
    "SHOCKING! Doctors Don't Want You to Know This ONE Weird Trick That Cures Everything! Mainstream media is covering up this secret that big pharma doesn't want revealed!",
    "According to a peer-reviewed study published by Stanford University researchers, climate change continues to accelerate. The research, which analyzed temperature data from over 1,000 weather stations globally, indicates a consistent warming trend over the past decade."
  ];

  return (
    <div className="max-w-4xl mx-auto fade-in theme-transition">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 card p-8"
      >
        <DocumentTextIcon className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold gradient-text mb-4">Custom News Detection</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Paste any news article, headline, or text content below for instant fake news analysis 
          with detailed explanations and confidence scoring.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-8 card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Try these examples:</h3>
        <div className="grid gap-3">
          {exampleTexts.map((example, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              onClick={() => setNewsText(example)}
              className="text-left p-3 glass-effect rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 btn theme-transition"
            >
              "{example.substring(0, 100)}..."
            </motion.button>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-8 mb-8 fade-in theme-transition"
      >
        <textarea
          className="w-full min-h-[120px] mb-4 theme-transition"
          placeholder="Paste news article or text here..."
          value={newsText}
          onChange={e => setNewsText(e.target.value)}
        />
        <div className="flex gap-4 mb-4">
          <button
            onClick={handleClear}
            className="btn theme-transition bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            disabled={!newsText.trim() || isAnalyzing}
            type="button"
          >
            Clear
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAnalyze}
            disabled={!newsText.trim() || isAnalyzing}
            className="btn theme-transition flex-1 flex items-center justify-center"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Analyzing Content...</span>
              </>
            ) : (
              <>
                <SparklesIcon className="h-5 w-5" />
                <span>Analyze for Fake News</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="card p-8 fade-in theme-transition"
          >
            <div className="flex items-center space-x-4 mb-6">
              {result.isReal ? (
                <ShieldCheckIcon className="h-12 w-12 text-green-600 dark:text-green-400" />
              ) : (
                <ExclamationTriangleIcon className="h-12 w-12 text-red-600 dark:text-red-400" />
              )}
              <div>
                <h2 className="text-2xl font-bold">
                  <span className={result.isReal ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}>
                    {result.isReal ? 'Likely REAL' : 'Likely FAKE'}
                  </span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Confidence: {result.confidence}%
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center space-x-2">
                  <InformationCircleIcon className="h-5 w-5" />
                  <span>Analysis Explanation</span>
                </h3>
                <ul className="space-y-2">
                  {result.explanation.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="flex items-start space-x-2 text-gray-600 dark:text-gray-300"
                    >
                      <span className="block w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Content Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Sentiment:</span>
                    <span className={`font-medium ${
                      result.sentiment === 'Sensationalized' 
                        ? 'text-orange-600 dark:text-orange-400' 
                        : 'text-blue-600 dark:text-blue-400'
                    }`}>
                      {result.sentiment}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Readability Score:</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {result.readabilityScore}/10
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Word Count:</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {newsText.split(' ').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {result.keywords.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  Key Phrases Found
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.map((keyword, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Recommendations
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {result.isReal 
                  ? "This content appears credible, but always verify with multiple trusted sources before sharing important information."
                  : "This content shows signs of misinformation. Cross-check with reputable news sources and fact-checking websites before believing or sharing."
                }
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDetection;