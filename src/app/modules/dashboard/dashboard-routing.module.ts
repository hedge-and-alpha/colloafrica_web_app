import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardResolverResolver } from '../../services/api/dashboard-resolver.resolver';
import { DashboardComponent } from './dashboard.component';
import { AccountWalletComponent } from './pages/account-wallet/account-wallet.component';
import { CreateSavingsPlanComponent } from './pages/create-savings-plan/create-savings-plan.component';
import { HomeComponent } from './pages/home/home.component';
import { InvestmentDetailsComponent } from './pages/investment-details/investment-details.component';
import { AllInvestmentsComponent } from './pages/investments/all-investments/all-investments.component';
import { InvestmentsComponent } from './pages/investments/investments.component';
import { MyInvestmentsComponent } from './pages/investments/my-investments/my-investments.component';
import { MgrDetailsComponent } from './pages/mgr-details/mgr-details.component';
import { MgrCreateEditComponent } from './pages/mgr-create-edit/mgr-create-edit.component';
import { MgrComponent } from './pages/mgr/mgr.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { BankAccountsComponent } from './pages/profile/bank-accounts/bank-accounts.component';
import { CardsComponent } from './pages/profile/cards/cards.component';
import { IdVerificationComponent } from './pages/profile/id-verification/id-verification.component';
import { PersonalInfoComponent } from './pages/profile/personal-info/personal-info.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SecurityComponent } from './pages/profile/security/security.component';
import { SavingsComponent } from './pages/savings/savings.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { MgrPlanComponent } from './pages/mgr-details/pages/mgr-plan/mgr-plan.component';
import { MgrCollectionStatisticsComponent } from './pages/mgr-details/pages/mgr-collection-statistics/mgr-collection-statistics.component';
import { MgrContributionStatisticsComponent } from './pages/mgr-details/pages/mgr-contribution-statistics/mgr-contribution-statistics.component';

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
          // {
          //   path: 'bvn',
          //   title: 'BVN | Profile',
          //   component: BvnComponent,
          // },
          { path: '', redirectTo: 'personal-info', pathMatch: 'full' },
        ],
      },
      { path: 'mgr', component: MgrComponent, title: 'Contribution' },
      { path: 'mgr/public', component: MgrComponent, title: 'Public Contributions' },
      {
        path: 'mgr/:id',
        component: MgrDetailsComponent,
        children: [
          {
            path: 'details',
            title: 'Contribution Details',
            component: MgrPlanComponent,
          },
          {
            path: 'collection-statistics',
            title: 'Contribution Collection Statistics',
            component: MgrCollectionStatisticsComponent,
          },
          {
            path: 'contribution-statistics',
            title: 'Contribution Statistics',
            component: MgrContributionStatisticsComponent,
          },
          { path: '', redirectTo: 'details', pathMatch: 'full' },
        ],
      },
      {
        path: 'mgr/:id/:action',
        component: MgrCreateEditComponent,
        title: 'Contribution',
      },
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
