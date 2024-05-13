import { Component } from '@angular/core';
import { ButtonPrimaryDirective } from '../../../../directives/button-primary/button-primary.directive';
import { OtpComponent } from '../../../../components/otp/otp.component';
import { AuthFormLayoutComponent } from '../../layouts/auth-form-layout/auth-form-layout.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { emptyFieldValidator } from '../../../../validators/emptyField.validator';
import { FormErrorComponent } from '../../../../components/form-error/form-error.component';

@Component({
  selector: 'ca-verify-email',
  standalone: true,
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css',
  imports: [
    ReactiveFormsModule,
    AuthFormLayoutComponent,
    ButtonPrimaryDirective,
    FormErrorComponent,
    OtpComponent,
  ],
})
export class VerifyEmailComponent {
  isSubmitted = false;

  form = this.fb.group(
    {
      otp: [
        '1234567',
        [Validators.required, Validators.maxLength(6), emptyFieldValidator],
      ],
    },
    { updateOn: 'submit' }
  );

  constructor(private fb: FormBuilder) {}

  handleSubmit() {
    this.isSubmitted = true;

    console.log(this.form.controls.otp);

    if (this.form.invalid) return;

    console.log('value:', this.form.value);
  }
}
