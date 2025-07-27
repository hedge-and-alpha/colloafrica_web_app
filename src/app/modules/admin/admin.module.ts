import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { ChartWidgetComponent } from './components/chart-widget/chart-widget.component';
import { MgrDetailsComponent } from './components/mgr-details/mgr-details.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { MgrManagementComponent } from './pages/mgr-management/mgr-management.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { TransactionManagementComponent } from './pages/transaction-management/transaction-management.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    ChartWidgetComponent,
    MgrDetailsComponent,
    AdminDashboardComponent,
    MgrManagementComponent,
    UserManagementComponent,
    AnalyticsComponent,
    SettingsComponent,
    UserDetailsComponent,
    TransactionManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { } 