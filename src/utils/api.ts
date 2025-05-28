import axios from 'axios';

// API configuration
const PERPLEXITY_API_KEY = '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';
const FINNHUB_API_KEY = 'd0riqhhr01qumepefum0d0riqhhr01qumepefumg';

// Perplexity Sonar API client
const perplexityClient = axios.create({
  baseURL: 'https://api.perplexity.ai',
  headers: {
    'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Finnhub API client
const finnhubClient = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  headers: {
    'X-Finnhub-Token': FINNHUB_API_KEY,
  },
});

// Perplexity Sonar API functions
export const analyzeSentiment = async (text: string) => {
  try {
    const response = await perplexityClient.post('/chat/completions', {
      model: 'sonar-medium-online',
      messages: [
        {
          role: 'system',
          content: 'Analyze the sentiment of the following text and provide insights relevant to financial markets.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
};

export const getMarketAnalysis = async (query: string) => {
  try {
    const response = await perplexityClient.post('/chat/completions', {
      model: 'sonar-medium-online',
      messages: [
        {
          role: 'system',
          content: 'Provide detailed market analysis and insights based on the following query.',
        },
        {
          role: 'user',
          content: query,
        },
      ],
    });
    return response.data;
  } catch (error) {
    console.error('Error getting market analysis:', error);
    throw error;
  }
};

// Finnhub API functions
export const getCompanyProfile = async (symbol: string) => {
  try {
    const response = await finnhubClient.get(`/stock/profile2`, {
      params: { symbol },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching company profile:', error);
    throw error;
  }
};

export const getStockQuote = async (symbol: string) => {
  try {
    const response = await finnhubClient.get(`/quote`, {
      params: { symbol },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    throw error;
  }
};

export const getCompanyNews = async (symbol: string) => {
  const today = new Date();
  const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
  
  try {
    const response = await finnhubClient.get(`/company-news`, {
      params: {
        symbol,
        from: lastMonth.toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0],
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching company news:', error);
    throw error;
  }
};

export const getMarketNews = async () => {
  try {
    const response = await finnhubClient.get(`/news`, {
      params: { category: 'general' },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market news:', error);
    throw error;
  }
};

export const getStockCandles = async (symbol: string, resolution = 'D', from: number, to: number) => {
  try {
    const response = await finnhubClient.get(`/stock/candle`, {
      params: {
        symbol,
        resolution,
        from,
        to,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock candles:', error);
    throw error;
  }
};