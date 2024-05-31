import { Injectable, WritableSignal, signal } from '@angular/core';
import { User, VirtualAccount } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  #user: WritableSignal<User | null> = signal(null);

  get user() {
    return this.#user();
  }

  set user(user: User | null) {
    this.#user.update(() => user);
  }

  updateUser(user: User) {
    this.#user.update((u) => ({ ...u, ...user }));
  }

  updateWalletBalance(amount: number) {
    this.#user.update((user) => ({
      ...user!,
      virtual_account: {
        ...this.user!.virtual_account!,
        account_balance: amount.toString(),
      },
    }));
  }
}
