import { Component } from '@angular/core';
import { FormFieldComponent } from '../../../../components/form-field/form-field.component';
import { AuthFormLayoutComponent } from '../../layouts/auth-form-layout/auth-form-layout.component';

@Component({
  selector: 'ca-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  imports: [AuthFormLayoutComponent, FormFieldComponent],
})
export class ResetPasswordComponent {}
