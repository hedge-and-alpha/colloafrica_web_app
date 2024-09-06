import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emptyFieldValidator } from '../../../../validators/emptyField.validator';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from '../../../../components/alert/alert.service';
import { AuthApiService } from '../../../../services/api/auth-api.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'ca-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.css',
})
export class SigninFormComponent implements OnInit {
  inputType: 'password' | 'text' = 'password';
  isSubmitted = false;
  loading = false;

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
  ) {}

  ngOnInit() {}

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
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
        if (this.auth.url) {
          this.router.navigateByUrl(this.auth.url);
        } else {
          this.router.navigate(['/']);
        }
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
