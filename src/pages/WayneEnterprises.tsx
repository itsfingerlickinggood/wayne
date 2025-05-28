import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  ArrowUpDown, 
  BarChart, 
  TrendingUp, 
  TrendingDown,
  DollarSign
} from 'lucide-react';
import { mockWayneEnterprises } from '../data/mockData';
import { formatCurrency, formatLargeNumber, formatColorizedPercent } from '../utils/formatters';
import { motion } from 'framer-motion';

const WayneEnterprises: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('value');
  const [sortDirection, setSortDirection] = useState('desc');

  // Calculate total values
  const totalValue = mockWayneEnterprises.reduce((sum, enterprise) => sum + enterprise.value, 0);
  const totalRevenue = mockWayneEnterprises.reduce((sum, enterprise) => sum + enterprise.revenue, 0);
  const totalProfit = mockWayneEnterprises.reduce((sum, enterprise) => sum + enterprise.profit, 0);
  
  // Filter enterprises based on search term
  const filteredEnterprises = mockWayneEnterprises.filter(enterprise => 
    enterprise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enterprise.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort enterprises
  const sortedEnterprises = [...filteredEnterprises].sort((a, b) => {
    const sortValue = sortDirection === 'asc' ? 1 : -1;
    
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name) * sortValue;
    } else if (sortBy === 'sector') {
      return a.sector.localeCompare(b.sector) * sortValue;
    } else if (sortBy === 'performance') {
      return (a.performance - b.performance) * sortValue;
    } else if (sortBy === 'revenue') {
      return (a.revenue - b.revenue) * sortValue;
    } else if (sortBy === 'profit') {
      return (a.profit - b.profit) * sortValue;
    } else {
      // Default sort by value
      return (a.value - b.value) * sortValue;
    }
  });

  // Handle sort change
  const handleSortChange = (column: string) => {
    if (sortBy === column) {
      // Toggle sort direction if same column clicked
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New column, default to descending
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Building2 className="h-6 w-6 text-wayne-blue mr-2" />
          <h1 className="text-2xl font-bold text-gray-100">Wayne Enterprises</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="wayne-card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-400">Total Enterprise Value</h3>
            <Building2 className="h-5 w-5 text-wayne-blue" />
          </div>
          <p className="text-2xl font-bold">{formatCurrency(totalValue, 0)}</p>
          <p className="text-sm text-gray-400 mt-1">Across {mockWayneEnterprises.length} subsidiaries</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="wayne-card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-400">Annual Revenue</h3>
            <BarChart className="h-5 w-5 text-wayne-gold" />
          </div>
          <p className="text-2xl font-bold">{formatCurrency(totalRevenue, 0)}</p>
          <p className="text-sm text-gray-400 mt-1">
            Profit Margin: {((totalProfit / totalRevenue) * 100).toFixed(1)}%
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="wayne-card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-400">Annual Profit</h3>
            <DollarSign className="h-5 w-5 text-wayne-green" />
          </div>
          <p className="text-2xl font-bold">{formatCurrency(totalProfit, 0)}</p>
          <p className="text-sm text-gray-400 mt-1">
            Return on Assets: {((totalProfit / totalValue) * 100).toFixed(1)}%
          </p>
        </motion.div>
      </div>

      <div className="wayne-card">
        <div className="p-4 border-b border-midnight-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <h2 className="text-lg font-medium text-gray-200">Wayne Enterprises Subsidiaries</h2>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search subsidiaries..."
                className="wayne-input pl-9 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-400 border-b border-midnight-100">
                  <th className="pb-3 text-left font-medium px-4">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSortChange('name')}
                    >
                      Name
                      {sortBy === 'name' && (
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="pb-3 text-left font-medium px-4">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSortChange('sector')}
                    >
                      Sector
                      {sortBy === 'sector' && (
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="pb-3 text-right font-medium px-4">
                    <button 
                      className="flex items-center justify-end"
                      onClick={() => handleSortChange('value')}
                    >
                      Value
                      {sortBy === 'value' && (
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="pb-3 text-right font-medium px-4">
                    <button 
                      className="flex items-center justify-end"
                      onClick={() => handleSortChange('performance')}
                    >
                      Performance
                      {sortBy === 'performance' && (
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="pb-3 text-right font-medium px-4">
                    <button 
                      className="flex items-center justify-end"
                      onClick={() => handleSortChange('revenue')}
                    >
                      Revenue
                      {sortBy === 'revenue' && (
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      )}
                    </button>
                  </th>
                  <th className="pb-3 text-right font-medium px-4">
                    <button 
                      className="flex items-center justify-end"
                      onClick={() => handleSortChange('profit')}
                    >
                      Profit
                      {sortBy === 'profit' && (
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      )}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-midnight-100">
                {sortedEnterprises.map((enterprise) => {
                  const performanceFormatted = formatColorizedPercent(enterprise.performance);
                  const profitMargin = (enterprise.profit / enterprise.revenue) * 100;
                  
                  return (
                    <tr key={enterprise.id} className="hover:bg-midnight-200 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-medium text-gray-200">{enterprise.name}</p>
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {enterprise.sector}
                      </td>
                      <td className="py-4 px-4 text-right font-medium">
                        {formatCurrency(enterprise.value, 0)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end">
                          {enterprise.performance > 0 ? (
                            <TrendingUp className="h-4 w-4 text-wayne-green mr-1" />
                          ) : enterprise.performance < 0 ? (
                            <TrendingDown className="h-4 w-4 text-wayne-red mr-1" />
                          ) : null}
                          <span className={performanceFormatted.className}>
                            {performanceFormatted.text}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right text-gray-300">
                        {formatLargeNumber(enterprise.revenue)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div>
                          <p>{formatLargeNumber(enterprise.profit)}</p>
                          <p className="text-xs text-gray-400">
                            Margin: {profitMargin.toFixed(1)}%
                          </p>
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
  );
};

export default WayneEnterprises;