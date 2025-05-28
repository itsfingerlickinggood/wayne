import axios from 'axios';

// API configuration
const PERPLEXITY_API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY || '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';
const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY || 'd0riqhhr01qumepefum0d0riqhhr01qumepefumg';

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
    return mockSentimentAnalysis(text);
  }
};

// Mock sentiment analysis for fallback
const mockSentimentAnalysis = (text: string) => {
  const randomSentiment = Math.random();
  let sentiment;
  
  if (randomSentiment > 0.6) sentiment = 'positive';
  else if (randomSentiment > 0.3) sentiment = 'neutral';
  else sentiment = 'negative';
  
  return {
    choices: [{
      message: {
        content: `The sentiment of this text appears to be ${sentiment}.`
      }
    }]
  };
};

// Finnhub API functions with mock fallback
export const getMarketNews = async () => {
  try {
    const response = await finnhubClient.get('/news', {
      params: { category: 'general' }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market news:', error);
    return generateMockNews(30);
  }
};

// Generate mock news data
const generateMockNews = (count: number) => {
  const sources = ['Bloomberg', 'Reuters', 'Financial Times', 'Wall Street Journal', 'CNBC'];
  const headlines = [
    'Wayne Enterprises Announces Revolutionary Clean Energy Initiative',
    'Global Markets Rally on Tech Sector Gains',
    'Federal Reserve Signals Potential Rate Changes',
    'Emerging Markets Show Strong Growth Potential',
    'Cybersecurity Concerns Rise in Financial Sector',
    'New Regulations Impact Banking Industry',
    'AI Adoption Accelerates in Financial Services',
    'Market Volatility Increases Amid Global Tensions',
    'Sustainable Investing Trends Gain Momentum',
    'Digital Currency Developments Shape Financial Landscape'
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `news-${i}`,
    headline: headlines[i % headlines.length],
    source: sources[Math.floor(Math.random() * sources.length)],
    datetime: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000),
    url: '#',
    sentiment: Math.random() > 0.5 ? 'positive' : Math.random() > 0.5 ? 'neutral' : 'negative',
    relevance: Math.floor(Math.random() * 30) + 70
  }));
};

export const getStockQuote = async (symbol: string) => {
  try {
    const response = await finnhubClient.get('/quote', {
      params: { symbol }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    return generateMockQuote(symbol);
  }
};

// Generate mock stock quote
const generateMockQuote = (symbol: string) => {
  const basePrice = 100 + Math.random() * 900;
  const change = (Math.random() - 0.5) * 10;
  
  return {
    c: basePrice,
    h: basePrice + Math.random() * 10,
    l: basePrice - Math.random() * 10,
    o: basePrice - change,
    pc: basePrice - change,
    t: Date.now()
  };
};