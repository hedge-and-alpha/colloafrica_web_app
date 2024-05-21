import { Component } from '@angular/core';
import { TableHeading } from '../../../../interfaces/table-heading';

@Component({
  selector: 'ca-wallet-account-transactions',
  templateUrl: './wallet-account-transactions.component.html',
  styleUrl: './wallet-account-transactions.component.css',
})
export class WalletAccountTransactionsComponent {
  tableHeading = TABLE_HEADING;
  tableData = [];
}

const TABLE_HEADING: TableHeading[] = [
  { label: 'Transaction ID' },
  { label: 'Amount' },
  { label: 'Trans. Date' },
  { label: 'Debit/Credit' },
];
