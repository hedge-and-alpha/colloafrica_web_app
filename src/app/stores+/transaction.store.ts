import { Injectable, WritableSignal, signal } from '@angular/core';
import { Transaction } from '../interfaces/account';

@Injectable({ providedIn: 'root' })
export class TransactionStoreService {
  #transactions: WritableSignal<Transaction[]> = signal([]);

  get transactions() {
    return this.#transactions;
  }

  setTransactions(data: Transaction[]) {
    this.#transactions.set(data);
  }

  updateTransactions(data: Transaction) {
    this.#transactions.update((trans) => [data, ...trans]);
  }
}
