import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pipe, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Account, Transaction } from '../../interfaces/account';
import { ApiResponse, TablePagination } from '../../interfaces/api-response';
import { Bank, BankAccount, Card } from '../../interfaces/bank-and-card';
import {
  MGR,
  MGRAnalytics,
  MGRContributionStats,
} from '../../interfaces/mgr.interface';
import { INotificationData } from '../../interfaces/notification';
import {
  BasicInfo,
  ContactInfo,
  EmploymentInfo,
  IDCard,
  NextOfKinInfo,
  User,
  VirtualAccount,
} from '../../interfaces/user';
import { IDashboardData } from '../../modules/dashboard/pages/home/models/home.model';
import { CardAndBankStoreService } from '../../stores+/card-bank.store';
import { MgrStoreService } from '../../stores+/mgr.store';
import { TransactionStoreService } from '../../stores+/transaction.store';
import { UserStoreService } from '../../stores+/user.store';

@Injectable()
export class DashboardApiService {
  #baseUrl = environment.API_BASE_URL;

  // randome comment for pr testing
  constructor(
    private http: HttpClient,
    private userStore: UserStoreService,
    private cardBankStore: CardAndBankStoreService,
    private transactionStore: TransactionStoreService,
    private mgrStore: MgrStoreService
  ) { }

  getUser() {
    return this.http
      .get<{ data: { user: User } }>(`${this.#baseUrl}/user`)
      .pipe(
        map(({ data }) => data.user),
        tap((user) => {
          this.userStore.user = user;
        })
      );
  }

