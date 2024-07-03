import { Component, Input } from '@angular/core';
import { IDashboardAnalytics } from '../../models/home.model';

@Component({
  selector: 'ca-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent {
  @Input() analytics: IDashboardAnalytics = {
    total_contributions: '',
    amount_allotted: '',
    investments: 0,
    wallet_balance: '',
  };
}
