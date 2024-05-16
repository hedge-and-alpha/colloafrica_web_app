import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

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
import { ButtonPrimaryDirective } from '../../directives/button-primary/button-primary.directive';
import { ButtonSecondaryDirective } from '../../directives/button-secondary/button-secondary.directive';
import { ClickOutsideCloseDirective } from '../../directives/click-outside-close/click-outside-close.directive';
import { CopyTextDirective } from '../../directives/copy-text/copy-text.directive';
import { TooltipDirective } from '../../directives/tooltip/tooltip.directive';
import { PaperPlaneIconComponent } from '../../icons/paper-plane-icon.component';
import { AccountInfoCardComponent } from './components/account-info-card/account-info-card.component';
import { AdvertsSliderComponent } from './components/adverts-slider/adverts-slider.component';
import { AnalyticsCardComponent } from './components/analytics-card/analytics-card.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { BankAccountFormComponent } from './components/bank-account-form/bank-account-form.component';
import { CardComponent } from './components/card/card.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { H1Component } from './components/h1/h1.component';
import { HeaderComponent } from './components/header/header.component';
import { JoinMgrPlanFormComponent } from './components/join-mgr-plan-form/join-mgr-plan-form.component';
import { MgrPlanFormComponent } from './components/mgr-plan-form/mgr-plan-form.component';
import { PaymentCardFormComponent } from './components/payment-card-form/payment-card-form.component';
import { ReferralLinkComponent } from './components/referral-link/referral-link.component';
import { SavingsDetailComponent } from './components/savings-detail/savings-detail.component';
import { SavingsPlanFormComponent } from './components/savings-plan-form/savings-plan-form.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StartPlanCardComponent } from './components/start-plan-card/start-plan-card.component';
import { VerifyBvnComponent } from './components/verify-bvn/verify-bvn.component';
import { WalletAccountDetailsComponent } from './components/wallet-account-details/wallet-account-details.component';
import { WalletAccountTransactionsComponent } from './components/wallet-account-transactions/wallet-account-transactions.component';
import { WalletBalanceCardComponent } from './components/wallet-balance-card/wallet-balance-card.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ContentSidebarComponent } from './layouts/content-sidebar/content-sidebar.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { SavingsLayoutComponent } from './layouts/savings-layout/savings-layout.component';
import { AccountWalletComponent } from './pages/account-wallet/account-wallet.component';
import { TopUpComponent } from './pages/account-wallet/top-up/top-up.component';
import { WithdrawComponent } from './pages/account-wallet/withdraw/withdraw.component';
import { CreateSavingsPlanComponent } from './pages/create-savings-plan/create-savings-plan.component';
import { HomeComponent } from './pages/home/home.component';
import { InvestmentDetailsComponent } from './pages/investments/investment-details/investment-details.component';
import { InvestmentsComponent } from './pages/investments/investments.component';
import { MgrCreateComponent } from './pages/mgr/mgr-create/mgr-create.component';
import { MgrIntroComponent } from './pages/mgr/mgr-intro/mgr-intro.component';
import { MgrPlanComponent } from './pages/mgr/mgr-plan/mgr-plan.component';
import { MgrComponent } from './pages/mgr/mgr.component';
import { NotificationItemComponent } from './pages/notifications/notification-item/notification-item.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SavingsComponent } from './pages/savings/savings.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { dashboardInterceptorInterceptor } from '../../services/api/dashboard-interceptor.interceptor';
import { DashboardApiService } from '../../services/api/dashboard-api.service';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    MgrComponent,
    AccountWalletComponent,
    InvestmentsComponent,
    SavingsComponent,
    InvestmentDetailsComponent,
    DashboardComponent,
    DashboardLayoutComponent,
    SidebarComponent,
    ErrorPageComponent,
    HeaderComponent,
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
    PaymentCardFormComponent,
    BankAccountFormComponent,
    TopUpComponent,
    WithdrawComponent,
    VerifyBvnComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    IMaskModule,
    NgSelectModule,
    DashboardRoutingModule,
    CardComponent,
    ColsField2Component,
    ContentSidebarComponent,
    DropdownComponent,
    DropdownMenuComponent,
    DropdownMenuItemComponent,
    FormErrorComponent,
    FormFieldComponent,
    H1Component,
    ModalComponent,
    NotificationItemComponent,
    OtpComponent,
    PaperPlaneIconComponent,
    TableComponent,
    NgOptimizedImage,
    ButtonPrimaryDirective,
    ButtonSecondaryDirective,
    ClickOutsideCloseDirective,
    CopyTextDirective,
    DropdownMenuTriggerDirective,
    TooltipDirective,
  ],
  providers: [
    DashboardApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: dashboardInterceptorInterceptor,
      multi: true,
    },
  ],
})
export class DashboardModule {}
