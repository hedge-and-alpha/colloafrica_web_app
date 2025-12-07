import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emptyFieldValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value = control.value as string;
    return value && !value.trim().length ? { emptyField: true } : null;
  };
}
