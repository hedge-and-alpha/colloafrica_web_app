import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AccountWalletComponent } from './pages/account-wallet/account-wallet.component';
import { CreateSavingsPlanComponent } from './pages/create-savings-plan/create-savings-plan.component';
import { HomeComponent } from './pages/home/home.component';
import { InvestmentDetailsComponent } from './pages/investments/investment-details/investment-details.component';
import { InvestmentsComponent } from './pages/investments/investments.component';
import { MgrPlanComponent } from './pages/mgr/mgr-plan/mgr-plan.component';
import { MgrComponent } from './pages/mgr/mgr.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SavingsComponent } from './pages/savings/savings.component';

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
      { path: 'mgr-plan', component: MgrPlanComponent, title: 'MGR plan' },
      { path: 'mgr/:view', component: MgrComponent, title: 'MGR' },
      { path: 'wallet', component: AccountWalletComponent, title: 'Wallet' },
      {
        path: 'investments',
        component: InvestmentsComponent,
        title: 'Investments',
        children: [
          {
            path: 'all',
            loadComponent: () =>
              import(
                './pages/investments/all-investments/all-investments.component'
              ).then((c) => c.AllInvestmentsComponent),
            title: 'All investments | Investments',
          },
          {
            path: 'my-investments',
            loadComponent: () =>
              import(
                './pages/investments/my-investments/my-investments.component'
              ).then((c) => c.MyInvestmentsComponent),
            title: 'My investments | Investments',
          },
          { path: '', redirectTo: 'all', pathMatch: 'full' },
        ],
      },
      { path: 'investment/:name/:id', component: InvestmentDetailsComponent },
      { path: 'savings', component: SavingsComponent, title: 'My savings' },
      {
        path: 'savings/create',
        component: CreateSavingsPlanComponent,
        title: 'Create savings plan',
      },
      {
        path: 'transactions',
        loadComponent: () =>
          import('./pages/transactions/transactions.component').then(
            (c) => c.TransactionsComponent
          ),
        title: 'Transactions',
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./pages/notifications/notifications.component').then(
            (c) => c.NotificationsComponent
          ),
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
