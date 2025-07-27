import { inject } from '@angular/core';
import { CanActivateFn, Router, type RouterStateSnapshot, type ActivatedRouteSnapshot } from '@angular/router';
import { type Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { AuthApiService } from '../../services/api/auth-api.service';
import { AdminApiService } from '../../services/api/admin-api.service';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const authApi = inject(AuthApiService);
  const adminApi = inject(AdminApiService);
  
  const token = localStorage.getItem('AUTH_TOKEN');
  
  // If no token, redirect to login
  if (!token) {
    auth.url = state.url;
    router.navigate(['/auth']);
    return of(false);
  }
  
  // First validate the token, then check admin permissions
  return authApi.validateToken().pipe(
    switchMap((isValid: boolean) => {
      if (!isValid) {
        // Clear invalid auth data and redirect to login
        authApi.clearAuth();
        auth.url = state.url;
        router.navigate(['/auth']);
        return of(false);
      }
      
      // Token is valid, now check admin permissions
      return adminApi.checkAdminPermissions().pipe(
        map((hasAdminAccess: boolean) => {
          if (hasAdminAccess) {
            return true;
          } else {
            // User doesn't have admin access, redirect to dashboard
            router.navigate(['/']);
            return false;
          }
        }),
        catchError(() => {
          // Error checking admin permissions, redirect to dashboard
          router.navigate(['/']);
          return of(false);
        })
      );
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