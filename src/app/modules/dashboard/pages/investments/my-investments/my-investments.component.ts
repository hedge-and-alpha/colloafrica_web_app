import { Component } from '@angular/core';
import { TableHeading } from '../../../../../interfaces/table-heading';

@Component({
  selector: 'ca-my-investments',
  templateUrl: './my-investments.component.html',
  styleUrl: './my-investments.component.css',
})
export class MyInvestmentsComponent {
  tableHeading = TABLE_HEADING;
  tableData = [];
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
