import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Account, Transaction } from '../../interfaces/account';
import { ApiResponse, TablePagination } from '../../interfaces/api-response';
import { Bank, BankAccount, Card } from '../../interfaces/bank-and-card';
import {
  BasicInfo,
  ContactInfo,
  EmploymentInfo,
  IDCard,
  NextOfKinInfo,
  User,
} from '../../interfaces/user';
import { CardAndBankStoreService } from '../../stores+/card-bank.store';
import { UserStoreService } from '../../stores+/user.store';
import { TransactionStoreService } from '../../stores+/transaction.store';

@Injectable()
export class DashboardApiService {
  #baseUrl = environment.API_BASE_URL;

  constructor(
    private http: HttpClient,
    private userStore: UserStoreService,
    private cardBankStore: CardAndBankStoreService,
    private transactionStore: TransactionStoreService
  ) {}

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

  /********************** Profile **********************/
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

  primaryBankAccount(id: number) {
    return this.http.post<ApiResponse & { data: BankAccount }>(
      `${this.#baseUrl}/bank/primary/${id}`,
      null
    );
  }

  deleteBankAccount(id: number) {
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
  /********************** Profile end **********************/

  /********************** Account **********************/
  verifyBvn(data: object) {
    return this.http.post<{ data: Account }>(
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
    return this.http.get<ApiResponse>(
      `${this.#baseUrl}/transaction/request-otp`
    );
  }

  initiateWithdrawal(data: object) {
    return this.http.post<
      ApiResponse & {
        data: { transaction: Transaction; current_balance: number };
      }
    >(`${this.#baseUrl}/transaction/transfer`, data);
  }
  /********************** Account end **********************/

  /********************** MGR start **********************/
  createMGR(data: object) {
    return this.http.post(`${this.#baseUrl}/mgr`, data);
  }
}
