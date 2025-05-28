// Asset types
export interface Asset {
  id: string;
  name: string;
  symbol: string;
  type: 'stock' | 'bond' | 'real_estate' | 'private_equity' | 'cryptocurrency' | 'cash';
  value: number;
  change: number;
  changePercent: number;
  quantity?: number;
  costBasis?: number;
}

export interface PortfolioHolding {
  id: string;
  assetId: string;
  name: string;
  symbol: string;
  type: Asset['type'];
  quantity: number;
  value: number;
  costBasis: number;
  returnPercent: number;
  allocation: number;
}

export interface PortfolioSummary {
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
  monthlyChange: number;
  monthlyChangePercent: number;
  yearToDateChange: number;
  yearToDateChangePercent: number;
}

export interface Transaction {
  id: string;
  date: string;
  assetId: string;
  assetName: string;
  assetSymbol: string;
  type: 'buy' | 'sell' | 'dividend' | 'transfer';
  quantity: number;
  price: number;
  totalValue: number;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface TimeSeriesDataPoint {
  date: string;
  value: number;
}

export interface WayneEnterprise {
  id: string;
  name: string;
  sector: string;
  value: number;
  performance: number;
  revenue: number;
  profit: number;
}

export interface MarketNews {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  relevance: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'viewer';
  lastLogin: string;
}