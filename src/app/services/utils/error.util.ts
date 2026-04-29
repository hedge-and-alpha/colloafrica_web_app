import { HttpErrorResponse } from '@angular/common/http';

export function getErrorMessage(error: HttpErrorResponse): string {
  if (error.status === 0) {
    return 'Network error. Please check your internet connection and try again.';
  }
  return error?.error?.message || 'Something went wrong. Please try again.';
}