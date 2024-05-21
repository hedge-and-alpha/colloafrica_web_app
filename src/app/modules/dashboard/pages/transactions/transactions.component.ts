import { Component } from '@angular/core';
import { TableHeading } from '../../../../interfaces/table-heading';

@Component({
  selector: 'ca-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  tableHeading = TABLE_HEADING;
  tableData = [];
}

const TABLE_HEADING: TableHeading[] = [
  { label: 'Transaction ID' },
  { label: 'Amount' },
  { label: 'Trans. Date' },
  { label: 'Status' },
  { label: 'Type' },
  { label: 'Debited From' },
  { label: 'Comment' },
];
