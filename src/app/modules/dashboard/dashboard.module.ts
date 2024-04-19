import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorPageComponent } from './components/error-page/error-page.component';
import { H1Component } from './components/h1/h1.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AccountWalletComponent } from './pages/account-wallet/account-wallet.component';
import { HomeComponent } from './pages/home/home.component';
import { AllInvestmentsComponent } from './pages/investments/all-investments/all-investments.component';
import { InvestmentDetailsComponent } from './pages/investments/investment-details/investment-details.component';
import { InvestmentsComponent } from './pages/investments/investments.component';
import { MyInvestmentsComponent } from './pages/investments/my-investments/my-investments.component';
import { MgrComponent } from './pages/mgr/mgr.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SavingsComponent } from './pages/savings/savings.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { ContentSidebarComponent } from './layouts/content-sidebar/content-sidebar.component';
import { AsideCardComponent } from './components/aside-card/aside-card.component';
import { AdvertsSliderComponent } from './components/adverts-slider/adverts-slider.component';
import { WalletBalanceCardComponent } from './components/wallet-balance-card/wallet-balance-card.component';

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
    AllInvestmentsComponent,
    MyInvestmentsComponent,
    InvestmentDetailsComponent,
    DashboardComponent,
    DashboardLayoutComponent,
    SidebarComponent,
    ErrorPageComponent,
    HeaderComponent,
    H1Component,
    ContentSidebarComponent,
    AsideCardComponent,
    AdvertsSliderComponent,
    WalletBalanceCardComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
