import { CommonModule, NgOptimizedImage } from '@angular/common';
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
import { MgrIntroComponent } from './pages/mgr/mgr-intro/mgr-intro.component';
import { MgrCreateComponent } from './pages/mgr/mgr-create/mgr-create.component';
import { MgrPlanFormComponent } from './components/mgr-plan-form/mgr-plan-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { JoinMgrPlanFormComponent } from './components/join-mgr-plan-form/join-mgr-plan-form.component';
import { MgrPlanComponent } from './pages/mgr/mgr-plan/mgr-plan.component';
import { NotificationItemComponent } from './pages/notifications/notification-item/notification-item.component';
import { PaymentCardFormComponent } from './components/payment-card-form/payment-card-form.component';
import { ColsField2Component } from '../../components/cols-field-2/cols-field-2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BankAccountFormComponent } from './components/bank-account-form/bank-account-form.component';
import { TooltipDirective } from '../../directives/tooltip/tooltip.directive';
import { DropdownComponent } from '../../components/dropdown/dropdown/dropdown.component';
import { DropdownMenuComponent } from '../../components/dropdown-menu/dropdown-menu.component';
import { DropdownMenuItemComponent } from '../../components/dropdown-menu/dropdown-menu-item/dropdown-menu-item.component';
import { DropdownMenuTriggerDirective } from '../../components/dropdown-menu/dropdown-menu-trigger.directive';
import { ClickOutsideCloseDirective } from '../../directives/click-outside-close/click-outside-close.directive';
import { TopUpComponent } from './pages/account-wallet/top-up/top-up.component';
import { FormErrorComponent } from '../../components/form-error/form-error.component';
import { CopyTextDirective } from '../../directives/copy-text/copy-text.directive';

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
    MgrIntroComponent,
    MgrCreateComponent,
    MgrPlanFormComponent,
    JoinMgrPlanFormComponent,
    MgrPlanComponent,
    NotificationItemComponent,
    PaymentCardFormComponent,
    BankAccountFormComponent,
    TopUpComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IMaskModule,
    NgSelectModule,
    DashboardRoutingModule,
    ButtonPrimaryDirective,
    CardComponent,
    ColsField2Component,
    ContentSidebarComponent,
    DropdownComponent,
    DropdownMenuComponent,
    DropdownMenuItemComponent,
    FormErrorComponent,
    FormFieldComponent,
    ModalComponent,
    TableComponent,
    NgOptimizedImage,
    ClickOutsideCloseDirective,
    CopyTextDirective,
    DropdownMenuTriggerDirective,
    TooltipDirective,
  ],
  providers: [],
})
export class DashboardModule {}
