import { Component } from '@angular/core';
import { FormFieldComponent } from '../../../../components/form-field/form-field.component';
import { ColsField2Component } from '../../../../components/cols-field-2/cols-field-2.component';
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
import { matchPasswordValidator } from '../../../../validators/matchPassword.validator';
import { emptyFieldValidator } from '../../../../validators/emptyField.validator';
import { NgClass } from '@angular/common';
import { SpinnerComponent } from '../../../../components/spinner/spinner.component';
import { AuthService } from '../../../../services/auth/auth.service';

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
      first_name: [null, [Validators.required, emptyFieldValidator()]],
      last_name: [null, [Validators.required, emptyFieldValidator()]],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
          emptyFieldValidator(),
        ],
      ],
      password: [null, [Validators.required, emptyFieldValidator()]],
      password_confirmation: [
        null,
        [Validators.required, emptyFieldValidator()],
      ],
      phone_number: [null, [Validators.required, emptyFieldValidator()]],
      referral_code: [null, [emptyFieldValidator()]],
      subscription: [false, [Validators.requiredTrue]],
    },
    { validators: [matchPasswordValidator], updateOn: 'submit' }
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: AuthService
  ) {}

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

    this.api.registerUser(data).subscribe({
      next: () => {
        // this.loading = false;
        this.form.reset();
        this.router.navigate(['/auth/verify-email']);
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
