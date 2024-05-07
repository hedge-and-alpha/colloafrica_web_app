import { Component } from '@angular/core';
import { AuthFormLayoutComponent } from '../../layouts/auth-form-layout/auth-form-layout.component';
import { FormFieldComponent } from '../../../../components/form-field/form-field.component';
import { RouterLink } from '@angular/router';
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
    ButtonPrimaryDirective,
    FormErrorComponent,
    FormFieldComponent,
  ],
})
export class ForgotPasswordComponent {
  isSubmitted = false;

  form: FormGroup<{ email: FormControl<null> }> = this.fb.group(
    {
      email: [null, [Validators.required]],
    },
    { updateOn: 'submit' }
  );

  constructor(private fb: FormBuilder) {}

  get email() {
    return this.form.get('email');
  }

  handleSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    console.log(this.form.value);
  }
}
