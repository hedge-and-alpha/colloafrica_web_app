import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../interfaces/api-response';
import { User } from '../../interfaces/user';
import { UserStoreService } from '../../stores+/user.store';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly baseUrl = environment.API_BASE_URL;
  
  get authToken(): string | null {
    return localStorage.getItem('AUTH_TOKEN');
  }
  
  private set authToken(token: string | null) {
    if (token) {
      localStorage.setItem('AUTH_TOKEN', token);
    } else {
      localStorage.removeItem('AUTH_TOKEN');
    }
  }

  constructor(
    private readonly http: HttpClient,
    private router: Router,
    private userStore: UserStoreService
  ) {}

  registerUser(data: object) {
    return this.http.post<ApiResponse>(`${this.baseUrl}/auth/register`, data);
  }

  EmailVerification(code: string) {
    return this.http.post<ApiResponse>(`${this.baseUrl}/auth/verification`, {
      verification_code: code,
    });
  }

  resendVerificationCode(email: string) {
    return this.http.post<ApiResponse>(
      `${this.baseUrl}/auth/resend-verification-code`,
      { email }
    );
  }

  login(data: object) {
    return this.http
      .post<ApiResponse & { data: { user: User; token: string } }>(
        `${this.baseUrl}/auth/login`,
        data
      )
      .pipe(
        tap(({ data: { user, token } }) => {
          this.userStore.user = user;
          this.authToken = token;
        })
      );
  }

  forgotPassword(email: string) {
    return this.http.post<ApiResponse>(`${this.baseUrl}/auth/forgot-password`, {
      email,
    });
  }

  resetPassword(data: object) {
    return this.http.post<ApiResponse>(
      `${this.baseUrl}/auth/reset-password`,
      data
    );
  }

  logoutUser() {
    const token = this.authToken;
    this.clearAuth();
    
    return this.http.post<ApiResponse>(`${this.baseUrl}/auth/logout`, null, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }
  
  validateToken(): Observable<boolean> {
    return this.http.get<{ valid: boolean }>(
      `${this.baseUrl}/auth/validate-token`,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.authToken}`
        })
      }
    ).pipe(
      map((response: { valid: boolean }) => response.valid),
      catchError(() => of(false))
    );
  }

  clearAuth() {
    this.authToken = null;
    this.userStore.user = null;
  }
}
