
import { expect, test } from 'vitest'
import { hasSameChar } from './string'


test('it returns false for text without same chars', () => {
  const result = hasSameChar('abcde');
  expect(result).toBe(false);
})

test('it returns true for text with same chars', () => {
  const result = hasSameChar('hello');
  expect(result).toBe(true);
})

test('it returns true for text with same chars at start', () => {
  const result = hasSameChar('llemo');
  expect(result).toBe(true);
})

test('it returns true for text with multiple same letters', () => {
  const result = hasSameChar('samsungs');
  expect(result).toBe(true);
})