import { InjectionToken } from '@angular/core';

export const ERROR_MESSAGES: { [key: string]: string } = {
  required: 'This field is required',
  email: 'This should be a valid email',
  emptyField: 'This field should not be empty',
  pattern: 'This pattern is invalid',
  matchPassword: 'This field does not match',
};

export const VALIDATION_ERROR_MESSAGES = new InjectionToken(
  'Validation messages',
  { providedIn: 'root', factory: () => ERROR_MESSAGES }
);
