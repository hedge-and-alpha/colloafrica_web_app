import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColsField2Component } from '../../components/cols-field-2/cols-field-2.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { LogoComponent } from '../../components/logo/logo.component';
import { OtpComponent } from '../../components/otp/otp.component';
import { ButtonPrimaryDirective } from '../../directives/button-primary/button-primary.directive';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { AuthFormLayoutComponent } from './layouts/auth-form-layout/auth-form-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SigninFormComponent, AuthLayoutComponent, AuthComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    AuthFormLayoutComponent,
    ButtonPrimaryDirective,
    ColsField2Component,
    FormFieldComponent,
    LogoComponent,
    OtpComponent,
  ],
})
export class AuthModule {}
