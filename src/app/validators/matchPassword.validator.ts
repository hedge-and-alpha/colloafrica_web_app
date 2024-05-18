import { AbstractControl, ValidatorFn } from '@angular/forms';

export const matchPasswordValidator: ValidatorFn = (
  control: AbstractControl
) => {
  const password = control.get('password') || control.get('current_password');
  const passwordConfirmation =
    control.get('password_confirmation') ||
    control.get('new_password_confirmation');

  return password?.value &&
    passwordConfirmation?.value &&
    password.value === passwordConfirmation.value
    ? null
    : { matchPassword: true };
};
