import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: AuthLayoutComponent,
        children: [
          { path: 'sign-in', component: SigninFormComponent },
          {
            path: 'sign-up',
            loadComponent: () =>
              import('./components/signup-form/signup-form.component').then(
                (m) => m.SignupFormComponent
              ),
          },
          { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
        ],
      },
      { path: 'verify-email', component: VerifyEmailComponent },
      {
        path: 'forgot-password/email',
        loadComponent: () =>
          import('./pages/forgot-password/forgot-password.component').then(
            (m) => m.ForgotPasswordComponent
          ),
      },
      {
        path: 'forgot-password/reset',
        loadComponent: () =>
          import('./pages/reset-password/reset-password.component').then(
            (m) => m.ResetPasswordComponent
          ),
      },
      {
        path: 'forgot-password',
        redirectTo: 'forgot-password/email',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
