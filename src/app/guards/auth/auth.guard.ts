import { inject } from '@angular/core';
import { CanActivateFn, Router, type RouterStateSnapshot, type ActivatedRouteSnapshot } from '@angular/router';
import { type Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { AuthApiService } from '../../services/api/auth-api.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
 ): Observable<boolean> => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const authApi = inject(AuthApiService);
  
  const token = localStorage.getItem('AUTH_TOKEN');
  
  // If no token, redirect to login and return false as observable
  if (!token) {
    auth.url = state.url;
    router.navigate(['/auth']);
    return of(false);
  }
  
  // If there's a token, validate it with the server
  return authApi.validateToken().pipe(
    map((isValid: boolean) => {
      if (isValid) {
        return true;
      } else {
        // Clear invalid auth data and redirect to login
        authApi.clearAuth();
        auth.url = state.url;
        router.navigate(['/auth']);
        return false;
      }
    }),
    catchError(() => {
      // Handle network errors by clearing auth and redirecting
      authApi.clearAuth();
      auth.url = state.url;
      router.navigate(['/auth']);
      return of(false);
    })
  );
};
