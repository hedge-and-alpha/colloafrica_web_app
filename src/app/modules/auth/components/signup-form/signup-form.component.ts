import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlertService } from '../../../../components/alert/alert.service';
import { ColsField2Component } from '../../../../components/cols-field-2/cols-field-2.component';
import { FormErrorComponent } from '../../../../components/form-error/form-error.component';
import { FormFieldComponent } from '../../../../components/form-field/form-field.component';
import { SpinnerComponent } from '../../../../components/spinner/spinner.component';
import { ButtonLoadingDirective } from '../../../../directives/button-loading/button-loading.directive';
import { ButtonPrimaryDirective } from '../../../../directives/button-primary/button-primary.directive';
import { AuthApiService } from '../../../../services/api/auth-api.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { emptyFieldValidator } from '../../../../validators/emptyField.validator';
import { matchPasswordValidator } from '../../../../validators/matchPassword.validator';

@Component({
  selector: 'ca-signup-form',
  standalone: true,
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    ButtonPrimaryDirective,
    ButtonLoadingDirective,
    ColsField2Component,
    FormErrorComponent,
    FormFieldComponent,
    SpinnerComponent,
  ],
})
export class SignupFormComponent {
  isSubmitted = false;
  loading = false;

  form = this.fb.group(
    {
      first_name: this.fb.control<string | null>(null, [
        Validators.required,
        emptyFieldValidator(),
      ]),
      last_name: this.fb.control<string | null>(null, [
        Validators.required,
        emptyFieldValidator(),
      ]),
      email: this.fb.control<string | null>(null, [
        Validators.required,
        Validators.email,
        emptyFieldValidator(),
      ]),
      password: this.fb.control<string | null>(null, [
        Validators.required,
        emptyFieldValidator(),
      ]),
      password_confirmation: this.fb.control<string | null>(null, [
        Validators.required,
        emptyFieldValidator(),
      ]),
      phone_number: this.fb.control<string | null>(null, [
        Validators.required,
        emptyFieldValidator(),
      ]),
      referral_code: this.fb.control<string | null>(null, [
        emptyFieldValidator(),
      ]),
      subscription: this.fb.control<boolean | null>(false, [
        Validators.requiredTrue,
      ]),
    },
    { validators: [matchPasswordValidator], updateOn: 'submit' }
  );

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: AuthApiService,
    private auth: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    const referralCode = this.route.snapshot.queryParamMap.get('referral_code');

    referralCode && this.referralCode?.setValue(referralCode);
  }

  get firstName() {
    return this.form.get('first_name');
  }
  get lastName() {
    return this.form.get('last_name');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get passwordConfirmation() {
    return this.form.get('password_confirmation');
  }
  get phoneNumber() {
    return this.form.get('phone_number');
  }
  get referralCode() {
    return this.form.get('referral_code');
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;

    this.loading = true;

    const data = { ...this.form.value };
    delete data.subscription;
    this.auth.email = data.email;

    this.api.registerUser(data).subscribe({
      next: ({ message, status }) => {
        this.loading = false;
        this.form.reset();
        this.alertService.open(
          'success',
          {
            summary: status,
            details: message,
          },
          10000
        );
        this.router.navigate(['/auth/verify-email']);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.alertService.open('danger', {
          details: error.error.message,
        });
      },
    });
  }
}
