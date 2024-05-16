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
import { ButtonLoadingDirective } from '../../../../directives/button-loading/button-loading.directive';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from '../../../../components/alert/alert.service';
import { AuthApiService } from '../../../../services/auth/auth-api.service';

@Component({
  selector: 'ca-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  imports: [
    ReactiveFormsModule,
    NgClass,
    AuthFormLayoutComponent,
    ButtonLoadingDirective,
    ButtonPrimaryDirective,
    FormErrorComponent,
    FormFieldComponent,
  ],
})
export class ResetPasswordComponent {
  isSubmitted = false;
  loading = false;

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: AuthApiService,
    private alertService: AlertService
  ) {}

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

    if (this.form.invalid) return;

    this.loading = true;

    const { otp, password, password_confirmation } = this.form.value;
    const data = { password, password_confirmation, otp: `${otp}` };

    this.api.resetPassword(data).subscribe({
      next: ({ message, status }) => {
        this.loading = false;
        this.form.reset();
        this.alertService.open('success', {
          summary: status,
          details: message,
        });
        this.router.navigate(['/', 'auth']);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.alertService.open('danger', {
          summary: error.error.status + ' ' + error.status,
          details: error.error.message,
        });
      },
    });
  }
}

type ResetPasswordForm = FormGroup<{
  otp: FormControl<null>;
  password: FormControl<null>;
  password_confirmation: FormControl<null>;
}>;
