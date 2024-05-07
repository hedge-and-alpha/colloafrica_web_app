import { Component } from '@angular/core';
import { FormFieldComponent } from '../../../../components/form-field/form-field.component';
import { AuthFormLayoutComponent } from '../../layouts/auth-form-layout/auth-form-layout.component';
import { ButtonPrimaryDirective } from '../../../../directives/button-primary/button-primary.directive';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { emptyFieldValidator } from '../../../../validators/emptyField.validator';
import { NgClass } from '@angular/common';
import { FormErrorComponent } from '../../../../components/form-error/form-error.component';
import { matchPasswordValidator } from '../../../../validators/matchPassword.validator';

@Component({
  selector: 'ca-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  imports: [
    ReactiveFormsModule,
    NgClass,
    AuthFormLayoutComponent,
    ButtonPrimaryDirective,
    FormErrorComponent,
    FormFieldComponent,
  ],
})
export class ResetPasswordComponent {
  isSubmitted = false;

  form: ResetPasswordForm = this.fb.group(
    {
      otp: [
        null,
        [
          Validators.required,
          Validators.pattern(/\d{6}/),
          Validators.max(999999),
        ],
      ],
      password: [null, [Validators.required, emptyFieldValidator()]],
      password_confirmation: [
        null,
        [Validators.required, emptyFieldValidator()],
      ],
    },
    { validators: [matchPasswordValidator], updateOn: 'submit' }
  );

  constructor(private fb: FormBuilder) {}

  get otp() {
    return this.form.get('otp');
  }
  get password() {
    return this.form.get('password');
  }
  get passwordConfirmation() {
    return this.form.get('password_confirmation');
  }

  handleSubmit() {
    this.isSubmitted = true;

    console.log(this.form);
    if (this.form.invalid) return;

    console.log(this.form.value);
  }
}

type ResetPasswordForm = FormGroup<{
  otp: FormControl<null>;
  password: FormControl<null>;
  password_confirmation: FormControl<null>;
}>;
