import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MgrComponent } from './pages/mgr/mgr.component';
import { AccountWalletComponent } from './pages/account-wallet/account-wallet.component';
import { InvestmentsComponent } from './pages/investments/investments.component';
import { SavingsComponent } from './pages/savings/savings.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { PersonalInfoComponent } from './pages/profile/personal-info/personal-info.component';
import { IdVerificationComponent } from './pages/profile/id-verification/id-verification.component';
import { CardsComponent } from './pages/profile/cards/cards.component';
import { BankAccountsComponent } from './pages/profile/bank-accounts/bank-accounts.component';
import { SecurityComponent } from './pages/profile/security/security.component';
import { BvnComponent } from './pages/profile/bvn/bvn.component';
import { AllInvestmentsComponent } from './pages/investments/all-investments/all-investments.component';
import { MyInvestmentsComponent } from './pages/investments/my-investments/my-investments.component';
import { InvestmentDetailsComponent } from './pages/investments/investment-details/investment-details.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    MgrComponent,
    AccountWalletComponent,
    InvestmentsComponent,
    SavingsComponent,
    TransactionsComponent,
    NotificationsComponent,
    PersonalInfoComponent,
    IdVerificationComponent,
    CardsComponent,
    BankAccountsComponent,
    SecurityComponent,
    BvnComponent,
    AllInvestmentsComponent,
    MyInvestmentsComponent,
    InvestmentDetailsComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
