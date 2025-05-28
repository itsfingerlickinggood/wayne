import React from 'react';
import { ArrowDown, ArrowUp, DollarSign, RefreshCw } from 'lucide-react';
import { mockTransactions } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/formatters';

const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'buy':
      return <ArrowDown className="h-4 w-4 text-wayne-green" />;
    case 'sell':
      return <ArrowUp className="h-4 w-4 text-wayne-red" />;
    case 'dividend':
      return <DollarSign className="h-4 w-4 text-wayne-gold" />;
    case 'transfer':
      return <RefreshCw className="h-4 w-4 text-wayne-blue" />;
    default:
      return null;
  }
};

const RecentTransactions: React.FC = () => {
  return (
    <div className="wayne-card">
      <div className="wayne-widget-header px-4 pt-4">
        <h3 className="wayne-widget-title">Recent Transactions</h3>
        <button className="text-xs text-wayne-blue hover:text-blue-400 transition-colors">
          View All
        </button>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {mockTransactions.slice(0, 5).map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-md hover:bg-midnight-200 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-midnight-200">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-200">{transaction.assetSymbol}</p>
                  <p className="text-xs text-gray-400">
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} • {formatDate(transaction.date)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {transaction.type === 'buy' && '−'}
                  {transaction.type === 'sell' && '+'}
                  {formatCurrency(transaction.totalValue, 0)}
                </p>
                {transaction.quantity > 0 && (
                  <p className="text-xs text-gray-400">
                    {transaction.quantity.toLocaleString()} {transaction.quantity === 1 ? 'unit' : 'units'} 
                    {transaction.price > 0 && ` @ ${formatCurrency(transaction.price)}`}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;