import { InjectionToken } from '@angular/core';

export const ERROR_MESSAGES: Record<string, string> = {
  required: 'This field is required',
  requiredTrue: 'This field is required',
  email: 'This should be a valid email',
  emptyField: 'This field should not be empty',
  pattern: 'This pattern is invalid',
  matchPassword: 'This field does not match',
  max: 'The value is too large',
  min: 'The value is too small',
  maxLength: 'The value is too long',
  maxlength: 'The value is too long',
  minLength: 'The value is too short',
  minlength: 'The value is too short',
  deadline: 'Deadline date cannot be greater than start date',
};

export const VALIDATION_ERROR_MESSAGES = new InjectionToken(
  'Validation messages',
  { providedIn: 'root', factory: () => ERROR_MESSAGES }
);
