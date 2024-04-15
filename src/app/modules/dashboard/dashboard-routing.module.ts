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

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'mgr', component: MgrComponent },
      { path: 'wallet', component: AccountWalletComponent },
      { path: 'investments', component: InvestmentsComponent },
      { path: 'savings', component: SavingsComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'notifications', component: NotificationsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
