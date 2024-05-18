import { Injectable, WritableSignal, signal } from '@angular/core';
import { Bank, BankAccount, Card } from '../interfaces/bank-and-card';
import { DashboardApiService } from '../services/api/dashboard-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../components/alert/alert.service';

interface State<T> {
  data: T | null;
  error: null | HttpErrorResponse;
  loading: boolean;
}

@Injectable()
export class CardAndBankStoreService {
  #cards: WritableSignal<State<Card[]>> = signal({
    data: null,
    error: null,
    loading: false,
  });
  #bankAccounts: WritableSignal<State<BankAccount[]>> = signal({
    data: null,
    error: null,
    loading: false,
  });

  constructor(private api: DashboardApiService, private alert: AlertService) {}

  get bankAccounts() {
    return this.#bankAccounts;
  }

  get cards() {
    return this.#cards;
  }

  getBankAccounts() {
    if (this.#bankAccounts().data) {
      return;
    }

    this.#bankAccounts.update((ba) => ({ ...ba, loading: true }));
    this.api.getBankAccounts().subscribe({
      next: (res) => {
        this.#bankAccounts.update((ba) => ({ ...ba, data: res }));
      },
      error: (error: HttpErrorResponse) => {
        this.#bankAccounts.update((ba) => ({ ...ba, error }));
      },
      complete: () => {
        this.#bankAccounts.update((ba) => ({ ...ba, loading: false }));
      },
    });
  }

  getCards() {
    if (this.#cards().data) {
      return;
    }

    this.#cards.update((ba) => ({ ...ba, loading: true }));
    this.api.getBankCards().subscribe({
      next: (res) => {
        this.#cards.update((cards) => ({ ...cards, data: res }));
      },
      error: (error: HttpErrorResponse) => {
        this.#cards.update((cards) => ({ ...cards, error }));
      },
      complete: () => {
        this.#cards.update((ba) => ({ ...ba, loading: false }));
      },
    });
  }
}
