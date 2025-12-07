import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ApiResponse, PaginatedData } from '../../interfaces/api-response';
import { BankAccount, Card } from '../../interfaces/bank-and-card';
import { MGR, MGRAnalytics, MGRContributionStats } from '../../interfaces/mgr.interface';
import { INotificationData } from '../../interfaces/notification';
import { User, VirtualAccount } from '../../interfaces/user';
import { IDashboardData } from '../../modules/dashboard/pages/home/models/home.model';

type ApiResponseWithData<T = unknown> = ApiResponse & { data: T };

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {
  private readonly baseUrl = environment.API_BASE_URL;

  private get authToken(): string | null {
    return localStorage.getItem('AUTH_TOKEN');
  }

  constructor(private readonly http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`
    });
  }

  createMGR(data: Record<string, unknown>): Observable<ApiResponse & { data: MGR }> {
    return this.http.post<ApiResponse & { data: MGR }>(
      `${this.baseUrl}/mgr/create`,
      data,
      { headers: this.getAuthHeaders() }
    );
  }

  createPublicMgr(data: Record<string, unknown>): Observable<ApiResponse & { data: MGR }> {
    return this.http.post<ApiResponse & { data: MGR }>(
      `${this.baseUrl}/mgr/create-public`,
      data,
      { headers: this.getAuthHeaders() }
    );
  }

  getMgrDetails(mgrId: string): Observable<ApiResponse & { data: MGR }> {
    return this.http.get<ApiResponse & { data: MGR }>(
      `${this.baseUrl}/mgr/${mgrId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  verifyBvn(data: Record<string, unknown>): Observable<ApiResponse & { data: VirtualAccount }> {
    return this.http.post<ApiResponse & { data: VirtualAccount }>(`${this.baseUrl}/verify-bvn`, data, { headers: this.getAuthHeaders() });
  }

  getTransactions(page?: number): Observable<ApiResponseWithData> {
    const endpoint = page ? `${this.baseUrl}/transaction?page=${page}` : `${this.baseUrl}/transaction`;
    return this.http.get<ApiResponseWithData>(endpoint, { headers: this.getAuthHeaders() });
  }

  getBankAccounts(): Observable<ApiResponseWithData> {
    return this.http.get<ApiResponseWithData>(`${this.baseUrl}/bank-accounts`, { headers: this.getAuthHeaders() });
  }

  getBanks(): Observable<ApiResponseWithData> {
    return this.http.get<ApiResponseWithData>(`${this.baseUrl}/banks`, { headers: this.getAuthHeaders() });
  }

  addBankAccount(data: Record<string, unknown>): Observable<ApiResponse & { data: BankAccount }> {
    return this.http.post<ApiResponse & { data: BankAccount }>(`${this.baseUrl}/bank-accounts`, data, { headers: this.getAuthHeaders() });
  }

  deleteBankAccount(id: string): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/bank-accounts/${id}`, { headers: this.getAuthHeaders() });
  }

  primaryBankAccount(id: string): Observable<ApiResponse & { data: BankAccount }> {
    return this.http.put<ApiResponse & { data: BankAccount }>(`${this.baseUrl}/bank-accounts/${id}/primary`, {}, { headers: this.getAuthHeaders() });
  }

  getBankCards(): Observable<unknown> {
    return this.http.get(`${this.baseUrl}/bank-cards`, { headers: this.getAuthHeaders() });
  }

  addBankCard(data: Record<string, unknown>): Observable<ApiResponse & { data: Card }> {
    return this.http.post<ApiResponse & { data: Card }>(`${this.baseUrl}/bank-cards`, data, { headers: this.getAuthHeaders() });
  }

  deleteBankCard(id: string): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/bank-cards/${id}`, { headers: this.getAuthHeaders() });
  }

  requestOtp(): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/otp/request`, {}, { headers: this.getAuthHeaders() });
  }

  initiateWithdrawal(data: Record<string, unknown>): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/withdrawal/initiate`, data, { headers: this.getAuthHeaders() });
  }

  getDashboardData(): Observable<ApiResponse & { data: IDashboardData }> {
    return this.http.get<ApiResponse & { data: IDashboardData }>(`${this.baseUrl}/dashboard`, { headers: this.getAuthHeaders() });
  }

  getMgrByInviteLink(link: string): Observable<ApiResponse & { data: { mgr: MGR, available_positions: number[] } }> {
    return this.http.get<ApiResponse & { data: { mgr: MGR, available_positions: number[] } }>(
      `${this.baseUrl}/mgr/invite/${link}`,
      { headers: this.getAuthHeaders() }
    );
  }

  getMGRById(mgrId: string): Observable<ApiResponse & { data: MGR }> {
    return this.http.get<ApiResponse & { data: MGR }>(`${this.baseUrl}/mgr/${mgrId}`, { headers: this.getAuthHeaders() });
  }

  cancelMgrPlan(planId: string): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/mgr/${planId}/cancel`, { headers: this.getAuthHeaders() });
  }

  getMgrPlanAvailableSlots(mgrId: string): Observable<number[]> {
    return this.http.get<ApiResponse & { data: number[] }>(`${this.baseUrl}/mgr/${mgrId}/available-slots`, { headers: this.getAuthHeaders() }).pipe(map(res => res.data));
  }

  changeMgrPosition(mgrId: string, slotNumber: number): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/mgr/${mgrId}/position`, { slot_number: slotNumber }, { headers: this.getAuthHeaders() });
  }

  updateMGR(mgrId: string, data: Record<string, unknown>): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/mgr/${mgrId}`, data, { headers: this.getAuthHeaders() });
  }

  getMgrAnalyticsById(mgrId: string): Observable<ApiResponse & { data: MGRAnalytics }> {
    return this.http.get<ApiResponse & { data: MGRAnalytics }>(`${this.baseUrl}/mgr/${mgrId}/analytics`, { headers: this.getAuthHeaders() });
  }

  getMgrPlanContributionStats(mgrId: string, cycle: number): Observable<ApiResponse & { data: MGRContributionStats[] }> {
    return this.http.get<ApiResponse & { data: MGRContributionStats[] }>(`${this.baseUrl}/mgr/${mgrId}/contribution-stats/${cycle}`, { headers: this.getAuthHeaders() });
  }

  removeMember(planId: string, userId: string | number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/mgr/${planId}/members/${userId}`, { headers: this.getAuthHeaders() });
  }

  leavePlan(planId: string, userId: string | number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/mgr/${planId}/leave`, { headers: this.getAuthHeaders() });
  }

  proposePositionSwap(planId: string, userId: string | number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/mgr/${planId}/swap-proposal`, { target_user_id: userId }, { headers: this.getAuthHeaders() });
  }

  joinMgrByInviteLink(inviteId: string, position?: number): Observable<ApiResponse & { data: { mgr: MGR } }> {
    return this.http.post<ApiResponse & { data: { mgr: MGR } }>(`${this.baseUrl}/mgr/join/${inviteId}`, { position }, { headers: this.getAuthHeaders() });
  }

  joinPublicMgr(mgrId: string, data: Record<string, unknown>): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/mgr/${mgrId}/join-public`, data, { headers: this.getAuthHeaders() });
  }

  checkPublicMgrPermission(): Observable<ApiResponse & { data: { can_create: boolean } }> {
    return this.http.get<ApiResponse & { data: { can_create: boolean } }>(`${this.baseUrl}/mgr/public/permission`, { headers: this.getAuthHeaders() });
  }

  getPublicMgrs(): Observable<ApiResponse & { data: PaginatedData<MGR> }> {
    return this.http.get<ApiResponse & { data: PaginatedData<MGR> }>(`${this.baseUrl}/mgr/public`, { headers: this.getAuthHeaders() });
  }

  getAdminMGR(status?: string): Observable<unknown> {
    const endpoint = status ? `${this.baseUrl}/mgr/admin?status=${status}` : `${this.baseUrl}/mgr/admin`;
    return this.http.get(endpoint, { headers: this.getAuthHeaders() });
  }

  getParticipantMGR(status?: string): Observable<unknown> {
    const endpoint = status ? `${this.baseUrl}/mgr/participant?status=${status}` : `${this.baseUrl}/mgr/participant`;
    return this.http.get(endpoint, { headers: this.getAuthHeaders() });
  }

  initiateMgrRollover(mgrId: string): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/mgr/${mgrId}/rollover`, {}, { headers: this.getAuthHeaders() });
  }

  getUnreadNotifications(): Observable<ApiResponse & { data: INotificationData[] }> {
    return this.http.get<ApiResponse & { data: INotificationData[] }>(`${this.baseUrl}/notifications/unread`, { headers: this.getAuthHeaders() });
  }

  manageSwapRequests(action: string, swapRequestId: string | number, notificationId: string | number): Observable<ApiResponse> {
    const data = { swap_request_id: swapRequestId, notification_id: notificationId };
    return this.http.post<ApiResponse>(`${this.baseUrl}/mgr/swap-requests/${action}`, data, { headers: this.getAuthHeaders() });
  }

  updateIdCardDetails(data: Record<string, unknown>): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/profile/id-card`, data, { headers: this.getAuthHeaders() });
  }

  updatePersonalInfo(data: Record<string, unknown>): Observable<unknown> {
    return this.http.put(`${this.baseUrl}/profile/personal`, data, { headers: this.getAuthHeaders() });
  }

  updatePersonalContactInfo(data: Record<string, unknown>): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/profile/contact`, data, { headers: this.getAuthHeaders() });
  }

  updatePersonalEmploymentInfo(data: Record<string, unknown>): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/profile/employment`, data, { headers: this.getAuthHeaders() });
  }

  updatePersonalNokInfo(data: Record<string, unknown>): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/profile/nok`, data, { headers: this.getAuthHeaders() });
  }

  uploadProfilePicture(data: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/profile/picture`, data, { headers: this.getAuthHeaders() });
  }

  changePassword(data: Record<string, unknown>): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/profile/change-password`, data, { headers: this.getAuthHeaders() });
  }

  getUser(): Observable<ApiResponseWithData<User>> {
    return this.http.get<ApiResponseWithData<User>>(`${this.baseUrl}/user`, { headers: this.getAuthHeaders() });
  }
}
