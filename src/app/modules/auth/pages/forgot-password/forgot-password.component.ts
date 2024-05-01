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

@Component({
  selector: 'ca-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AuthFormLayoutComponent,
    ButtonPrimaryDirective,
    FormFieldComponent,
  ],
})
export class ForgotPasswordComponent {
  form: FormGroup<{ email: FormControl<null> }> = this.fb.group({
    email: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  handleSubmit() {
    console.log(this.form.value);
  }
}
