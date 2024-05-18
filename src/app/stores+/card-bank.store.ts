import { Injectable, WritableSignal, signal } from '@angular/core';
import { BankAccount, Card } from '../interfaces/bank-and-card';

interface State<T> {
  data: T | null;
  loading: boolean;
}

@Injectable()
export class CardAndBankStoreService {
  #cards: WritableSignal<Card[] | null> = signal(null);
  #bankAccounts: WritableSignal<BankAccount[] | null> = signal(null);

  get bankAccounts() {
    return this.#bankAccounts;
  }

  get cards() {
    return this.#cards;
  }

  setBankAccounts(accounts: BankAccount[]) {
    this.#bankAccounts.set(accounts);
  }

  addBankAccount(account: BankAccount) {
    this.#bankAccounts.update((ba) => [...ba!, account]);
  }

  deleteBankAccount(accountId: number) {
    let filtered = this.#bankAccounts()!.filter((c) => c.id !== accountId);
    this.setBankAccounts(filtered);
  }

  togglePrimaryAccount(account: BankAccount) {
    let idx = this.bankAccounts()!.findIndex((acc) => acc.id === account.id);
    let all = this.bankAccounts()!.map((ba) => ({ ...ba, primary: false }));

    if (idx >= 0) {
      all[idx] = { ...account, primary: true };
      this.#bankAccounts.set(all);
    }
  }

  setBankCards(cards: Card[]) {
    this.#cards.set(cards);
  }

  addBankCard(card: Card) {
    this.#cards.update((cards) => [...cards!, card]);
  }

  deleteBankCard(cardId: number) {
    let filtered = this.#cards()!.filter((c) => c.id !== cardId);
    this.setBankCards(filtered);
  }
}
