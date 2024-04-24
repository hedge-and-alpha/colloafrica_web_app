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
  tableData = TABLE_DATA;
}

const TABLE_HEADING: TableHeading[] = [
  { label: 'Amount' },
  { label: 'Unit(s)' },
  { label: 'Payment Status' },
  { label: 'Date' },
  { label: 'Active Plan Txn?' },
];

const TABLE_DATA = [
  {
    amount: 10000,
    units: 10,
    status: 'success',
    date: new Date().toISOString(),
    active: 'Yes',
  },
  {
    amount: 10000,
    units: 10,
    status: 'pending',
    date: new Date().toISOString(),
    active: 'No',
  },
  {
    amount: 10000,
    units: 10,
    status: 'failed',
    date: new Date().toISOString(),
    active: 'Yes',
  },
];
