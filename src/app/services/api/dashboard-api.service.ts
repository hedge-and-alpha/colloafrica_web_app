import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../interfaces/api-response';
import { MGR } from '../../interfaces/mgr.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {
  private readonly baseUrl = environment.API_BASE_URL;

  private get authToken(): string | null {
    return localStorage.getItem('AUTH_TOKEN');
  }

  constructor(private readonly http: HttpClient) { }

  /** Create authorization headers */
  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`
    });
  }

  /** Create a new regular MGR plan */
  createMGR(data: Record<string, unknown>): Observable<ApiResponse & { data: MGR }> {
    return this.http.post<ApiResponse & { data: MGR }>(
      `${this.baseUrl}/mgr/create`,
      data,
      { headers: this.getAuthHeaders() }
    );
  }

  /** Create a new public MGR plan */
  createPublicMgr(data: Record<string, unknown>): Observable<ApiResponse & { data: MGR }> {
    return this.http.post<ApiResponse & { data: MGR }>(
      `${this.baseUrl}/mgr/create-public`,
      data,
      { headers: this.getAuthHeaders() }
    );
  }

  /** Get details for a specific MGR plan */
  getMgrDetails(mgrId: string): Observable<ApiResponse & { data: MGR }> {
    return this.http.get<ApiResponse & { data: MGR }>(
      `${this.baseUrl}/mgr/${mgrId}`,
      { headers: this.getAuthHeaders() }
    );
  }
}
