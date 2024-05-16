import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '../interfaces/user';

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
}
