export function normalizeCounterValue(value?: number | string) {
  if (value === undefined || value === null) {
    return '';
  }

  const stringValue = String(value).trim();

  if (stringValue === '') {
    return '';
  }

  if (!/^-?\d+$/.test(stringValue)) {
    return stringValue;
  }

  const numericValue = Math.max(0, Number.parseInt(stringValue, 10));

  if (numericValue >= 100) {
    return '99+';
  }

  return String(numericValue);
}
