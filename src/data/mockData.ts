import { Asset, PortfolioHolding, PortfolioSummary, Transaction, TimeSeriesDataPoint, WayneEnterprise, MarketNews } from '../types';
import { subDays, format } from 'date-fns';

// Generate dates for historical data
const generateDates = (days: number): string[] => {
  return Array.from({ length: days }).map((_, i) => {
    return format(subDays(new Date(), days - i - 1), 'yyyy-MM-dd');
  });
};

// Mock assets
export const mockAssets: Asset[] = [
  { id: '1', name: 'Wayne Enterprises Inc.', symbol: 'WNE', type: 'stock', value: 2415.67, change: 12.34, changePercent: 0.51 },
  { id: '2', name: 'Gotham City Bank', symbol: 'GCB', type: 'stock', value: 187.45, change: -3.21, changePercent: -1.68 },
  { id: '3', name: 'Wayne Biotech', symbol: 'WNBI', type: 'stock', value: 432.19, change: 8.76, changePercent: 2.07 },
  { id: '4', name: 'Wayne Technologies', symbol: 'WNTC', type: 'stock', value: 876.54, change: 5.43, changePercent: 0.62 },
  { id: '5', name: 'Wayne Aerospace', symbol: 'WNAE', type: 'stock', value: 654.32, change: -2.87, changePercent: -0.44 },
  { id: '6', name: 'Wayne Healthcare', symbol: 'WNHC', type: 'stock', value: 321.98, change: 1.45, changePercent: 0.45 },
  { id: '7', name: 'Gotham City Real Estate', symbol: 'GCRE', type: 'real_estate', value: 5432100, change: 123450, changePercent: 2.33 },
  { id: '8', name: 'Wayne Foundation Bond', symbol: 'WFBND', type: 'bond', value: 1000000, change: 0, changePercent: 0 },
  { id: '9', name: 'Metropolis Tech Fund', symbol: 'MTFND', type: 'private_equity', value: 3500000, change: 75000, changePercent: 2.19 },
  { id: '10', name: 'Cash Reserves', symbol: 'CASH', type: 'cash', value: 25000000, change: 0, changePercent: 0 },
];

// Mock portfolio holdings
export const mockPortfolioHoldings: PortfolioHolding[] = [
  { id: '1', assetId: '1', name: 'Wayne Enterprises Inc.', symbol: 'WNE', type: 'stock', quantity: 1000000, value: 2415670000, costBasis: 1500000000, returnPercent: 61.04, allocation: 38.5 },
  { id: '2', assetId: '2', name: 'Gotham City Bank', symbol: 'GCB', type: 'stock', quantity: 500000, value: 93725000, costBasis: 87500000, returnPercent: 7.11, allocation: 1.5 },
  { id: '3', assetId: '7', name: 'Gotham City Real Estate', symbol: 'GCRE', type: 'real_estate', quantity: 1, value: 5432100000, costBasis: 4200000000, returnPercent: 29.34, allocation: 86.5 },
  { id: '4', assetId: '8', name: 'Wayne Foundation Bond', symbol: 'WFBND', type: 'bond', quantity: 1, value: 1000000000, costBasis: 1000000000, returnPercent: 0, allocation: 15.9 },
  { id: '5', assetId: '9', name: 'Metropolis Tech Fund', symbol: 'MTFND', type: 'private_equity', quantity: 1, value: 3500000000, costBasis: 3000000000, returnPercent: 16.67, allocation: 55.7 },
  { id: '6', assetId: '10', name: 'Cash Reserves', symbol: 'CASH', type: 'cash', quantity: 1, value: 25000000000, costBasis: 25000000000, returnPercent: 0, allocation: 39.8 },
];

// Mock portfolio summary
export const mockPortfolioSummary: PortfolioSummary = {
  totalValue: 37441495000,
  dailyChange: 187207475,
  dailyChangePercent: 0.5,
  monthlyChange: 1496859800,
  monthlyChangePercent: 4.17,
  yearToDateChange: 5616224250,
  yearToDateChangePercent: 17.65,
};

// Mock transactions
export const mockTransactions: Transaction[] = [
  { id: '1', date: '2025-05-28', assetId: '1', assetName: 'Wayne Enterprises Inc.', assetSymbol: 'WNE', type: 'buy', quantity: 5000, price: 2403.33, totalValue: 12016650, status: 'completed' },
  { id: '2', date: '2025-05-27', assetId: '5', assetName: 'Wayne Aerospace', assetSymbol: 'WNAE', type: 'sell', quantity: 2500, price: 657.19, totalValue: 1642975, status: 'completed' },
  { id: '3', date: '2025-05-25', assetId: '2', assetName: 'Gotham City Bank', assetSymbol: 'GCB', type: 'buy', quantity: 10000, price: 190.66, totalValue: 1906600, status: 'completed' },
  { id: '4', date: '2025-05-23', assetId: '9', assetName: 'Metropolis Tech Fund', assetSymbol: 'MTFND', type: 'transfer', quantity: 1, price: 3500000, totalValue: 3500000, status: 'completed' },
  { id: '5', date: '2025-05-21', assetId: '3', assetName: 'Wayne Biotech', assetSymbol: 'WNBI', type: 'buy', quantity: 8000, price: 423.43, totalValue: 3387440, status: 'completed' },
  { id: '6', date: '2025-05-21', assetId: '4', assetName: 'Wayne Technologies', assetSymbol: 'WNTC', type: 'buy', quantity: 3000, price: 871.11, totalValue: 2613330, status: 'completed' },
  { id: '7', date: '2025-05-20', assetId: '1', assetName: 'Wayne Enterprises Inc.', assetSymbol: 'WNE', type: 'dividend', quantity: 0, price: 0, totalValue: 5000000, status: 'completed' },
  { id: '8', date: '2025-05-18', assetId: '7', assetName: 'Gotham City Real Estate', assetSymbol: 'GCRE', type: 'buy', quantity: 1, price: 5308650, totalValue: 5308650, status: 'completed' },
];

