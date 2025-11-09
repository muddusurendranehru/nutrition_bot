import validator from 'validator';

export interface ValidationResult {
  isValid: boolean;
  formatted?: string | null;
  message?: string;
}

export interface PasswordValidationResult extends ValidationResult {
  message: string;
}

export const validatePhoneNumber = (phone?: string | null): ValidationResult => {
  if (!phone || phone.trim() === '') {
    return { isValid: true, formatted: null };
  }

  const cleaned = phone.replace(/[^\d+]/g, '');

  if (cleaned.length >= 10 && cleaned.length <= 15) {
    const formatted = cleaned.startsWith('+') ? cleaned : `+${cleaned}`;
    return { isValid: true, formatted };
  }

  return { isValid: false, formatted: null, message: 'Invalid phone number' };
};

export const validateName = (name?: string | null): ValidationResult => {
  if (!name || name.trim() === '') {
    return { isValid: true, formatted: null };
  }

  const trimmedName = name.trim();

  if (trimmedName.length >= 1 && trimmedName.length <= 100) {
    const hasValidChars = /^[a-zA-Z\u00C0-\u017F\u0400-\u04FF\u4e00-\u9fff\s'.-]+$/.test(trimmedName);

    if (hasValidChars) {
      return {
        isValid: true,
        formatted: trimmedName.replace(/\s+/g, ' ')
      };
    }
  }

  return { isValid: false, formatted: null, message: 'Invalid name' };
};

export const validatePassword = (password?: string | null): PasswordValidationResult => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }

  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters' };
  }

  let hasLetter = false;
  let hasNumber = false;

  for (const char of password) {
    if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
      hasLetter = true;
    }
    if (char >= '0' && char <= '9') {
      hasNumber = true;
    }
  }

  if (!hasLetter || !hasNumber) {
    return {
      isValid: false,
      message: 'Password must contain at least one letter and one number'
    };
  }

  if (password.includes('<') || password.includes('>')) {
    return {
      isValid: false,
      message: 'Password contains invalid characters'
    };
  }

  return { isValid: true, message: 'Password is valid' };
};

export const validateEmail = (email?: string | null): ValidationResult => {
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }

  if (!validator.isEmail(email)) {
    return { isValid: false, message: 'Please enter a valid email' };
  }

  return { isValid: true, formatted: email.toLowerCase().trim() };
};

