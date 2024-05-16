import { Injectable, WritableSignal, signal } from '@angular/core';

type Variant = 'warning' | 'danger' | 'success' | 'plain';
type Config = {
  summary?: string;
  details?: string;
};
type Alert = {
  variant: Variant;
  id: string;
  config: Config;
};

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  #alerts: WritableSignal<Alert[]> = signal([]);

  get alerts() {
    return this.#alerts;
  }

  constructor() {}

  open(type: Variant, config: Config = {}) {
    let alert: Alert = {
      variant: type,
      id: crypto.randomUUID(),
      config,
    };

    if (type === 'plain' && this.#alerts().length >= 1) {
      this.#alerts.set([alert]);

      setTimeout(() => {
        this.#alerts.set([]);
      }, 5000);
      return;
    }

    this.#alerts.update((alerts) => [alert, ...alerts]);

    setTimeout(() => {
      this.close(alert.id);
    }, 5000);
  }

  close(id: string) {
    let filtered = this.#alerts().filter((alert) => alert.id !== id);
    this.#alerts.update(() => filtered);
  }
}
