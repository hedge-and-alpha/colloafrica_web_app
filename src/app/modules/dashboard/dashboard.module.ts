import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IMaskModule } from 'angular-imask';
import { ColsField2Component } from '../../components/cols-field-2/cols-field-2.component';
import { DropdownMenuItemComponent } from '../../components/dropdown-menu/dropdown-menu-item/dropdown-menu-item.component';
import { DropdownMenuTriggerDirective } from '../../components/dropdown-menu/dropdown-menu-trigger.directive';
import { DropdownMenuComponent } from '../../components/dropdown-menu/dropdown-menu.component';
import { DropdownComponent } from '../../components/dropdown/dropdown/dropdown.component';
import { FormErrorComponent } from '../../components/form-error/form-error.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { OtpComponent } from '../../components/otp/otp.component';
import { TableComponent } from '../../components/table/table.component';
import { ButtonLoadingDirective } from '../../directives/button-loading/button-loading.directive';
import { ButtonPrimaryDirective } from '../../directives/button-primary/button-primary.directive';
import { ButtonSecondaryDirective } from '../../directives/button-secondary/button-secondary.directive';
import { ClickOutsideCloseDirective } from '../../directives/click-outside-close/click-outside-close.directive';
import { CopyTextDirective } from '../../directives/copy-text/copy-text.directive';
import { TooltipDirective } from '../../directives/tooltip/tooltip.directive';
import { PaperPlaneIconComponent } from '../../icons/paper-plane-icon.component';
import { DashboardApiService } from '../../services/api/dashboard-api.service';
import { dashboardInterceptorInterceptor } from '../../services/api/dashboard-interceptor.interceptor';
import { CardAndBankStoreService } from '../../stores+/card-bank.store';
import { AccountInfoCardComponent } from './pages/home/components/account-info-card/account-info-card.component';
import { AdvertsSliderComponent } from './components/adverts-slider/adverts-slider.component';
import { AnalyticsCardComponent } from './pages/home/components/analytics-card/analytics-card.component';
import { AnalyticsComponent } from './pages/home/components/analytics/analytics.component';
import { BankAccountFormComponent } from './pages/profile/components/bank-account-form/bank-account-form.component';
import { CardComponent } from './components/card/card.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { H1Component } from './components/h1/h1.component';
import { HeaderComponent } from './components/header/header.component';
import { JoinMgrPlanFormComponent } from './pages/mgr/components/join-mgr-plan-form/join-mgr-plan-form.component';
import { MgrPlanFormComponent } from './pages/mgr/components/mgr-plan-form/mgr-plan-form.component';
import { SavingsDetailComponent } from './pages/savings-detail/savings-detail.component';
import { SavingsPlanFormComponent } from './pages/savings/components/savings-plan-form/savings-plan-form.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StartPlanCardComponent } from './pages/home/components/start-plan-card/start-plan-card.component';
import { VerifyBvnComponent } from './components/verify-bvn/verify-bvn.component';
import { WalletAccountDetailsComponent } from './pages/account-wallet/components/wallet-account-details/wallet-account-details.component';
import { WalletAccountTransactionsComponent } from './pages/account-wallet/components/wallet-account-transactions/wallet-account-transactions.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ContentSidebarComponent } from './layouts/content-sidebar/content-sidebar.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { SavingsLayoutComponent } from './layouts/savings-layout/savings-layout.component';
import { AccountWalletComponent } from './pages/account-wallet/account-wallet.component';
import { TopUpComponent } from './pages/account-wallet/components/top-up/top-up.component';
import { CreateSavingsPlanComponent } from './pages/create-savings-plan/create-savings-plan.component';
import { HomeComponent } from './pages/home/home.component';
import { InvestmentDetailsComponent } from './pages/investment-details/investment-details.component';
import { InvestmentsComponent } from './pages/investments/investments.component';
import { MgrCreateComponent } from './pages/mgr/mgr-create/mgr-create.component';
import { MgrIntroComponent } from './pages/mgr/mgr-intro/mgr-intro.component';
import { MgrPlanComponent } from './pages/mgr/mgr-plan/mgr-plan.component';
import { MgrComponent } from './pages/mgr/mgr.component';
import { NotificationItemComponent } from './pages/notifications/notification-item/notification-item.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SavingsComponent } from './pages/savings/savings.component';
import { ColsField3Component } from '../../components/cols-field-3/cols-field-3.component';
import { IdVerificationComponent } from './pages/profile/id-verification/id-verification.component';
import { CardsComponent } from './pages/profile/cards/cards.component';
import { PaymentCardComponent } from './pages/profile/components/payment-card/payment-card.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { BankAccountInfoItemComponent } from './pages/profile/components/bank-account-info-item/bank-account-info-item.component';
import { BankAccountInfoItemColumnComponent } from './pages/profile/components/bank-account-info-item-column/bank-account-info-item-column.component';
import { BankAccountsComponent } from './pages/profile/bank-accounts/bank-accounts.component';
import { SwitchComponent } from '../../components/switch/switch.component';
import { SecurityComponent } from './pages/profile/security/security.component';
import { BvnComponent } from './pages/profile/bvn/bvn.component';
import { AllInvestmentsComponent } from './pages/investments/all-investments/all-investments.component';
import { MyInvestmentsComponent } from './pages/investments/my-investments/my-investments.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { StatusTextDirective } from '../../directives/status-text/status-text.directive';
import { WithdrawComponent } from './pages/account-wallet/components/withdraw/withdraw.component';
import { InvestmentCardComponent } from './pages/investments/components/investment-card/investment-card.component';
import { ReferralLinkComponent } from './pages/home/components/referral-link/referral-link.component';
import { WalletBalanceCardComponent } from './pages/account-wallet/components/wallet-balance-card/wallet-balance-card.component';
import { MgrBalanceCardComponent } from './pages/mgr/mgr-plan/components/mgr-balance-card/mgr-balance-card.component';
import { ButtonIconDirective } from '../../directives/button-icon/button-icon.directive';

