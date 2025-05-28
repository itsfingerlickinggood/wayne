import React from 'react';
import { ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { mockMarketNews } from '../../data/mockData';
import { formatDate } from '../../utils/formatters';

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
  return (
    <div className="wayne-card">
      <div className="wayne-widget-header px-4 pt-4">
        <h3 className="wayne-widget-title">Market News</h3>
        <button className="text-xs text-wayne-blue hover:text-blue-400 transition-colors">
          View All
        </button>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {mockMarketNews.slice(0, 4).map((news) => (
            <div 
              key={news.id}
              className="p-3 rounded-md hover:bg-midnight-200 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-200 mb-1">{news.title}</h4>
                  <div className="flex items-center space-x-3 text-xs text-gray-400">
                    <span>{news.source}</span>
                    <span>•</span>
                    <span>{formatDate(news.date)}</span>
                    <div className="flex items-center space-x-1">
                      {getSentimentIcon(news.sentiment)}
                      <span className="capitalize">{news.sentiment}</span>
                    </div>
                  </div>
                </div>
                <a 
                  href={news.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 p-1 text-gray-400 hover:text-wayne-blue transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              {news.relevance > 90 && (
                <div className="mt-2 flex items-center">
                  <span className="px-2 py-0.5 text-xs bg-wayne-blue/20 text-wayne-blue rounded-full">
                    High Relevance
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketNews;