import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { TableHeading } from '../../../../interfaces/table-heading';
import { chartOptions } from './data/home.data';
import { DashboardApiService } from '../../../../services/api/dashboard-api.service';
import { IDashboardAnalytics, IDashboardData } from './models/home.model';

@Component({
  selector: 'ca-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isLoading = false;

  options!: EChartsOption;
  analytics!: IDashboardAnalytics;

  tableHeading = TABLE_HEADING;
  tableData = [];

  constructor(private api: DashboardApiService) {}

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData() {
    this.isLoading = true;

    this.api.getDashboardData().subscribe({
      next: (res: IDashboardData) => {
        this.isLoading = false;
        this.analytics = {
          amount_allotted: res.amount_allotted,
          investments: res.investments,
          total_contributions: res.total_contributions,
          wallet_balance: res.wallet_balance,
        };
        const amount = res.contributions_last_12_months.map((contrib) =>
          Number(contrib.total_amount)
        );
        const months = res.contributions_last_12_months.map((contrib) =>
          contrib.month.slice(0, 3)
        );
        this.options = chartOptions(amount, months);
      },
    });
  }
}

const TABLE_HEADING: TableHeading[] = [
  { label: 'Transaction ID' },
  { label: 'Amount' },
  { label: 'Status' },
  { label: 'Trans. Date' },
  { label: 'Type' },
];
