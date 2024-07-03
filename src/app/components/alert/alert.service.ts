import { Injectable, WritableSignal, signal } from '@angular/core';

type Variant = 'warning' | 'danger' | 'success' | 'plain';
type Config = {
  summary?: string;
  details?: string;
  action?: boolean;
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

  open(type: Variant, config: Config = {}, duration: number = 5000) {
    let alert: Alert = {
      variant: type,
      id: Date.now().toString(),
      config,
    };

    // if (duration === 'sticky') {
    // }

    if (type === 'plain' && this.#alerts().length >= 1) {
      this.#alerts.set([alert]);

      setTimeout(() => {
        this.#alerts.set([]);
      }, duration);
      return;
    }

    this.#alerts.update((alerts) => [alert, ...alerts]);

    setTimeout(() => {
      this.close(alert.id);
    }, duration);
  }

  close(id: string) {
    let filtered = this.#alerts().filter((alert) => alert.id !== id);
    this.#alerts.update(() => filtered);
  }
}
