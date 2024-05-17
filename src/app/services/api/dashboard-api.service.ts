import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  BasicInfo,
  ContactInfo,
  EmploymentInfo,
  IDCard,
  NextOfKinInfo,
  User,
} from '../../interfaces/user';
import { UserStoreService } from '../../stores+/user.store';
import { map, tap } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';

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

  uploadProfilePicture(data: FormData) {
    return this.http
      .post<ApiResponse & { data: Pick<User, 'profile_picture'> }>(
        `${this.#baseUrl}/user/upload/profile-pic`,
        data
      )
      .pipe(tap((res) => this.userStore.updateUser(res.data as User)));
  }

  updatePersonalInfo(data: object) {
    return this.http
      .post<ApiResponse & { data: BasicInfo }>(
        `${this.#baseUrl}/user/update/personal-info`,
        data
      )
      .pipe(tap((res) => this.userStore.updateUser(res.data as User)));
  }

  updatePersonalContactInfo(data: object) {
    return this.http
      .post<ApiResponse & { data: ContactInfo }>(
        `${this.#baseUrl}/user/update/contact-info`,
        data
      )
      .pipe(tap((res) => this.userStore.updateUser(res.data as User)));
  }

  updatePersonalEmploymentInfo(data: object) {
    return this.http
      .post<ApiResponse & { data: EmploymentInfo }>(
        `${this.#baseUrl}/user/update/employment-info`,
        data
      )
      .pipe(tap((res) => this.userStore.updateUser(res.data as User)));
  }

  updatePersonalNokInfo(data: object) {
    return this.http
      .post<ApiResponse & { data: NextOfKinInfo }>(
        `${this.#baseUrl}/user/update/nextofkin-info`,
        data
      )
      .pipe(tap((res) => this.userStore.updateUser(res.data as User)));
  }

  updateIdCardDetails(data: object) {
    return this.http
      .post<ApiResponse & { data: IDCard }>(
        `${this.#baseUrl}/user/update/id-verification`,
        data
      )
      .pipe(tap((res) => this.userStore.updateUser(res.data as User)));
  }

  // updateIdCardDetails(data: object) {
  //   return this.http
  //     .post<ApiResponse & { data: IDCard }>(
  //       `${this.#baseUrl}/user/update/id-verification`,
  //       data
  //     )
  //     .pipe(
  //       map(({ data }) => data),
  //       tap((user) => this.userStore.updateUser(user as User))
  //     );
  // }
}
