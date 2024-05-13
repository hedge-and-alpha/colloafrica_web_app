import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  forwardRef,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validator,
  Validators,
} from '@angular/forms';
import {
  ERROR_MESSAGES,
  VALIDATION_ERROR_MESSAGES,
} from '../form-error/validation-error-messages.token';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ca-otp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: OtpComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: OtpComponent,
      multi: true,
    },
  ],
})
export class OtpComponent
  implements OnInit, AfterViewInit, ControlValueAccessor, OnDestroy, Validator
{
  #size = 0;
  otpControl!: FormControl;
  inputs!: FormArray<any>;
  otpCode: string[] = [];

  errorsMap = inject(VALIDATION_ERROR_MESSAGES);

  @Input() set size(n: number) {
    this.#size = n;
  }
  @ViewChildren('input', { read: ElementRef })
  inputRefs!: QueryList<ElementRef>;

  onTouched?: () => void;
  onChange?: (value: string) => void;

  valueChangesSub?: Subscription;

  ngOnInit() {
    this.inputs = this.createFields();
    this.otpControl = new FormControl(null, [
      Validators.required,
      Validators.minLength(this.#size),
      Validators.maxLength(this.#size),
    ]);
  }

  ngAfterViewInit() {
    (<HTMLInputElement>this.inputRefs.first.nativeElement).focus();
  }

  createFields() {
    let controls: FormArray<FormControl> = new FormArray<FormControl>([]);

    for (let i = 0; i < this.#size; i++) {
      controls.push(new FormControl(''));
    }

    return controls;
  }

  writeValue(value: string) {
    if (!value) {
      return;
    }

    if (value.length > this.#size) {
      value = value.slice(0, this.#size);
    }

    this.otpControl.setValue(value);
    this.inputs.setValue(new Array(...value.split('')));
  }

  registerOnChange(fn: any) {
    this.valueChangesSub = this.otpControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any) {
    this.valueChangesSub = this.otpControl.valueChanges.subscribe(fn);
  }

  handleInput(event: Event) {
    const elem = event.target as HTMLInputElement;
    const isDigit = /\d/.test(elem.value);

    if (!isDigit) {
      elem.value = '';
      return;
    }

    const next = elem.nextElementSibling;

    if (elem.value.length > 1) {
      elem.value = elem.value.charAt(0);
      return;
    }

    if (next) {
      (next as HTMLInputElement).focus();
    }
    this.setNewControlValue();
  }

  handleKeyUp(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    const isDelete =
      event.key.toLowerCase() === 'backspace' ||
      event.key.toLowerCase() === 'delete';

    if (isDelete) {
      const prev = target.previousElementSibling as HTMLInputElement;

      if (prev) {
        prev.select();
      }
    }

    this.setNewControlValue();
  }

  handlePaste(event: ClipboardEvent, idx: number) {
    event.preventDefault();

    if (idx !== 0) return;

    const data = event.clipboardData?.getData('text');
    const isDigits = new RegExp(`/\d${this.#size}/`).test(data || '');

    if (!data && !isDigits) return;

    this.inputRefs.forEach((_, i) => {
      this.inputs.at(i).setValue(data![i]);
    });

    this.setNewControlValue();
    (<HTMLInputElement>this.inputRefs.last.nativeElement).focus();
  }

  setNewControlValue() {
    this.otpControl.setValue(this.inputs.value.join(''));
  }

  validate(): Record<string, boolean> | null {
    const { errors } = this.otpControl;

    if (errors && errors['required']) {
      return { required: true };
    }

    if (errors && errors['minlength']) {
      return { minLength: true };
    }

    if (errors && errors['maxlength']) {
      return { maxLength: true };
    }

    return null;
  }

  ngOnDestroy() {
    this.valueChangesSub?.unsubscribe();
  }
}
