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
import { AlertService } from '../../components/alert/alert.service';

export class dashboardInterceptorInterceptor implements HttpInterceptor {
  #token = localStorage.getItem('AUTH_TOKEN');
  #router = inject(Router);
  #alertService = inject(AlertService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${this.#token}`)
        .set('Content-Type', 'application/json'),
    });
    const ignoredUrls = [
      'https://api-apps.vfdbank.systems/vtech-wallet/api/v1/wallet2/bank',
      'auth',
    ];

    if (ignoredUrls.includes(req.url)) {
      return next.handle(req);
    }

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.#router.navigate(['/auth']);
        }

        let errorMessage = '';

        if (error.status === 0) {
          errorMessage +=
            'An error occurred: Unable to complete the request. This might be due to network issues, server downtime, or CORS restrictions. Please check your internet connection and try again.';
          this.#alertService.open(
            'danger',
            {
              summary: `Connection error occurred`,
              details: `${errorMessage}`,
              closable: true,
            },
            80000
          );
        } else {
          if (req.method === 'GET') {
            this.#alertService.open(
              'danger',
              {
                summary: `Access denied`,
                details: `Your access has been denied because: ${error.error.message}`,
                closable: true,
              },
              80000
            );
          }
        }

        return throwError(() => error);
      })
    );
  }
}
