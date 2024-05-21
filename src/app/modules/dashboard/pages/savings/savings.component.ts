import { Component } from '@angular/core';
import { TableHeading } from '../../../../interfaces/table-heading';

@Component({
  selector: 'ca-savings',
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.css',
})
export class SavingsComponent {
  hasSavings = true;
  tableHeading = TABLE_HEADING;
  tableData = [];
}

const TABLE_HEADING: TableHeading[] = [
  { label: 'Amount' },
  { label: 'Unit(s)' },
  { label: 'Payment Status' },
  { label: 'Date' },
  { label: 'Active Plan Txn?' },
];
