import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { TableHeading } from '../../../../interfaces/table-heading';
import { chartOptions } from './data/home.data';
import { DashboardApiService } from '../../../../services/api/dashboard-api.service';
import { IDashboardAnalytics, IDashboardData } from './models/home.model';
import { Transaction } from '../../../../interfaces/account';

@Component({
  selector: 'ca-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isLoading = false;

  options!: EChartsOption;
  analytics: IDashboardAnalytics = {
    total_contributions: '',
    amount_allotted: '',
    investments: 0,
    wallet_balance: '',
  };

  tableHeading = TABLE_HEADING;
  tableData: Transaction[] = [];

  constructor(private api: DashboardApiService) { }

  ngOnInit(): void {
    this.getDashboardData();
    this.getTransactions(1);
  }

  getDashboardData() {
    this.isLoading = true;

    this.api.getDashboardData().subscribe({
      next: (res) => {
        this.isLoading = false;
        const data = res.data;
        this.analytics = {
          amount_allotted: data.amount_allotted,
          investments: data.investments,
          total_contributions: data.total_contributions,
          wallet_balance: data.wallet_balance,
        };
        const amount = data.contributions_last_12_months
          .map((contrib) => Number(contrib.total_amount))
          .reverse();
        const months = data.contributions_last_12_months
          .map((contrib) => contrib.month.slice(0, 3))
          .reverse();
        this.options = chartOptions(amount, months);
      },
    });
  }

  getTransactions(page: number) {
    this.api.getTransactions(page).subscribe({
      next: (response) => {
        this.tableData = (response.data as { transactions: Transaction[] }).transactions;
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