  getDashboardData() {
    return this.http
      .get<{ data: IDashboardData }>(`${this.#baseUrl}/user/dashboard`)
      .pipe(map((response) => response.data));
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

  getBanks() {
    return this.http
      .get<{ data: { bank: Bank[] } }>(
        'https://api-apps.vfdbank.systems/vtech-wallet/api/v1/wallet2/bank'
      )
      .pipe(
        map((res) => {
          const transformed = res.data.bank.map((b) => {
            return {
              bank_name: b.name,
              bank_code: b.code,
            };
          });
          return transformed;
        })
      );
  }

  getBankAccounts() {
    return this.http
      .get<ApiResponse & { data: { accounts: BankAccount[] } }>(
        `${this.#baseUrl}/bank`
      )
      .pipe(
        map((res) => res.data.accounts),
        tap((res) => {
          this.cardBankStore.setBankAccounts(res);
        })
      );
  }

  addBankAccount(data: object) {
    return this.http
      .post<ApiResponse & { data: BankAccount }>(
        `${this.#baseUrl}/bank/add`,
        data
      )
      .pipe(map((res) => res.data));
  }

  primaryBankAccount(id: string | number) {
    return this.http.post<ApiResponse & { data: BankAccount }>(
      `${this.#baseUrl}/bank/primary/${id}`,
      null
    );
  }

  deleteBankAccount(id: string | number) {
    return this.http.delete<ApiResponse>(`${this.#baseUrl}/bank/delete/${id}`);
  }

  getBankCards() {
    return this.http
      .get<ApiResponse & { data: { cards: Card[] } }>(`${this.#baseUrl}/card`)
      .pipe(
        map((res) => res.data.cards),
        tap((cards) => this.cardBankStore.setBankCards(cards))
      );
  }

  addBankCard(data: object) {
    return this.http
      .post<ApiResponse & { data: Card }>(`${this.#baseUrl}/card/add`, data)
      .pipe(map((res) => res.data));
  }

  deleteBankCard(id: string) {
    return this.http.delete(`${this.#baseUrl}/card/delete/${id}`);
  }

  changePassword(data: object) {
    return this.http.post<ApiResponse>(
      `${this.#baseUrl}/user/change-password`,
      data
    );
  }

  verifyBvn(data: object) {
    return this.http.post<{ data: VirtualAccount }>(
      `${this.#baseUrl}/virtual-account/create`,
      data
    );
  }

  getTransactions(page = 1, perPage = 10) {
    return this.http
      .get<
        ApiResponse & {
          data: { transactions: Transaction[] } & TablePagination;
        }
      >(`${this.#baseUrl}/transaction?page=${page}&per_page=${perPage}`)
      .pipe(
        tap(({ data }) =>
          this.transactionStore.setTransactions(data.transactions)
        )
      );
  }

  requestOtp() {
    return this.http.post<ApiResponse>(
      `${this.#baseUrl}/transaction/request-otp`, {}
    );
  }

  initiateWithdrawal(data: object) {
    return this.http.post<
      ApiResponse & {
        data: { transaction: Transaction; current_balance: number };
      }
    >(`${this.#baseUrl}/transaction/transfer`, data);
  }

  createMGR(data: any) {
    const payload = {
      name: String(data.name || ''),
      desc: String(data.desc || ''),
      amount: Number(data.amount || 0),
      duration: String(data.duration || 'monthly'),
      number_of_members: Number(data.number_of_members || 3),
      join_date_deadline: String(data.join_date_deadline || ''),
      contribution_start_date: String(data.contribution_start_date || ''),
      allocation_date: String(data.allocation_date || ''),
      allotment_type: String(data.allotment_type || 'auto'),
      slot_number: data.slot_number ? Number(data.slot_number) : null,
      theme_color: String(data.theme_color || ''),
      is_public: Boolean(data.is_public)
    };

    console.log('API Service - Final payload for createMGR:', JSON.stringify(payload, null, 2));

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<ApiResponse & { data: MGR }>(
      `${this.#baseUrl}/mgr`,
      JSON.stringify(payload),
      { headers: headers }
    );
  }

  updateMGR(id: string, data: object) {
    return this.http.put<ApiResponse & { data: MGR }>(
      `${this.#baseUrl}/mgr/${id}`,
      data
    );
  }

  getAdminMGR(status?: string) {
    const endpoint = status
      ? `${this.#baseUrl}/mgr/admin/${status}`
      : `${this.#baseUrl}/mgr/admin`;
    return this.http.get<{ data: MGR[] }>(endpoint);
  }

  getParticipantMGR(status?: string) {
    const endpoint = status
      ? `${this.#baseUrl}/mgr/participant/${status}`
      : `${this.#baseUrl}/mgr/participant`;
    return this.http.get<{ data: MGR[] }>(endpoint);
  }

  getMGRById(id: string) {
    return this.http.get<{ data: MGR }>(`${this.#baseUrl}/mgr/${id}`).pipe(
      tap((mgr) => {
        this.mgrStore.setActivePlan(mgr.data!);
        this.mgrStore.setMembers(mgr.data.mgr_users!);
      })
    );
  }

  getMgrByInviteLink(link: string) {
    return this.http.get<{
      data: { mgr: MGR; available_positions?: number[] };
    }>(`${this.#baseUrl}/mgr/invite-link/${link}`);
  }

  getMgrPlanAvailableSlots(mgrId: string) {
    return this.http
      .get<{ data: number[] }>(`${this.#baseUrl}/mgr/${mgrId}/slots`)
      .pipe(map((response) => response.data));
  }

  joinMgrByInviteLink(link: string, position: string) {
    return this.http.post<ApiResponse & { data: { mgr: MGR } }>(
      `${this.#baseUrl}/mgr/join/${link}${position ? `/${position}` : ``}`,
      {}
    );
  }

  cancelMgrPlan(id: string) {
    return this.http.post<ApiResponse>(
      `${this.#baseUrl}/mgr/cancel/${id}`,
      {}
    );
  }

  changeMgrPosition(mgrId: string, newPosition: string) {
    return this.http.post<ApiResponse>(
      `${this.#baseUrl}/mgr/change-position/${mgrId}/${newPosition}`,
      {}
    );
  }

  proposePositionSwap(mgrId: string, userId: number) {
    return this.http.post<ApiResponse>(
      `${this.#baseUrl}/mgr/propose-swap/${mgrId}/${userId}`,
      {}
    );
  }

  manageSwapRequests(action: 'accept' | 'reject', swapRequestId: string, notificationId: string) {
    return this.http.post<ApiResponse>(
      `${this.#baseUrl}/mgr/swap-requests/${action}/${swapRequestId}/${notificationId}`,
      {}
    );
  }

  removeMember(mgrId: string, userId: string) {
    return this.http.post<ApiResponse>(
      `${this.#baseUrl}/mgr/remove-member/${mgrId}/${userId}`,
      {}
    );
  }

  leavePlan(mgrId: string, userId: string) {
    return this.http.post<ApiResponse>(
      `${this.#baseUrl}/mgr/leave-mgr/${mgrId}`,
      {}
    );
  }

  getMgrAnalyticsById(mgrId: string) {
    return this.http.get<{ data: MGRAnalytics }>(
      `${this.#baseUrl}/mgr/analytics/${mgrId}`
    );
  }

  getMgrPlanContributionStats(mgrId: string, cycleNumber: number | string) {
    return this.http.get<{ data: MGRContributionStats[] }>(
      `${this.#baseUrl}/mgr/${mgrId}/cycle/${cycleNumber}`
    );
  }

  initiateMgrRollover(mgrId: string) {
    return this.http.post<ApiResponse>(
      `${this.#baseUrl}/mgr/${mgrId}/rollover`,
      {}
    );
  }

  getUnreadNotifications() {
    return this.http
      .get<{ data: { notifications: INotificationData[] } }>(
        `${this.#baseUrl}/user/notifications/unread`
      )
      .pipe(map((res) => res.data.notifications));
  }

  getPublicMgrs(filters?: any) {
    let params = '';
    if (filters) {
      const searchParams = new URLSearchParams(filters);
      params = `?${searchParams.toString()}`;
    }
    return this.http.get<ApiResponse & { data: any }>(`${this.#baseUrl}/mgr/public${params}`);
  }

  getPublicMgrDetails(id: string) {
    return this.http.get<ApiResponse & { data: MGR }>(`${this.#baseUrl}/mgr/public/${id}`);
  }

  joinPublicMgr(id: string, data: any) {
    return this.http.post<ApiResponse>(`${this.#baseUrl}/mgr/public/${id}/join`, data);
  }

  createPublicMgr(data: any) {
    const payload = {
      name: '' + (data.name || ''),
      desc: '' + (data.desc || ''),
      duration: '' + (data.duration || 'monthly'),
      number_of_members: Number(data.number_of_members || 3),
      amount: Number(data.amount || 0),
      join_date_deadline: '' + (data.join_date_deadline || ''),
      contribution_start_date: '' + (data.contribution_start_date || ''),
      allocation_date: '' + (data.allocation_date || ''),
      allotment_type: String(data.allotment_type || 'auto'),
      slot_number: data.slot_number ? Number(data.slot_number) : null,
      theme_color: '' + (data.theme_color || ''),
      is_public: Boolean(data.is_public),
      public_description: '' + (data.public_description || '')
    };

    console.log('API Service - Final payload for createPublicMgr:', JSON.stringify(payload, null, 2));

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<ApiResponse & { data: MGR }>(
      `${this.#baseUrl}/mgr/public`,
      payload,
      { headers: headers }
    );
  }

  checkPublicMgrPermission() {
    return this.http.get<ApiResponse & { data: { can_create: boolean; user_id: number } }>(
      `${this.#baseUrl}/mgr/public/permission-check`
    );
  }

  grantPublicMgrPermission(userId: number, notes?: string) {
    return this.http.post<ApiResponse>(`${this.#baseUrl}/mgr/public/permissions/grant/${userId}`, { notes });
  }

  revokePublicMgrPermission(userId: number) {
    return this.http.delete<ApiResponse>(`${this.#baseUrl}/mgr/public/permissions/revoke/${userId}`);
  }

  getPublicMgrPermissions() {
    return this.http.get<ApiResponse & { data: any[] }>(`${this.#baseUrl}/mgr/public/permissions`);
  }

  getPublicMgrStats() {
    return this.http.get<ApiResponse & { data: any }>(`${this.#baseUrl}/mgr/public/permissions/stats`);
  }
}
