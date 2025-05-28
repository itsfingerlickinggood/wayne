/**
 * Format a number as currency
 */
export const formatCurrency = (value: number, maximumFractionDigits = 2): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits
  }).format(value);
};

/**
 * Format a number as percentage
 */
export const formatPercent = (value: number, maximumFractionDigits = 2): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits
  }).format(value / 100);
};

/**
 * Format a large number with appropriate suffix (K, M, B, T)
 */
export const formatLargeNumber = (value: number): string => {
  if (value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(2)}T`;
  } else if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`;
  }
  return value.toString();
};

/**
 * Format a date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

/**
 * Format a number with commas for thousands
 */
export const formatNumber = (value: number, maximumFractionDigits = 0): string => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits
  }).format(value);
};

/**
 * Get a color based on value (positive, negative, or neutral)
 */
export const getValueColor = (value: number): string => {
  if (value > 0) return 'text-wayne-green';
  if (value < 0) return 'text-wayne-red';
  return 'text-gray-400';
};

/**
 * Format and colorize a percentage value
 */
export const formatColorizedPercent = (value: number): { text: string; className: string } => {
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'percent',
    signDisplay: 'exceptZero',
    maximumFractionDigits: 2
  }).format(value / 100);
  
  let className = 'text-gray-400';
  if (value > 0) className = 'text-wayne-green';
  if (value < 0) className = 'text-wayne-red';
  
  return { text: formattedValue, className };
};

/**
 * Abbreviate a long string
 */
export const abbreviateString = (str: string, maxLength = 20): string => {
  if (str.length <= maxLength) return str;
  return `${str.substring(0, maxLength - 3)}...`;
};