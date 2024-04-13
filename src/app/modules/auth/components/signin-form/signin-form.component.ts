import { Component } from '@angular/core';

@Component({
  selector: 'ca-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.css',
})
export class SigninFormComponent {
  inputType: 'password' | 'text' = 'password';
}
