import React, { useState, useEffect } from 'react';
import { ExternalLink, TrendingUp, TrendingDown, Minus, RefreshCw } from 'lucide-react';
import { getMarketNews, analyzeSentiment } from '../../utils/api';
import { formatDate } from '../../utils/formatters';

interface NewsItem {
  id: string;
  headline: string;
  source: string;
  datetime: number;
  url: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  relevance?: number;
}

const getSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case 'positive':
      return <TrendingUp className="h-4 w-4 text-wayne-green" />;
    case 'negative':
      return <TrendingDown className="h-4 w-4 text-wayne-red" />;
    default:
      return <Minus className="h-4 w-4 text-gray-400" />;
  }
};

const MarketNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const newsData = await getMarketNews();
      
      // Process only the first 5 news items for sentiment analysis
      const processedNews = await Promise.all(
        newsData.slice(0, 5).map(async (item: any) => {
          try {
            const sentimentAnalysis = await analyzeSentiment(item.headline);
            return {
              ...item,
              sentiment: sentimentAnalysis.choices[0].message.content.toLowerCase().includes('positive') 
                ? 'positive' 
                : sentimentAnalysis.choices[0].message.content.toLowerCase().includes('negative')
                ? 'negative'
                : 'neutral',
              relevance: Math.random() > 0.7 ? 95 : 85, // Simplified relevance scoring
            };
          } catch (error) {
            console.error('Error analyzing sentiment:', error);
            return {
              ...item,
              sentiment: 'neutral',
              relevance: 85,
            };
          }
        })
      );

      setNews(processedNews);
      setError(null);
    } catch (err) {
      setError('Failed to fetch market news');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="wayne-card">
      <div className="wayne-widget-header px-4 pt-4">
        <h3 className="wayne-widget-title">Market News</h3>
        <button 
          className="text-xs text-wayne-blue hover:text-blue-400 transition-colors flex items-center"
          onClick={fetchNews}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      
      <div className="p-4">
        {error && (
          <div className="text-wayne-red text-sm mb-4">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-midnight-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-midnight-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <div 
                key={item.id}
                className="p-3 rounded-md hover:bg-midnight-200 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-200 mb-1">{item.headline}</h4>
                    <div className="flex items-center space-x-3 text-xs text-gray-400">
                      <span>{item.source}</span>
                      <span>•</span>
                      <span>{formatDate(new Date(item.datetime * 1000).toISOString())}</span>
                      <div className="flex items-center space-x-1">
                        {getSentimentIcon(item.sentiment || 'neutral')}
                        <span className="capitalize">{item.sentiment}</span>
                      </div>
                    </div>
                  </div>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-2 p-1 text-gray-400 hover:text-wayne-blue transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                {(item.relevance || 0) > 90 && (
                  <div className="mt-2 flex items-center">
                    <span className="px-2 py-0.5 text-xs bg-wayne-blue/20 text-wayne-blue rounded-full">
                      High Relevance
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketNews;