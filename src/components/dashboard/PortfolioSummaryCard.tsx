import React from 'react';
import { formatCurrency, formatColorizedPercent } from '../../utils/formatters';
import { TrendingUp, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockPortfolioSummary } from '../../data/mockData';

const PortfolioSummaryCard: React.FC = () => {
  const { 
    totalValue, 
    dailyChange, 
    dailyChangePercent, 
    monthlyChange,
    monthlyChangePercent,
    yearToDateChange,
    yearToDateChangePercent
  } = mockPortfolioSummary;

  const dailyChangeFormatted = formatColorizedPercent(dailyChangePercent);
  const monthlyChangeFormatted = formatColorizedPercent(monthlyChangePercent);
  const ytdChangeFormatted = formatColorizedPercent(yearToDateChangePercent);

  return (
    <div className="wayne-card">
      <div className="p-5 bg-wayne-blue/5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-200">Total Portfolio Value</h3>
          <TrendingUp className="h-5 w-5 text-wayne-blue" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-2"
        >
          <p className="text-3xl font-bold text-white">{formatCurrency(totalValue, 0)}</p>
          <div className="flex items-center mt-1">
            <span className={`text-sm ${dailyChangeFormatted.className}`}>
              {dailyChangeFormatted.text}
            </span>
            <span className="text-xs text-gray-400 ml-2">Today</span>
          </div>
        </motion.div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-medium text-gray-400">Performance</h4>
          <button className="flex items-center text-xs text-gray-400 hover:text-wayne-blue">
            <span>Details</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-300">Daily Change</p>
            <div className="flex items-center">
              <p className="text-sm font-medium">{formatCurrency(dailyChange, 0)}</p>
              <span className={`text-xs ml-2 ${dailyChangeFormatted.className}`}>
                {dailyChangeFormatted.text}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-300">Monthly Change</p>
            <div className="flex items-center">
              <p className="text-sm font-medium">{formatCurrency(monthlyChange, 0)}</p>
              <span className={`text-xs ml-2 ${monthlyChangeFormatted.className}`}>
                {monthlyChangeFormatted.text}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-300">Year-to-Date</p>
            <div className="flex items-center">
              <p className="text-sm font-medium">{formatCurrency(yearToDateChange, 0)}</p>
              <span className={`text-xs ml-2 ${ytdChangeFormatted.className}`}>
                {ytdChangeFormatted.text}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummaryCard;