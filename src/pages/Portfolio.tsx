import React, { useState } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  TooltipProps,
  Legend
} from 'recharts';
import { 
  Briefcase, 
  Filter, 
  Download, 
  Plus,
  PieChart as PieChartIcon
} from 'lucide-react';
import { mockPortfolioHoldings } from '../data/mockData';
import { formatCurrency, formatColorizedPercent } from '../utils/formatters';

const COLORS = ['#1A5CFF', '#4F46E5', '#06B6D4', '#F59E0B', '#EF4444', '#10B981', '#6366F1', '#8B5CF6'];

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Group holdings by type for allocation chart
  const assetTypeData = mockPortfolioHoldings.reduce((acc, holding) => {
    const existingType = acc.find(item => item.type === holding.type);
    
    if (existingType) {
      existingType.value += holding.value;
    } else {
      acc.push({
        name: holding.type.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase()),
        type: holding.type,
        value: holding.value
      });
    }
    
    return acc;
  }, [] as { name: string; type: string; value: number }[]);

  // Sort by value descending
  assetTypeData.sort((a, b) => b.value - a.value);

  // Calculate total portfolio value
  const totalPortfolioValue = mockPortfolioHoldings.reduce((sum, holding) => sum + holding.value, 0);

  // Add percentage to each asset type
  assetTypeData.forEach(item => {
    item.percentage = (item.value / totalPortfolioValue) * 100;
  });

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-midnight-50 border border-midnight-100 p-3 rounded shadow-lg">
          <p className="text-sm font-medium text-white">{data.name}</p>
          <p className="text-sm text-gray-300">
            {formatCurrency(data.value, 0)} ({data.percentage.toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Briefcase className="h-6 w-6 text-wayne-blue mr-2" />
          <h1 className="text-2xl font-bold text-gray-100">Portfolio</h1>
        </div>
        <div className="flex space-x-3">
          <button className="wayne-button-secondary flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            <span>Filter</span>
          </button>
          <button className="wayne-button-secondary flex items-center">
            <Download className="h-4 w-4 mr-2" />
            <span>Export</span>
          </button>
          <button className="wayne-button-primary flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            <span>Add Asset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Portfolio allocation chart */}
        <div className="lg:col-span-4">
          <div className="wayne-card">
            <div className="wayne-widget-header px-4 pt-4">
              <div className="flex items-center">
                <PieChartIcon className="h-5 w-5 text-wayne-blue mr-2" />
                <h3 className="wayne-widget-title">Asset Allocation</h3>
              </div>
            </div>
            
            <div className="p-4 h-96">
              <ResponsiveContainer width="100%" height="70%">
                <PieChart>
                  <Pie
                    data={assetTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {assetTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    layout="vertical" 
                    align="right"
                    verticalAlign="middle"
                    formatter={(value) => <span className="text-xs text-gray-300">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="mt-4">
                <p className="text-center text-gray-400 text-sm">Total Portfolio Value</p>
                <p className="text-center text-xl font-bold text-white">
                  {formatCurrency(totalPortfolioValue, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio holdings table */}
        <div className="lg:col-span-8">
          <div className="wayne-card">
            <div className="px-4 pt-4">
              <div className="flex space-x-1 border-b border-midnight-100">
                <button 
                  className={`px-4 py-2 text-sm transition-colors ${
                    activeTab === 'all' 
                      ? 'text-wayne-blue border-b-2 border-wayne-blue' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                  onClick={() => setActiveTab('all')}
                >
                  All Assets
                </button>
                <button 
                  className={`px-4 py-2 text-sm transition-colors ${
                    activeTab === 'stocks' 
                      ? 'text-wayne-blue border-b-2 border-wayne-blue' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                  onClick={() => setActiveTab('stocks')}
                >
                  Stocks
                </button>
                <button 
                  className={`px-4 py-2 text-sm transition-colors ${
                    activeTab === 'real_estate' 
                      ? 'text-wayne-blue border-b-2 border-wayne-blue' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                  onClick={() => setActiveTab('real_estate')}
                >
                  Real Estate
                </button>
                <button 
                  className={`px-4 py-2 text-sm transition-colors ${
                    activeTab === 'other' 
                      ? 'text-wayne-blue border-b-2 border-wayne-blue' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                  onClick={() => setActiveTab('other')}
                >
                  Other
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-gray-400 border-b border-midnight-100">
                      <th className="pb-2 text-left font-medium px-4">Asset</th>
                      <th className="pb-2 text-right font-medium px-4">Type</th>
                      <th className="pb-2 text-right font-medium px-4">Quantity</th>
                      <th className="pb-2 text-right font-medium px-4">Value</th>
                      <th className="pb-2 text-right font-medium px-4">Cost Basis</th>
                      <th className="pb-2 text-right font-medium px-4">Return</th>
                      <th className="pb-2 text-right font-medium px-4">Allocation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-midnight-100">
                    {mockPortfolioHoldings
                      .filter(holding => activeTab === 'all' || holding.type === activeTab || 
                        (activeTab === 'other' && !['stock', 'real_estate'].includes(holding.type)))
                      .map((holding) => {
                        const returnFormatted = formatColorizedPercent(holding.returnPercent);
                        
                        return (
                          <tr key={holding.id} className="hover:bg-midnight-200 transition-colors">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-gray-200">{holding.symbol}</p>
                                <p className="text-xs text-gray-400">{holding.name}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right capitalize text-gray-300">
                              {holding.type.replace('_', ' ')}
                            </td>
                            <td className="py-3 px-4 text-right text-gray-300">
                              {holding.quantity.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-right font-medium">
                              {formatCurrency(holding.value, 0)}
                            </td>
                            <td className="py-3 px-4 text-right text-gray-300">
                              {formatCurrency(holding.costBasis, 0)}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <span className={returnFormatted.className}>
                                {returnFormatted.text}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex flex-col items-end">
                                <span>{holding.allocation.toFixed(1)}%</span>
                                <div className="w-16 h-1.5 bg-midnight-200 rounded-full mt-1 overflow-hidden">
                                  <div 
                                    className="h-full bg-wayne-blue rounded-full"
                                    style={{ width: `${holding.allocation}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;