import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emptyFieldValidator } from '../../../../validators/emptyField.validator';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from '../../../../components/alert/alert.service';
import { AuthApiService } from '../../../../services/api/auth-api.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { getErrorMessage } from '../../../../services/utils/error.util';

@Component({
  selector: 'ca-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.css',
})
export class SigninFormComponent implements OnInit {
  inputType: 'password' | 'text' = 'password';
  isSubmitted = false;
  loading = false;

  showVerifyModal = false;
  countdown = 3;

  form = this.fb.group(
    {
      email: [
        null,
        [
          Validators.required,
          // Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
          Validators.email,
          emptyFieldValidator(),
        ],
      ],
      password: [null, [Validators.required, emptyFieldValidator()]],
    },
    { updateOn: 'submit' }
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: AuthApiService,
    private auth: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() { }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  openVerifyModal() {
    this.showVerifyModal = true;
    this.countdown = 3;

    const interval = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(interval);
        this.router.navigate(['/auth/verify-email'], {
          queryParams: { email: this.form.value.email },
        });
      }
    }, 1000);
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;

    this.loading = true;

    this.api.login(this.form.value).subscribe({
      next: ({ message, status }) => {
        this.loading = false;
        // this.alertService.open('success', {
        //   summary: status,
        //   details: message,
        // });


        if (message === 'An OTP has been sent to your Email address') {
          this.router.navigateByUrl('/auth/forgot-password/reset');
        } else if (this.auth.url) {
          this.router.navigateByUrl(this.auth.url);
        } else {
          this.router.navigate(['/']);
        }
      },
      // error: (error: HttpErrorResponse) => {
      //   this.loading = false;
      //   const message = error?.error?.message;

      //   if (
      //     error.status === 403 &&
      //     message?.toLowerCase().includes('verify your account')
      //   ) {
      //     // resend OTP
      //     const email = this.form.value.email ?? '';

      //     this.api.resendVerificationCode(email).subscribe();

      //     // open modal
      //     this.openVerifyModal();
      //     return;
      //   }
      //   this.alertService.open('danger', {
      //     details: error.error.message,
      //   });
      // },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        const message = error?.error?.message;

        if (
          error.status === 403 &&
          message?.toLowerCase().includes('verify your account')
        ) {
          const email = this.form.value.email ?? '';
          this.api.resendVerificationCode(email).subscribe();
          this.openVerifyModal();
          return;
        }

        this.alertService.open('danger', {
          details: getErrorMessage(error),
        });
      },
    });
  }
}
