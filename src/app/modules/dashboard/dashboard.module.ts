import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IMaskModule } from 'angular-imask';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ColsField2Component } from '../../components/cols-field-2/cols-field-2.component';
import { ColsField3Component } from '../../components/cols-field-3/cols-field-3.component';
import { DropdownMenuItemComponent } from '../../components/dropdown-menu/dropdown-menu-item/dropdown-menu-item.component';
import { DropdownMenuTriggerDirective } from '../../components/dropdown-menu/dropdown-menu-trigger.directive';
import { DropdownMenuComponent } from '../../components/dropdown-menu/dropdown-menu.component';
import { DropdownComponent } from '../../components/dropdown/dropdown/dropdown.component';
import { FormErrorComponent } from '../../components/form-error/form-error.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { OtpComponent } from '../../components/otp/otp.component';
import { SwitchComponent } from '../../components/switch/switch.component';
import { TableComponent } from '../../components/table/table.component';
import { ButtonIconDirective } from '../../directives/button-icon/button-icon.directive';
import { ButtonLoadingDirective } from '../../directives/button-loading/button-loading.directive';
import { ButtonPrimaryDirective } from '../../directives/button-primary/button-primary.directive';
import { ButtonSecondaryDirective } from '../../directives/button-secondary/button-secondary.directive';
import { ClickOutsideCloseDirective } from '../../directives/click-outside-close/click-outside-close.directive';
import { CopyTextDirective } from '../../directives/copy-text/copy-text.directive';
import { StatusTextDirective } from '../../directives/status-text/status-text.directive';
import { TooltipDirective } from '../../directives/tooltip/tooltip.directive';
import { PaperPlaneIconComponent } from '../../icons/paper-plane-icon.component';
import { SealCheckIconComponent } from '../../icons/seal-check-icon.component';
import { ComposeGradientPipe } from '../../pipes/compose-gradient/compose-gradient.pipe';
import { DashboardApiService } from '../../services/api/dashboard-api.service';
import { dashboardInterceptorInterceptor } from '../../services/api/dashboard-interceptor.interceptor';
import { CardAndBankStoreService } from '../../stores+/card-bank.store';
import { AdvertsSliderComponent } from './components/adverts-slider/adverts-slider.component';
import { CardComponent } from './components/card/card.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { H1Component } from './components/h1/h1.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { VerifyBvnComponent } from './components/verify-bvn/verify-bvn.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ContentSidebarComponent } from './layouts/content-sidebar/content-sidebar.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { SavingsLayoutComponent } from './layouts/savings-layout/savings-layout.component';
import { AccountWalletComponent } from './pages/account-wallet/account-wallet.component';
import { TopUpComponent } from './pages/account-wallet/components/top-up/top-up.component';
import { WalletAccountDetailsComponent } from './pages/account-wallet/components/wallet-account-details/wallet-account-details.component';
import { WalletAccountTransactionsComponent } from './pages/account-wallet/components/wallet-account-transactions/wallet-account-transactions.component';
import { WalletBalanceCardComponent } from './pages/account-wallet/components/wallet-balance-card/wallet-balance-card.component';
import { WithdrawComponent } from './pages/account-wallet/components/withdraw/withdraw.component';
import { CreateSavingsPlanComponent } from './pages/create-savings-plan/create-savings-plan.component';
import { AccountInfoCardComponent } from './pages/home/components/account-info-card/account-info-card.component';
import { AnalyticsCardComponent } from './pages/home/components/analytics-card/analytics-card.component';
import { AnalyticsComponent } from './pages/home/components/analytics/analytics.component';
import { ReferralLinkComponent } from './pages/home/components/referral-link/referral-link.component';
import { StartPlanCardComponent } from './pages/home/components/start-plan-card/start-plan-card.component';
import { HomeComponent } from './pages/home/home.component';
import { InvestmentDetailsComponent } from './pages/investment-details/investment-details.component';
import { AllInvestmentsComponent } from './pages/investments/all-investments/all-investments.component';
import { InvestmentCardComponent } from './pages/investments/components/investment-card/investment-card.component';
import { InvestmentsComponent } from './pages/investments/investments.component';
import { MyInvestmentsComponent } from './pages/investments/my-investments/my-investments.component';
import { MgrCreateEditComponent } from './pages/mgr-create-edit/mgr-create-edit.component';
import { CancelPlanModalComponent } from './pages/mgr-details/components/cancel-plan-modal/cancel-plan-modal.component';
import { ManageGroupMemberModalComponent } from './pages/mgr-details/components/manage-group-member-modal/manage-group-member-modal.component';
import { MgrBalanceCardComponent } from './pages/mgr-details/components/mgr-balance-card/mgr-balance-card.component';
import { MgrDetailsHeaderComponent } from './pages/mgr-details/components/mgr-details-header/mgr-details-header.component';
import { MgrWelcomeComponent } from './pages/mgr-details/components/mgr-welcome/mgr-welcome.component';
import { MgrDetailsComponent } from './pages/mgr-details/mgr-details.component';
import { MgrCollectionStatisticsComponent } from './pages/mgr-details/pages/mgr-collection-statistics/mgr-collection-statistics.component';
import { MgrContributionStatisticsComponent } from './pages/mgr-details/pages/mgr-contribution-statistics/mgr-contribution-statistics.component';
import { MgrPlanComponent } from './pages/mgr-details/pages/mgr-plan/mgr-plan.component';
import { AllotmentTypeComponent } from './pages/mgr/components/allotment-type/allotment-type.component';
import { JoinMgrPlanFormComponent } from './pages/mgr/components/join-mgr-plan-form/join-mgr-plan-form.component';
import { MgrIntroComponent } from './pages/mgr/components/mgr-intro/mgr-intro.component';
import { MgrPlanCardComponent } from './pages/mgr/components/mgr-plan-card/mgr-plan-card.component';
import { MgrPlanFormComponent } from './pages/mgr/components/mgr-plan-form/mgr-plan-form.component';
import { MgrPlanListComponent } from './pages/mgr/components/mgr-plan-list/mgr-plan-list.component';
import { MgrComponent } from './pages/mgr/mgr.component';
import { NotificationItemComponent } from './pages/notifications/notification-item/notification-item.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { BankAccountsComponent } from './pages/profile/bank-accounts/bank-accounts.component';
import { BvnComponent } from './pages/profile/bvn/bvn.component';
import { CardsComponent } from './pages/profile/cards/cards.component';
import { BankAccountFormComponent } from './pages/profile/components/bank-account-form/bank-account-form.component';
import { BankAccountInfoItemColumnComponent } from './pages/profile/components/bank-account-info-item-column/bank-account-info-item-column.component';
import { BankAccountInfoItemComponent } from './pages/profile/components/bank-account-info-item/bank-account-info-item.component';
import { PaymentCardComponent } from './pages/profile/components/payment-card/payment-card.component';
import { IdVerificationComponent } from './pages/profile/id-verification/id-verification.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SecurityComponent } from './pages/profile/security/security.component';
import { SavingsDetailComponent } from './pages/savings-detail/savings-detail.component';
import { SavingsPlanFormComponent } from './pages/savings/components/savings-plan-form/savings-plan-form.component';
import { SavingsComponent } from './pages/savings/savings.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

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
    MgrBalanceCardComponent,
    MgrComponent,
    MgrCreateEditComponent,
    MgrCollectionStatisticsComponent,
    MgrContributionStatisticsComponent,
    MgrDetailsComponent,
    MgrDetailsHeaderComponent,
    MgrIntroComponent,
    MgrPlanComponent,
    MgrPlanFormComponent,
    MgrPlanCardComponent,
    MgrPlanListComponent,
    MgrWelcomeComponent,
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
    AllotmentTypeComponent,
    CancelPlanModalComponent,
    ManageGroupMemberModalComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDatepickerModule,
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
    SealCheckIconComponent,
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
    ComposeGradientPipe,
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
