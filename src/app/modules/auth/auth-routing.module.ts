import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,

    children: [
      {
        path: '',
        component: AuthLayoutComponent,
        children: [
          { path: 'sign-in', component: SigninFormComponent, title: 'Sign in' },
          {
            path: 'sign-up',
            loadComponent: () =>
              import('./components/signup-form/signup-form.component').then(
                (c) => c.SignupFormComponent
              ),
            title: 'Sign up',
          },
          { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
        ],
      },
      {
        path: 'verify-email',
        loadComponent: () =>
          import('./pages/verify-email/verify-email.component').then(
            (c) => c.VerifyEmailComponent
          ),
      },
    ],
  },
  {
    path: 'forgot-password',
    children: [
      {
        path: '',
        redirectTo: 'email',
        pathMatch: 'full',
      },
      {
        path: 'email',
        loadComponent: () =>
          import('./pages/forgot-password/forgot-password.component').then(
            (c) => c.ForgotPasswordComponent
          ),
      },
      {
        path: 'reset',
        loadComponent: () =>
          import('./pages/reset-password/reset-password.component').then(
            (c) => c.ResetPasswordComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
