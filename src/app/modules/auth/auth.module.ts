import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthComponent } from './auth.component';
import { LogoComponent } from '../../components/logo/logo.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { ColsField2Component } from '../../components/cols-field-2/cols-field-2.component';

@NgModule({
  declarations: [
    VerifyEmailComponent,
    SigninFormComponent,
    AuthLayoutComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ColsField2Component,
    FormFieldComponent,
    LogoComponent,
  ],
})
export class AuthModule {}
