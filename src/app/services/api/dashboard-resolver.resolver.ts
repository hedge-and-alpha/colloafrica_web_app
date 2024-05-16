import { ResolveFn } from '@angular/router';
import { DashboardApiService } from './dashboard-api.service';
import { inject } from '@angular/core';
import { User } from '../../interfaces/user';

export const dashboardResolverResolver: ResolveFn<User> = (route, state) => {
  return inject(DashboardApiService).getUser();
};
