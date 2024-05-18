import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DashboardErrorHandlerService implements ErrorHandler {
  handleError(error: any): void {
    console.log('custom error handler', error);
    throw new Error('Method not implemented.');
  }
}
