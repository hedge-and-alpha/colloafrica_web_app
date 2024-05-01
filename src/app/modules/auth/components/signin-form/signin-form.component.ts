import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'ca-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.css',
})
export class SigninFormComponent {
  inputType: 'password' | 'text' = 'password';

  form: SignInForm = this.fb.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  handleSubmit() {
    console.log(this.form.value);
  }
}

type SignInForm = FormGroup<{
  email: FormControl<null>;
  password: FormControl<null>;
}>;
