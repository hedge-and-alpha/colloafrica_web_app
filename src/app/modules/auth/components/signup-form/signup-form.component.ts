import { Component } from '@angular/core';
import { FormFieldComponent } from '../../../../components/form-field/form-field.component';
import { ColsField2Component } from '../../../../components/cols-field-2/cols-field-2.component';
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
  selector: 'ca-signup-form',
  standalone: true,
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ButtonPrimaryDirective,
    ColsField2Component,
    FormFieldComponent,
  ],
})
export class SignupFormComponent {
  form: FormGroup<SignupForm> = this.fb.group({
    first_name: [null, [Validators.required]],
    last_name: [null, [Validators.required]],
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
    password_confirmation: [null, [Validators.required]],
    phone_number: [null, [Validators.required]],
    referral_code: [null],
  });

  constructor(private fb: FormBuilder) {}

  handleSubmit() {
    console.log(this.form.value);
  }
}

type SignupForm = {
  first_name: FormControl<null>;
  last_name: FormControl<null>;
  email: FormControl<null>;
  phone_number: FormControl<null>;
  password: FormControl<null>;
  password_confirmation: FormControl<null>;
  referral_code: FormControl<null>;
};
