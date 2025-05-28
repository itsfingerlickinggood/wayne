import React, { useState } from 'react';
import { 
  BarChart3, 
  Search, 
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Clock
} from 'lucide-react';
import { mockAssets } from '../data/mockData';
import { formatCurrency, formatColorizedPercent } from '../utils/formatters';

const Market: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter assets based on search term and active tab
  const filteredAssets = mockAssets.filter(asset => 
    (asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'all' || asset.type === activeTab)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BarChart3 className="h-6 w-6 text-wayne-blue mr-2" />
          <h1 className="text-2xl font-bold text-gray-100">Market Data</h1>
        </div>
        <button className="wayne-button-secondary flex items-center">
          <RefreshCw className="h-4 w-4 mr-2" />
          <span>Refresh Data</span>
        </button>
      </div>

      <div className="wayne-card">
        <div className="p-4 border-b border-midnight-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex space-x-1">
              <button 
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  activeTab === 'all' 
                    ? 'bg-wayne-blue text-white' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-midnight-200'
                }`}
                onClick={() => setActiveTab('all')}
              >
                All Assets
              </button>
              <button 
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  activeTab === 'stock' 
                    ? 'bg-wayne-blue text-white' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-midnight-200'
                }`}
                onClick={() => setActiveTab('stock')}
              >
                Stocks
              </button>
              <button 
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  activeTab === 'bond' 
                    ? 'bg-wayne-blue text-white' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-midnight-200'
                }`}
                onClick={() => setActiveTab('bond')}
              >
                Bonds
              </button>
              <button 
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  activeTab === 'real_estate' 
                    ? 'bg-wayne-blue text-white' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-midnight-200'
                }`}
                onClick={() => setActiveTab('real_estate')}
              >
                Real Estate
              </button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search assets..."
                className="wayne-input pl-9 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-400 mr-2" />
              <p className="text-xs text-gray-400">Last updated: May 28, 2025, 15:45 EST</p>
            </div>
            <p className="text-xs text-gray-400">
              Showing {filteredAssets.length} of {mockAssets.length} assets
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-400 border-b border-midnight-100">
                  <th className="pb-3 text-left font-medium px-4">Symbol</th>
                  <th className="pb-3 text-left font-medium px-4">Name</th>
                  <th className="pb-3 text-left font-medium px-4">Type</th>
                  <th className="pb-3 text-right font-medium px-4">Price</th>
                  <th className="pb-3 text-right font-medium px-4">Change</th>
                  <th className="pb-3 text-right font-medium px-4">% Change</th>
                  <th className="pb-3 text-right font-medium px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-midnight-100">
                {filteredAssets.map((asset) => {
                  const changePercentFormatted = formatColorizedPercent(asset.changePercent);
                  
                  return (
                    <tr key={asset.id} className="hover:bg-midnight-200 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-medium text-wayne-blue">{asset.symbol}</p>
                      </td>
                      <td className="py-4 px-4 text-gray-200">
                        {asset.name}
                      </td>
                      <td className="py-4 px-4 text-gray-300 capitalize">
                        {asset.type.replace('_', ' ')}
                      </td>
                      <td className="py-4 px-4 text-right font-medium">
                        {formatCurrency(asset.value)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end">
                          {asset.change > 0 ? (
                            <TrendingUp className="h-4 w-4 text-wayne-green mr-1" />
                          ) : asset.change < 0 ? (
                            <TrendingDown className="h-4 w-4 text-wayne-red mr-1" />
                          ) : null}
                          <span className={changePercentFormatted.className}>
                            {formatCurrency(asset.change)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={changePercentFormatted.className}>
                          {changePercentFormatted.text}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button className="px-3 py-1.5 text-xs bg-wayne-blue/10 text-wayne-blue rounded hover:bg-wayne-blue/20 transition-colors">
                            Buy
                          </button>
                          <button className="px-3 py-1.5 text-xs bg-midnight-200 text-gray-300 rounded hover:bg-midnight-100 transition-colors">
                            Details
                          </button>
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

export default Market;