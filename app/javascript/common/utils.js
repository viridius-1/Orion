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

const numberFormatter = (value) => {
  return Number(value).toLocaleString('en', {useGrouping: true})
}

export {
  formatRange,
  moneyFormatter,
  numberFormatter
};