@NgModule({
  declarations: [
    AccountInfoCardComponent,
    AccountWalletComponent,
    AdvertsSliderComponent,
    AllInvestmentsComponent,
    AnalyticsCardComponent,
    AnalyticsComponent,
    BankAccountsComponent,
    BankAccountFormComponent,
    BvnComponent,
    CardsComponent,
    CreateSavingsPlanComponent,
    DashboardComponent,
    DashboardLayoutComponent,
    HeaderComponent,
    HomeComponent,
    IdVerificationComponent,
    InvestmentDetailsComponent,
    InvestmentsComponent,
    JoinMgrPlanFormComponent,
    MgrComponent,
    MgrCreateComponent,
    MgrIntroComponent,
    MgrPlanComponent,
    MgrPlanFormComponent,
    MyInvestmentsComponent,
    NotificationsComponent,
    ProfileComponent,
    ReferralLinkComponent,
    SavingsComponent,
    SavingsDetailComponent,
    SavingsLayoutComponent,
    SavingsPlanFormComponent,
    SecurityComponent,
    SidebarComponent,
    StartPlanCardComponent,
    TopUpComponent,
    TransactionsComponent,
    VerifyBvnComponent,
    WalletAccountDetailsComponent,
    WalletAccountTransactionsComponent,
    WalletBalanceCardComponent,
    WithdrawComponent,
    MgrBalanceCardComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    IMaskModule,
    NgSelectModule,
    DashboardRoutingModule,
    BankAccountInfoItemComponent,
    BankAccountInfoItemColumnComponent,
    ButtonLoadingDirective,
    CardComponent,
    ColsField2Component,
    ColsField3Component,
    ContentSidebarComponent,
    DropdownComponent,
    DropdownMenuComponent,
    DropdownMenuItemComponent,
    ErrorPageComponent,
    FormErrorComponent,
    FormFieldComponent,
    H1Component,
    InvestmentCardComponent,
    LoaderComponent,
    ModalComponent,
    NotificationItemComponent,
    OtpComponent,
    PaperPlaneIconComponent,
    PaymentCardComponent,
    SwitchComponent,
    TableComponent,
    NgOptimizedImage,
    ButtonIconDirective,
    ButtonPrimaryDirective,
    ButtonSecondaryDirective,
    ClickOutsideCloseDirective,
    CopyTextDirective,
    DropdownMenuTriggerDirective,
    StatusTextDirective,
    TooltipDirective,
  ],
  providers: [
    DashboardApiService,
    CardAndBankStoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: dashboardInterceptorInterceptor,
      multi: true,
    },
  ],
})
export class DashboardModule {}
