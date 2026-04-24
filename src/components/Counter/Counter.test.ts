import { describe, expect, it } from 'vitest';
import { normalizeCounterValue } from './Counter.utils';

describe('normalizeCounterValue', () => {
  it('uses an empty string for indicator-only counters', () => {
    expect(normalizeCounterValue('')).toBe('');
    expect(normalizeCounterValue('   ')).toBe('');
  });

  it('caps values greater than or equal to 100', () => {
    expect(normalizeCounterValue('100')).toBe('99+');
    expect(normalizeCounterValue(128)).toBe('99+');
  });

  it('normalizes integer-like values predictably', () => {
    expect(normalizeCounterValue('007')).toBe('7');
    expect(normalizeCounterValue('-4')).toBe('0');
  });

  it('keeps non-numeric labels intact', () => {
    expect(normalizeCounterValue('new')).toBe('new');
    expect(normalizeCounterValue('12abc')).toBe('12abc');
  });
});
