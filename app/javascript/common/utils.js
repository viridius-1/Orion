const formatRange = (range) => {
  if (range[0] !== range[1]) {
    return `${range[0]} - ${range[1]}`
  } else {
    return range[0];
  }
}

const moneyFormatter = (value, currency = 'USD') => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  });
  return `${formatter.format(value)} ${currency}`;
}

export {
  formatRange,
  moneyFormatter
}
