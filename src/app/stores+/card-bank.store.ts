import { Injectable, WritableSignal, signal } from '@angular/core';
import { BankAccount, Card } from '../interfaces/bank-and-card';

interface State<T> {
  data: T | null;
  loading: boolean;
}

@Injectable()
export class CardAndBankStoreService {
  #cards: WritableSignal<State<Card[]>> = signal({
    data: null,
    loading: false,
  });
  #bankAccounts: WritableSignal<BankAccount[]> = signal([]);

  constructor() {}

  get bankAccounts() {
    return this.#bankAccounts;
  }

  get cards() {
    return this.#cards;
  }

  setBankAccounts(accounts: BankAccount[]) {
    this.#bankAccounts.update((ba) => [...ba, ...accounts]);
  }

  addBankAccount(account: BankAccount) {
    this.#bankAccounts.update((ba) => [...ba!, account]);
  }

  getCards() {
    if (this.#cards().data) {
      return;
    }

    // this.#cards.update((ba) => ({ ...ba, loading: true }));
    // this.api.getBankCards().subscribe({
    //   next: (res) => {
    //     this.#cards.update((cards) => ({ ...cards, data: res }));
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     this.#cards.update((cards) => ({ ...cards, error }));
    //   },
    //   complete: () => {
    //     this.#cards.update((ba) => ({ ...ba, loading: false }));
    //   },
    // });
  }
}
