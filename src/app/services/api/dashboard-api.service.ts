import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../interfaces/user';
import { UserStoreService } from '../../stores+/user.store';
import { map, tap } from 'rxjs';

@Injectable()
export class DashboardApiService {
  #baseUrl = environment.API_BASE_URL;

  constructor(private http: HttpClient, private userStore: UserStoreService) {}

  getUser() {
    return this.http
      .get<{ data: { users: User } }>(`${this.#baseUrl}/user`)
      .pipe(
        map(({ data }) => data.users),
        tap((user) => {
          this.userStore.user = user;
        })
      );
  }
}
