import { Component } from '@angular/core';
import { TableHeading } from '../../../../../interfaces/table-heading';

@Component({
  selector: 'ca-my-investments',
  templateUrl: './my-investments.component.html',
  styleUrl: './my-investments.component.css',
})
export class MyInvestmentsComponent {
  tableHeading = TABLE_HEADING;
  tableData = TABLE_DATA;
}

const TABLE_HEADING: TableHeading[] = [
  { label: 'Category' },
  { label: 'Title' },
  { label: 'Maturity Date' },
  { label: 'Invested Amt' },
  { label: 'Returns' },
  { label: 'Status' },
  { label: 'Certificate Investment' },
];

const TABLE_DATA = [
  {
    category: 'real estate',
    title: 'terra villa',
    date: new Date().toISOString(),
    amount: 30000,
    returns: 30,
    status: 'completed',
    certificate: '',
  },
  {
    category: 'real estate',
    title: 'terra villa',
    date: new Date().toISOString(),
    amount: 30000,
    returns: 30,
    status: 'ongoing',
    certificate: '',
  },
];
