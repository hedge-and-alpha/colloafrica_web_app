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
        return throwError(() => error);
      })
    );
  }
}
