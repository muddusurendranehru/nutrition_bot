import { describe, expect, it } from 'vitest';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNumber
} from '../src/utils/validators.js';

describe('validators', () => {
  describe('validateEmail', () => {
    it('accepts valid email', () => {
      const result = validateEmail('USER@example.com');
      expect(result.isValid).toBe(true);
      expect(result.formatted).toBe('user@example.com');
    });

    it('rejects invalid email', () => {
      const result = validateEmail('invalid-email');
      expect(result.isValid).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('accepts password with letters and numbers', () => {
      const result = validatePassword('abc123');
      expect(result.isValid).toBe(true);
    });

    it('rejects short password', () => {
      const result = validatePassword('a1');
      expect(result.isValid).toBe(false);
    });
  });

  describe('validatePhoneNumber', () => {
    it('formats phone number', () => {
      const result = validatePhoneNumber('9876543210');
      expect(result.isValid).toBe(true);
      expect(result.formatted).toBe('+9876543210');
    });

    it('allows empty phone number', () => {
      const result = validatePhoneNumber('');
      expect(result.isValid).toBe(true);
      expect(result.formatted).toBeNull();
    });
  });

  describe('validateName', () => {
    it('accepts valid name', () => {
      const result = validateName('Lakshmi Galla');
      expect(result.isValid).toBe(true);
      expect(result.formatted).toBe('Lakshmi Galla');
    });

    it('rejects invalid name', () => {
      const result = validateName('!!!');
      expect(result.isValid).toBe(false);
    });
  });
});

