import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  TooltipProps 
} from 'recharts';
import { mockPortfolioHistory } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/formatters';

const timeRanges = [
  { label: '1W', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: 'YTD', days: 151 }, // Approximately May 28 from Jan 1
  { label: '1Y', days: 365 },
  { label: 'All', days: 90 } // Using all available data for this example
];

const PortfolioChart: React.FC = () => {
  const [activeRange, setActiveRange] = useState(2); // Default to 3M
  
  const selectedDays = timeRanges[activeRange].days;
  const data = mockPortfolioHistory.slice(-selectedDays);

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-midnight-50 border border-midnight-100 p-3 rounded shadow-lg">
          <p className="text-sm text-gray-300">{formatDate(label)}</p>
          <p className="text-base font-medium text-white">
            {formatCurrency(payload[0].value as number, 0)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="wayne-card">
      <div className="wayne-widget-header">
        <h3 className="wayne-widget-title">Portfolio Performance</h3>
        <div className="flex space-x-1">
          {timeRanges.map((range, index) => (
            <button
              key={range.label}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                activeRange === index 
                  ? 'bg-wayne-blue text-white' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-midnight-200'
              }`}
              onClick={() => setActiveRange(index)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-2 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1A5CFF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1A5CFF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#162A3F" vertical={false} />
            <XAxis 
              dataKey="date" 
              tickFormatter={(tick) => {
                const date = new Date(tick);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
              stroke="#4B5563"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={{ stroke: '#1F2937' }}
            />
            <YAxis 
              tickFormatter={(tick) => `$${(tick / 1000000000).toFixed(0)}B`}
              stroke="#4B5563"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={{ stroke: '#1F2937' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#1A5CFF" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#portfolioGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioChart;