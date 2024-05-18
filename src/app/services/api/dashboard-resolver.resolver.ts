import { ResolveFn, Router } from '@angular/router';
import { DashboardApiService } from './dashboard-api.service';
import { inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { catchError, of } from 'rxjs';

export const dashboardResolverResolver: ResolveFn<User> | null = (
  route,
  state
) => {
  const router = inject(Router);

  return inject(DashboardApiService)
    .getUser()
    .pipe(
      catchError((error) => {
        console.log('resolve error', error);
        // router.navigate(['/error']);
        return of(error);
      })
    );
};
