import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

export class dashboardInterceptorInterceptor implements HttpInterceptor {
  #token = localStorage.getItem('AUTH_TOKEN');
  #router = inject(Router);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.#token}`),
    });
    const ignoredUrls = [
      'https://api-apps.vfdbank.systems/vtech-wallet/api/v1/wallet2/bank',
      'auth',
    ];

    if (ignoredUrls.includes(req.url)) {
      return next.handle(req);
    }

    // console.log('interceptor:', req.url);
    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.#router.navigate(['/auth']);
        }

        let errorMessage = '';

        if (error.status === 0) {
          errorMessage +=
            'An error occurred: Unable to complete the request. This might be due to network issues, server downtime, or CORS restrictions. Please check your internet connection and try again.';
        }

        console.log('error:', error);

        // if (error.status === 0) {
        //   return throwError(() => ({
        //     ...error,
        //     error: { ...error.error, message: errorMessage },
        //   }));
        // }
        return throwError(() => error);
      })
    );
  }
}
