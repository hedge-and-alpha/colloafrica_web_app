import { Component } from '@angular/core';
import { TableHeading } from '../../../../interfaces/table-heading';

@Component({
  selector: 'ca-wallet-account-transactions',
  templateUrl: './wallet-account-transactions.component.html',
  styleUrl: './wallet-account-transactions.component.css',
})
export class WalletAccountTransactionsComponent {
  tableHeading = TABLE_HEADING;
  tableData = [
    {
      id: '83456721',
      amount: '500',
      date: '2024-04-20T01:56:59.492Z',
      type: 'debit',
    },
    {
      id: '83456721',
      amount: '1500',
      date: '2024-04-20T01:56:59.492Z',
      type: 'credit',
    },
  ];
}

const TABLE_HEADING: TableHeading[] = [
  { label: 'Transaction ID' },
  { label: 'Amount' },
  { label: 'Trans. Date' },
  { label: 'Debit/Credit' },
];
