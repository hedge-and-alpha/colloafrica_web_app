import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject, takeUntil, debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';

import { AlertService } from '../../../../components/alert/alert.service';
import { ColsField2Component } from '../../../../components/cols-field-2/cols-field-2.component';
import { FormErrorComponent } from '../../../../components/form-error/form-error.component';
import { AuthApiService } from '../../../../services/api/auth-api.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { emptyFieldValidator } from '../../../../validators/emptyField.validator';
import { matchPasswordValidator } from '../../../../validators/matchPassword.validator';
// import { ButtonLoadingDirective } from '../../../../directives/button-loading/button-loading.directive';
// import { ButtonPrimaryDirective } from '../../../../directives/button-primary/button-primary.directive';

@Component({
  selector: 'ca-signup-form',
  standalone: true,
  templateUrl: './signup-form.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    ColsField2Component,
    FormErrorComponent,
    // ButtonPrimaryDirective,
    // ButtonLoadingDirective,
  ],
})
export class SignupFormComponent implements OnDestroy, OnInit {
  private destroy$ = new Subject<void>();

  isSubmitted = false;
  loading = false;
  wasAutoFilled = false;
  validatingReferral = false;
  referralValid: boolean | null = null;
  lastReferralCode = '';

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
      referral_code: this.fb.control<string | null>(null),
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
  ) { }

  ngOnInit() {
    this.setupReferralCodeAutoFill();
    this.setupReferralCodeValidation();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupReferralCodeAutoFill(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const referralCode = params.get('referral_code');

        if (referralCode && !this.referralCode?.value) {
          const trimmedCode = referralCode.trim();
          this.referralCode?.setValue(trimmedCode);
          this.wasAutoFilled = true;
          this.lastReferralCode = trimmedCode;

          // Trigger immediate validation for auto-filled code
          this.validateReferralCodeImmediately(trimmedCode);
          this.clearUrlParameter();
        }
      });
  }

  private setupReferralCodeValidation(): void {
    this.referralCode?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300), // Reduced to 300ms for faster response
        distinctUntilChanged()
      )
      .subscribe(code => {
        this.handleReferralCodeChange(code || '');
      });
  }

  private handleReferralCodeChange(code: string): void {
    const trimmedCode = code.trim();

    // Reset state if code is empty
    if (!trimmedCode) {
      this.referralValid = null;
      this.validatingReferral = false;
      this.lastReferralCode = '';
      return;
    }

    // Don't re-validate the same code
    if (trimmedCode === this.lastReferralCode) {
      return;
    }

    this.lastReferralCode = trimmedCode;

    // Immediate minimum length validation
    if (trimmedCode.length < 3) {
      this.referralValid = false;
      this.validatingReferral = false;
      return;
    }

    // Validate the code
    this.validateReferralCodeImmediately(trimmedCode);
  }

  private validateReferralCodeImmediately(code: string): void {
    this.validatingReferral = true;
    this.referralValid = null;

    this.api.verifyReferralCode(code)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: { data: { valid: boolean } }) => {
          this.validatingReferral = false;
          this.referralValid = response.data.valid;
        },
        error: (error: HttpErrorResponse) => {
          this.validatingReferral = false;
          this.referralValid = false;
          console.error('Referral code validation error:', error);
        }
      });
  }

  // Optional: Validate on blur as well for immediate feedback
  onReferralCodeBlur(): void {
    const code = this.referralCode?.value?.trim();
    if (code && code.length >= 3 && code !== this.lastReferralCode) {
      this.validateReferralCodeImmediately(code);
    }
  }

  private clearUrlParameter(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { referral_code: null },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
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

    // Final check for referral code validation
    const referralCodeValue = this.referralCode?.value?.trim();
    if (referralCodeValue && this.referralValid === false) {
      this.alertService.open('danger', {
        details: 'Please enter a valid referral code or remove it'
      });
      return;
    }

    this.loading = true;

    const data = { ...this.form.value };

    if (data.referral_code) {
      data.referral_code = data.referral_code.trim();
    }

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