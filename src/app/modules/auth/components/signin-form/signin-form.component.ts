import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emptyFieldValidator } from '../../../../validators/emptyField.validator';

@Component({
  selector: 'ca-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.css',
})
export class SigninFormComponent implements OnInit {
  inputType: 'password' | 'text' = 'password';
  isSubmitted = false;

  form = this.fb.group(
    {
      email: [
        null,
        [Validators.required, Validators.email, emptyFieldValidator()],
      ],
      password: [null, [Validators.required, emptyFieldValidator()]],
    },
    { updateOn: 'submit' }
  );

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  handleSubmit() {
    this.isSubmitted = true;
    console.log(this.form.value);
  }
}