// Mock historical portfolio value
const dates = generateDates(90);
export const mockPortfolioHistory: TimeSeriesDataPoint[] = dates.map((date, index) => {
  let baseValue = 32000000000; // Starting value 90 days ago
  
  // Add some randomness and an upward trend
  const randomFactor = Math.random() * 0.02 - 0.01; // Random between -1% and +1%
  const trendFactor = index * 0.001; // Slight upward trend
  
  // Special events to make the chart more interesting
  let eventImpact = 0;
  if (index === 30) eventImpact = -0.03; // Market downturn
  if (index === 45) eventImpact = 0.04; // Recovery
  if (index === 70) eventImpact = 0.05; // Major acquisition
  
  // Calculate value with randomness, trend and events
  const value = baseValue * (1 + randomFactor + trendFactor + eventImpact);
  
  return {
    date,
    value: Math.round(value),
  };
});

// Mock Wayne Enterprises subsidiaries
export const mockWayneEnterprises: WayneEnterprise[] = [
  { id: '1', name: 'Wayne Technologies', sector: 'Technology', value: 12500000000, performance: 12.7, revenue: 3500000000, profit: 1200000000 },
  { id: '2', name: 'Wayne Biotech', sector: 'Healthcare', value: 8700000000, performance: 9.4, revenue: 2100000000, profit: 780000000 },
  { id: '3', name: 'Wayne Aerospace', sector: 'Aerospace', value: 6300000000, performance: -2.1, revenue: 1800000000, profit: 540000000 },
  { id: '4', name: 'Wayne Chemicals', sector: 'Materials', value: 4900000000, performance: 3.2, revenue: 1500000000, profit: 420000000 },
  { id: '5', name: 'Wayne Healthcare', sector: 'Healthcare', value: 3800000000, performance: 5.6, revenue: 1200000000, profit: 320000000 },
  { id: '6', name: 'Wayne Foods', sector: 'Consumer Staples', value: 2100000000, performance: 1.8, revenue: 950000000, profit: 180000000 },
  { id: '7', name: 'Wayne Shipping', sector: 'Industrials', value: 1700000000, performance: -1.3, revenue: 720000000, profit: 130000000 },
  { id: '8', name: 'Wayne Steel', sector: 'Materials', value: 1400000000, performance: 0.5, revenue: 620000000, profit: 95000000 },
  { id: '9', name: 'Wayne Construction', sector: 'Industrials', value: 1200000000, performance: 2.7, revenue: 580000000, profit: 85000000 },
  { id: '10', name: 'Wayne Research Institute', sector: 'Research', value: 980000000, performance: 7.2, revenue: 320000000, profit: 75000000 },
];

// Mock market news
export const mockMarketNews: MarketNews[] = [
  { id: '1', title: 'Wayne Enterprises announces breakthrough in clean energy technology', source: 'Gotham Business Journal', date: '2025-05-28', url: '#', sentiment: 'positive', relevance: 95 },
  { id: '2', title: 'Wayne Biotech receives FDA approval for new cancer treatment', source: 'Metropolis Science Today', date: '2025-05-27', url: '#', sentiment: 'positive', relevance: 90 },
  { id: '3', title: 'Global markets experience volatility amid trade tensions', source: 'Financial Times', date: '2025-05-27', url: '#', sentiment: 'negative', relevance: 85 },
  { id: '4', title: 'Wayne Aerospace unveils next-generation aircraft prototype', source: 'Aviation Weekly', date: '2025-05-26', url: '#', sentiment: 'positive', relevance: 88 },
  { id: '5', title: 'Tech sector faces regulatory challenges in European markets', source: 'Euro Tech Report', date: '2025-05-26', url: '#', sentiment: 'negative', relevance: 75 },
  { id: '6', title: 'Wayne Foundation announces $500M investment in Gotham infrastructure', source: 'Gotham Gazette', date: '2025-05-25', url: '#', sentiment: 'positive', relevance: 92 },
  { id: '7', title: 'Federal Reserve signals potential interest rate changes', source: 'Wall Street Journal', date: '2025-05-24', url: '#', sentiment: 'neutral', relevance: 80 },
  { id: '8', title: 'Wayne Technologies partners with LexCorp on new initiative', source: 'Tech Insider', date: '2025-05-23', url: '#', sentiment: 'neutral', relevance: 85 },
];