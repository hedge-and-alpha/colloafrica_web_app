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
import { dashboardResolverResolver } from '../../services/api/dashboard-resolver.resolver';
import { PersonalInfoComponent } from './pages/profile/personal-info/personal-info.component';
import { IdVerificationComponent } from './pages/profile/id-verification/id-verification.component';
import { CardsComponent } from './pages/profile/cards/cards.component';
import { BankAccountsComponent } from './pages/profile/bank-accounts/bank-accounts.component';
import { SecurityComponent } from './pages/profile/security/security.component';
import { BvnComponent } from './pages/profile/bvn/bvn.component';
import { AllInvestmentsComponent } from './pages/investments/all-investments/all-investments.component';
import { MyInvestmentsComponent } from './pages/investments/my-investments/my-investments.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: [dashboardResolverResolver],
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
            component: PersonalInfoComponent,
          },
          {
            path: 'id-verification',
            title: 'ID verification | Profile',
            component: IdVerificationComponent,
          },
          {
            path: 'cards',
            title: 'Cards | Profile',
            component: CardsComponent,
          },
          {
            path: 'bank-accounts',
            title: 'Bank accounts | Profile',
            component: BankAccountsComponent,
          },
          {
            path: 'security',
            title: 'Security | Profile',
            component: SecurityComponent,
          },
          {
            path: 'bvn',
            title: 'BVN | Profile',
            component: BvnComponent,
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
            component: AllInvestmentsComponent,
            title: 'All investments | Investments',
          },
          {
            path: 'my-investments',
            component: MyInvestmentsComponent,
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
