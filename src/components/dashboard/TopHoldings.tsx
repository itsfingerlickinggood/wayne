import React from 'react';
import { mockPortfolioHoldings } from '../../data/mockData';
import { formatCurrency, formatColorizedPercent } from '../../utils/formatters';

const TopHoldings: React.FC = () => {
  // Sort holdings by value (descending) and take top 5
  const topHoldings = [...mockPortfolioHoldings]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="wayne-card">
      <div className="wayne-widget-header px-4 pt-4">
        <h3 className="wayne-widget-title">Top Holdings</h3>
        <button className="text-xs text-wayne-blue hover:text-blue-400 transition-colors">
          View All
        </button>
      </div>
      
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-midnight-100">
                <th className="pb-2 text-left font-medium">Asset</th>
                <th className="pb-2 text-right font-medium">Value</th>
                <th className="pb-2 text-right font-medium">Return</th>
                <th className="pb-2 text-right font-medium">Allocation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-midnight-100">
              {topHoldings.map((holding) => {
                const returnFormatted = formatColorizedPercent(holding.returnPercent);
                
                return (
                  <tr key={holding.id} className="hover:bg-midnight-200 transition-colors">
                    <td className="py-3">
                      <div>
                        <p className="font-medium text-gray-200">{holding.symbol}</p>
                        <p className="text-xs text-gray-400">{holding.name}</p>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      {formatCurrency(holding.value, 0)}
                    </td>
                    <td className="py-3 text-right">
                      <span className={returnFormatted.className}>
                        {returnFormatted.text}
                      </span>
                    </td>
                    <td className="py-3 text-right">
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
  );
};

export default TopHoldings;