import { Component } from '@angular/core';
import { AuthFormLayoutComponent } from '../../layouts/auth-form-layout/auth-form-layout.component';
import { FormFieldComponent } from '../../../../components/form-field/form-field.component';
import { Router, RouterLink } from '@angular/router';
import { ButtonPrimaryDirective } from '../../../../directives/button-primary/button-primary.directive';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormErrorComponent } from '../../../../components/form-error/form-error.component';
import { NgClass } from '@angular/common';
import { ButtonLoadingDirective } from '../../../../directives/button-loading/button-loading.directive';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../../../components/alert/alert.service';
import { AuthApiService } from '../../../../services/api/auth-api.service';

@Component({
  selector: 'ca-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    AuthFormLayoutComponent,
    ButtonLoadingDirective,
    ButtonPrimaryDirective,
    FormErrorComponent,
    FormFieldComponent,
  ],
})
export class ForgotPasswordComponent {
  isSubmitted = false;
  loading = false;

  form: FormGroup<{ email: FormControl<null> }> = this.fb.group(
    {
      email: [null, [Validators.required]],
    },
    { updateOn: 'submit' }
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: AuthApiService,
    private alertService: AlertService
  ) {}

  get email() {
    return this.form.get('email');
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;

    this.loading = true;

    this.api.forgotPassword(this.form.value.email!).subscribe({
      next: ({ message, status }) => {
        this.loading = false;
        this.form.reset();
        this.alertService.open('success', {
          summary: status,
          details: message,
        });
        this.router.navigate(['/', 'auth', 'forgot-password', 'reset']);
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
