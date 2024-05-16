import { Component } from '@angular/core';
import { ButtonPrimaryDirective } from '../../../../directives/button-primary/button-primary.directive';
import { OtpComponent } from '../../../../components/otp/otp.component';
import { AuthFormLayoutComponent } from '../../layouts/auth-form-layout/auth-form-layout.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { emptyFieldValidator } from '../../../../validators/emptyField.validator';
import { FormErrorComponent } from '../../../../components/form-error/form-error.component';
import { AuthApiService } from '../../../../services/api/auth-api.service';
import { Router } from '@angular/router';
import { ButtonLoadingDirective } from '../../../../directives/button-loading/button-loading.directive';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../../../components/alert/alert.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'ca-verify-email',
  standalone: true,
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css',
  imports: [
    ReactiveFormsModule,
    AuthFormLayoutComponent,
    ButtonLoadingDirective,
    ButtonPrimaryDirective,
    FormErrorComponent,
    OtpComponent,
  ],
})
export class VerifyEmailComponent {
  isSubmitted = false;
  loading = false;
  resending = false;

  form = this.fb.group(
    {
      otp: [
        null,
        [Validators.required, Validators.maxLength(6), emptyFieldValidator],
      ],
    },
    { updateOn: 'submit' }
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: AuthApiService,
    private alertService: AlertService,
    private auth: AuthService
  ) {}

  resendVerificationCode() {
    this.resending = true;
    this.api.resendVerificationCode(this.auth.email!).subscribe({
      next: ({ message, status }) => {
        this.resending = false;
        this.alertService.open('success', {
          summary: status,
          details: message,
        });
      },
      error: (error: HttpErrorResponse) => {
        this.resending = false;
        this.alertService.open('danger', {
          summary: error.error.status + ' ' + error.status,
          details: error.error.message,
        });
      },
    });
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;
    this.loading = true;

    this.api.EmailVerification(this.form.value.otp!).subscribe({
      next: ({ message, status }) => {
        this.router.navigate(['/auth']);
        this.loading = false;
        this.alertService.open('success', {
          summary: status,
          details: message,
        });
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
