import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../interfaces/api-response';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN');
  private readonly baseUrl = environment.API_BASE_URL;

  constructor(private readonly http: HttpClient, private router: Router) {}

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
    return this.http.post<ApiResponse>(`${this.baseUrl}/auth/login`, data);
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
    return this.http
      .post<ApiResponse>(`${this.baseUrl}/auth/logout`, null, {
        headers: new HttpHeaders().append(
          'Authorization',
          `Bearer ${this.AUTH_TOKEN}`
        ),
      })
      .pipe(
        tap(() => {
          localStorage.removeItem('AUTH_TOKEN');
          this.router.navigate(['/auth']);
        })
      );
  }
}
