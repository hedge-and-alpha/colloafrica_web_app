import { Injectable, WritableSignal, signal } from '@angular/core';

type ModalSize = '' | 'small' | 'large';
export type ModalConfig = {
  size: ModalSize;
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
  private _componentClass: WritableSignal<any | null> = signal(null);
  private _componentInputs: WritableSignal<Record<string, any>> = signal({});

  private _config: ModalConfig = {
    size: 'small',
  };

  get config() {
    return this._config;
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

  open(component: any, config: ModalConfig, inputs: Record<string, any> = {}) {
    this._componentClass.set(component);
    this._componentInputs.set(inputs);
    this._config = config;
    this._isOpen.set(true);
  }

  close() {
    this._isOpen.set(false);
    this._componentClass.set(null);
    this._componentInputs.set({});
  }
}
