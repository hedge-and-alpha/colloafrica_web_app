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

  setBankCards(cards: Card[]) {
    this.#cards.set(cards);
  }

  addBankCard(card: Card) {
    this.#cards.update((cards) => [...cards!, card]);
  }
}
