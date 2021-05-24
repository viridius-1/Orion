const formatRange = (range) => {
  if (range[0] !== range[1]) {
    return `${range[0]} - ${range[1]}`;
  }
  return range[0];
};

const moneyFormatter = (value, currency = 'USD') => {
  const formatter = new Intl.NumberFormat('en-US', {
    currency,
    maximumFractionDigits: 0,
    style: 'currency',
  });
  return `${formatter.format(value)} ${currency}`;
};

export {
  formatRange,
  moneyFormatter,
};
