import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  private readonly baseUrl = environment.API_BASE_URL;
  
  get authToken(): string | null {
    return localStorage.getItem('AUTH_TOKEN');
  }

  constructor(private readonly http: HttpClient) {}

  /**
   * Check if current user has admin permissions
   */
  checkAdminPermissions(): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.get<ApiResponse & { data: { is_admin: boolean } }>(
      `${this.baseUrl}/admin/check-permissions`,
      { headers }
    ).pipe(
      map((response) => response.data?.is_admin || false),
      catchError(() => of(false))
    );
  }

  /**
   * Get admin dashboard analytics
   */
  getDashboardAnalytics(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.get<ApiResponse & { data: any }>(
      `${this.baseUrl}/admin/dashboard/analytics`,
      { headers }
    );
  }

  /**
   * Get MGR management data
   */
  getMgrManagementData(status?: string, page = 1, perPage = 10): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    let endpoint = `${this.baseUrl}/admin/mgr-management?page=${page}&per_page=${perPage}`;
    if (status) {
      endpoint += `&status=${status}`;
    }

    return this.http.get<ApiResponse & { data: any }>(endpoint, { headers });
  }

  /**
   * Approve/Reject MGR
   */
  updateMgrStatus(mgrId: string, action: 'approve' | 'reject', notes?: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.post<ApiResponse>(
      `${this.baseUrl}/admin/mgr/${mgrId}/${action}`,
      { notes },
      { headers }
    );
  }

  /**
   * Get user management data
   */
  getUserManagementData(search?: string, page = 1, perPage = 10): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    let endpoint = `${this.baseUrl}/admin/user-management?page=${page}&per_page=${perPage}`;
    if (search) {
      endpoint += `&search=${encodeURIComponent(search)}`;
    }

    return this.http.get<ApiResponse & { data: any }>(endpoint, { headers });
  }

  /**
   * Grant pilot user permissions
   */
  grantPilotPermissions(userId: number, permissions: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.post<ApiResponse>(
      `${this.baseUrl}/admin/users/${userId}/grant-pilot`,
      permissions,
      { headers }
    );
  }

  /**
   * Revoke pilot user permissions
   */
  revokePilotPermissions(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.delete<ApiResponse>(
      `${this.baseUrl}/admin/users/${userId}/revoke-pilot`,
      { headers }
    );
  }

  /**
   * Get platform settings
   */
  getPlatformSettings(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.get<ApiResponse & { data: any }>(
      `${this.baseUrl}/admin/settings`,
      { headers }
    );
  }

  /**
   * Update platform settings
   */
  updatePlatformSettings(settings: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.put<ApiResponse>(
      `${this.baseUrl}/admin/settings`,
      settings,
      { headers }
    );
  }
} 