import { Component } from '@angular/core';
import { ButtonPrimaryDirective } from '../../../../directives/button-primary/button-primary.directive';
import { OtpComponent } from '../../../../components/otp/otp.component';
import { AuthFormLayoutComponent } from '../../layouts/auth-form-layout/auth-form-layout.component';

@Component({
  selector: 'ca-verify-email',
  standalone: true,
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css',
  imports: [AuthFormLayoutComponent, ButtonPrimaryDirective, OtpComponent],
})
export class VerifyEmailComponent {}
