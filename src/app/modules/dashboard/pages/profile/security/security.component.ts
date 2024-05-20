import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../../../components/alert/alert.service';
import { AuthApiService } from '../../../../../services/api/auth-api.service';
import { DashboardApiService } from '../../../../../services/api/dashboard-api.service';
import { emptyFieldValidator } from '../../../../../validators/emptyField.validator';
import { matchPasswordValidator } from '../../../../../validators/matchPassword.validator';

@Component({
  selector: 'ca-security',
  templateUrl: './security.component.html',
  styleUrl: './security.component.css',
})
export class SecurityComponent {
  isSubmitted = false;
  loading = false;

  form = this.fb.group(
    {
      current_password: [null, [Validators.required, emptyFieldValidator()]],
      new_password: [null, [Validators.required, emptyFieldValidator()]],
      new_password_confirmation: [
        null,
        [Validators.required, emptyFieldValidator()],
      ],
    },
    { validators: [matchPasswordValidator], updateOn: 'submit' }
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: DashboardApiService,
    private alertService: AlertService,
    private authApiService: AuthApiService
  ) {}

  get currentPassword() {
    return this.form.get('current_password');
  }
  get newPassword() {
    return this.form.get('new_password');
  }
  get newPasswordConfirmation() {
    return this.form.get('new_password_confirmation');
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;

    this.loading = true;

    this.api.changePassword(this.form.value).subscribe({
      next: ({ message, status }) => {
        this.form.reset();
        this.alertService.open('success', {
          summary: status,
          details: message,
        });
        setTimeout(() => {
          this.authApiService.logoutUser();
        }, 2000);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.alertService.open('danger', {
          summary: error.error.status + ' ' + error.status,
          details: error.error.message,
        });
      },
      complete: () => {
        this.loading = false;
        this.isSubmitted = false;
      },
    });
  }
}
