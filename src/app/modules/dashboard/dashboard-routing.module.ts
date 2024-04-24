import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MgrComponent } from './pages/mgr/mgr.component';
import { AccountWalletComponent } from './pages/account-wallet/account-wallet.component';
import { InvestmentsComponent } from './pages/investments/investments.component';
import { SavingsComponent } from './pages/savings/savings.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { CreateSavingsPlanComponent } from './pages/create-savings-plan/create-savings-plan.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent, title: 'Home' },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile',
        children: [
          {
            path: 'personal-info',
            title: 'Personal info | Profile',
            loadComponent: () =>
              import(
                './pages/profile/personal-info/personal-info.component'
              ).then((c) => c.PersonalInfoComponent),
          },
          {
            path: 'id-verification',
            title: 'ID verification | Profile',
            loadComponent: () =>
              import(
                './pages/profile/id-verification/id-verification.component'
              ).then((c) => c.IdVerificationComponent),
          },
          {
            path: 'cards',
            title: 'Cards | Profile',
            loadComponent: () =>
              import('./pages/profile/cards/cards.component').then(
                (c) => c.CardsComponent
              ),
          },
          {
            path: 'bank-accounts',
            title: 'Bank accounts | Profile',
            loadComponent: () =>
              import(
                './pages/profile/bank-accounts/bank-accounts.component'
              ).then((c) => c.BankAccountsComponent),
          },
          {
            path: 'security',
            title: 'Security | Profile',
            loadComponent: () =>
              import('./pages/profile/security/security.component').then(
                (c) => c.SecurityComponent
              ),
          },
          {
            path: 'bvn',
            title: 'BVN | Profile',
            loadComponent: () =>
              import('./pages/profile/bvn/bvn.component').then(
                (c) => c.BvnComponent
              ),
          },
          { path: '', redirectTo: 'personal-info', pathMatch: 'full' },
        ],
      },
      { path: 'mgr', component: MgrComponent, title: 'Merry go round' },
      { path: 'wallet', component: AccountWalletComponent, title: 'Wallet' },
      {
        path: 'investments',
        component: InvestmentsComponent,
        title: 'Investments',
      },
      { path: 'savings', component: SavingsComponent, title: 'My savings' },
      {
        path: 'savings/create',
        component: CreateSavingsPlanComponent,
        title: 'Create savings plan',
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        title: 'Transactions',
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        title: 'Notifications',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
