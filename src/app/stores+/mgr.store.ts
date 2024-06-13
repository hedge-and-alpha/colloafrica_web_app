import { Injectable, signal } from '@angular/core';
import { MGR, MGRUser } from '../interfaces/mgr.interface';

@Injectable({
  providedIn: 'root',
})
export class MgrStoreService {
  #members = signal<MGRUser[]>([]);
  #activePlan = signal<MGR | null>(null);

  constructor() {}

  get members() {
    return this.#members;
  }

  get activePlan() {
    return this.#activePlan;
  }

  setMembers(data: MGRUser[]) {
    this.#members.set(data);
  }

  setActivePlan(data: MGR) {
    this.#activePlan.set(data);
  }
}
