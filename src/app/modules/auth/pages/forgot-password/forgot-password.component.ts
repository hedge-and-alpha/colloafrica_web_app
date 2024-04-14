import { Component } from '@angular/core';
import { AuthFormLayoutComponent } from '../../layouts/auth-form-layout/auth-form-layout.component';
import { FormFieldComponent } from '../../../../components/form-field/form-field.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ca-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  imports: [RouterLink, AuthFormLayoutComponent, FormFieldComponent],
})
export class ForgotPasswordComponent {}
