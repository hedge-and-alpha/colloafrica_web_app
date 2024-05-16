import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('AUTH_TOKEN');
  const router = inject(Router);
  const auth = inject(AuthService);

  if (!token) {
    auth.url = state.url;
    router.navigate(['/auth']);
    return false;
  }
  return true;
};
