import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IMaskModule } from 'angular-imask';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { TableComponent } from '../../components/table/table.component';
import { ButtonPrimaryDirective } from '../../directives/button-primary/button-primary.directive';
import { AccountInfoCardComponent } from './components/account-info-card/account-info-card.component';
import { AdvertsSliderComponent } from './components/adverts-slider/adverts-slider.component';
import { AnalyticsCardComponent } from './components/analytics-card/analytics-card.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { CardComponent } from './components/card/card.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { H1Component } from './components/h1/h1.component';
import { HeaderComponent } from './components/header/header.component';
import { ReferralLinkComponent } from './components/referral-link/referral-link.component';
import { SavingsDetailComponent } from './components/savings-detail/savings-detail.component';
import { SavingsPlanFormComponent } from './components/savings-plan-form/savings-plan-form.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StartPlanCardComponent } from './components/start-plan-card/start-plan-card.component';
import { WalletAccountDetailsComponent } from './components/wallet-account-details/wallet-account-details.component';
import { WalletAccountTransactionsComponent } from './components/wallet-account-transactions/wallet-account-transactions.component';
import { WalletBalanceCardComponent } from './components/wallet-balance-card/wallet-balance-card.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ContentSidebarComponent } from './layouts/content-sidebar/content-sidebar.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { SavingsLayoutComponent } from './layouts/savings-layout/savings-layout.component';
import { AccountWalletComponent } from './pages/account-wallet/account-wallet.component';
import { CreateSavingsPlanComponent } from './pages/create-savings-plan/create-savings-plan.component';
import { HomeComponent } from './pages/home/home.component';
import { InvestmentDetailsComponent } from './pages/investments/investment-details/investment-details.component';
import { InvestmentsComponent } from './pages/investments/investments.component';
import { MgrComponent } from './pages/mgr/mgr.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SavingsComponent } from './pages/savings/savings.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

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
    InvestmentDetailsComponent,
    DashboardComponent,
    DashboardLayoutComponent,
    SidebarComponent,
    ErrorPageComponent,
    HeaderComponent,
    H1Component,
    AdvertsSliderComponent,
    WalletBalanceCardComponent,
    WalletAccountDetailsComponent,
    WalletAccountTransactionsComponent,
    AnalyticsCardComponent,
    AnalyticsComponent,
    ReferralLinkComponent,
    StartPlanCardComponent,
    AccountInfoCardComponent,
    SavingsLayoutComponent,
    SavingsDetailComponent,
    SavingsPlanFormComponent,
    CreateSavingsPlanComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    IMaskModule,
    ButtonPrimaryDirective,
    CardComponent,
    ContentSidebarComponent,
    FormFieldComponent,
    ModalComponent,
    TableComponent,
  ],
})
export class DashboardModule {}
