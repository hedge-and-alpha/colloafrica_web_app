import { Injectable, WritableSignal, signal } from '@angular/core';

type ModalSize = 'regular' | 'small' | 'large';
export type ModalConfig = {
  closable?: boolean;
  showHeading?: boolean;
  headingText?: string;
  message?: string;
};

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _isOpen: WritableSignal<boolean> = signal(false);
  private _size: WritableSignal<ModalSize> = signal('regular');
  private _componentClass: WritableSignal<any | null> = signal(null);
  private _componentInputs: WritableSignal<Record<string, any>> = signal({});
  private _data: WritableSignal<any> = signal(undefined);

  private _config: WritableSignal<ModalConfig> = signal({});

  get config() {
    return this._config;
  }

  get size() {
    return this._size;
  }

  get isOpen() {
    return this._isOpen;
  }

  get componentClass() {
    return this._componentClass;
  }

  get componentInputs() {
    return this._componentInputs;
  }

  get data() {
    return this._data;
  }

  open(
    component: any,
    size: ModalSize,
    config: ModalConfig,
    inputs: Record<string, any> = {}
  ) {
    this._componentClass.set(component);
    this._componentInputs.set(inputs);
    this._size.set(size);
    this._config.update((v) => ({ ...v, ...config }));
    this._isOpen.set(true);
  }

  update(
    component: any,
    size: ModalSize,
    config: ModalConfig,
    inputs: Record<string, any> = {}
  ) {
    this._componentClass.set(component);
    this._componentInputs.set(inputs);
    this._config.update((v) => ({ ...v, ...config }));
    this._size.set(size);
  }

  updateConfig(config: ModalConfig, size: ModalSize = 'regular') {
    this._config.update((v) => ({ ...v, ...config }));
    this._size.set(size);
  }

  close(data?: any) {
    this._data.set(data);
    this._isOpen.set(false);
    this._componentClass.set(null);
    this._componentInputs.set({});
    this._config.set({});
  }
}
