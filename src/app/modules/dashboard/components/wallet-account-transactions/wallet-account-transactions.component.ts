import { Component, OnInit } from '@angular/core';
import { TableHeading } from '../../../../interfaces/table-heading';
import { DashboardApiService } from '../../../../services/api/dashboard-api.service';
import { Transaction } from '../../../../interfaces/account';

@Component({
  selector: 'ca-wallet-account-transactions',
  templateUrl: './wallet-account-transactions.component.html',
  styleUrl: './wallet-account-transactions.component.css',
})
export class WalletAccountTransactionsComponent implements OnInit {
  tableHeading = TABLE_HEADING;
  tableData: Transaction[] = [];

  constructor(private api: DashboardApiService) {}

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions() {
    this.api.getTransactions().subscribe({
      next: ({ data }) => {
        this.tableData = data.transactions;
      },
    });
  }
}

const TABLE_HEADING: TableHeading[] = [
  { label: 'Transaction ID' },
  { label: 'Amount' },
  { label: 'Trans. Date' },
  { label: 'Debit/Credit' },
];
