import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

@NgModule({
  declarations: [AuthPageComponent, VerifyEmailComponent, SigninFormComponent, SignupFormComponent, AuthLayoutComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
