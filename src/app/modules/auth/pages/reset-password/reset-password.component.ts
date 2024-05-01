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

@Component({
  selector: 'ca-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  imports: [
    ReactiveFormsModule,
    AuthFormLayoutComponent,
    ButtonPrimaryDirective,
    FormFieldComponent,
  ],
})
export class ResetPasswordComponent {
  form: ResetPasswordForm = this.fb.group({
    otp: [null, [Validators.required]],
    password: [null, [Validators.required]],
    password_confirmation: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  handleSubmit() {
    console.log(this.form.value);
  }
}

type ResetPasswordForm = FormGroup<{
  otp: FormControl<null>;
  password: FormControl<null>;
  password_confirmation: FormControl<null>;
}>;
