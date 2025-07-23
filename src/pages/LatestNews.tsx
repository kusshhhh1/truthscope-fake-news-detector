import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  NewspaperIcon,
  ArrowPathIcon,
  ClockIcon,
  GlobeAltIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  urlToImage?: string;
}

const NEWS_API_URL = 'http://localhost:8080/api/news';

const analyzeArticle = (article: any): boolean => {
  // Simple fake news detection (reuse or improve your logic)
  const suspiciousKeywords = [
    'shocking', 'exclusive', 'secret', 'exposed', 'miracle', 'doctors hate',
    "won't believe", 'big pharma', 'mainstream media', 'hidden truth',
    'government hiding', "they don't want you to know", 'weird trick'
  ];
  const lowerTitle = article.title?.toLowerCase() || '';
  const lowerDesc = article.description?.toLowerCase() || '';
  const combinedText = lowerTitle + ' ' + lowerDesc;
  const suspiciousCount = suspiciousKeywords.filter(keyword => combinedText.includes(keyword)).length;
  // If suspicious keywords found, classify as fake
  return suspiciousCount === 0;
};

const LatestNews: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(NEWS_API_URL);
      const data = await res.json();
      if (!data.articles) throw new Error('No articles found');
      // Filter and map articles
      const processed: NewsArticle[] = data.articles
        .filter((a: any) => a.title && a.url && a.source?.name && a.publishedAt && a.urlToImage)
        .map((a: any, idx: number) => ({
          id: `${a.url}-${idx}`,
          title: a.title,
          description: a.description || '',
          url: a.url,
          publishedAt: a.publishedAt,
          source: a.source.name,
          urlToImage: a.urlToImage
        }))
        .filter(analyzeArticle)
        .slice(0, 10);
      setArticles(processed);
      setLastUpdated(new Date());
    } catch (err: any) {
      setError('Failed to fetch news. Please try again.');
      setArticles([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLatestNews();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="max-w-6xl mx-auto fade-in theme-transition">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 card p-8"
      >
        <NewspaperIcon className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold gradient-text mb-4">Latest News Analysis</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Get the latest headlines with instant fake news detection. Only credible news is shown.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchLatestNews}
            disabled={loading}
            className="btn theme-transition flex items-center space-x-2 px-6 py-3"
          >
            <ArrowPathIcon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Fetching News...' : 'Get Fresh Headlines'}</span>
          </motion.button>
          {lastUpdated && (
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <ClockIcon className="h-4 w-4" />
              <span className="text-sm">
                Last updated: {format(lastUpdated, 'h:mm a')}
              </span>
            </div>
          )}
        </div>
      </motion.div>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center py-16"
          >
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Analyzing latest headlines...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {error && (
        <div className="text-center text-red-500 py-4">{error}</div>
      )}
      <AnimatePresence>
        {!loading && articles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6"
          >
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="card rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {article.urlToImage && (
                    <div className="lg:w-64 flex-shrink-0">
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-48 lg:h-32 object-cover rounded-xl"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
                      {article.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <GlobeAltIcon className="h-4 w-4" />
                          <span>{article.source}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="h-4 w-4" />
                          <span>{format(new Date(article.publishedAt), 'MMM d, h:mm a')}</span>
                        </div>
                      </div>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
                      >
                        <span>Read Full Article</span>
                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LatestNews;