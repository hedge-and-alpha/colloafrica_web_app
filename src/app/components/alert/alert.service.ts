import { Injectable, WritableSignal, signal } from '@angular/core';

type Variant = 'warning' | 'danger' | 'success' | 'plain';
type Config = {
  summary?: string;
  details?: string;
};

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  #show: WritableSignal<boolean> = signal(true);
  #type: WritableSignal<Variant> = signal('danger');
  #config: WritableSignal<Config> = signal({});

  get show() {
    return this.#show;
  }

  get type() {
    return this.#type;
  }

  get config() {
    return this.#config;
  }

  constructor() {}

  open(type: Variant, config: Config = {}) {
    this.#type.set(type);
    this.#config.update((c) => ({ ...c, ...config }));
    this.#show.set(true);
  }

  close() {
    this.#show.set(false);
  }
}
