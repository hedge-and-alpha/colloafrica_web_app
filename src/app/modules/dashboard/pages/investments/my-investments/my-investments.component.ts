import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { TableComponent } from '../../../../../components/table/table.component';
import { TableHeading } from '../../../../../interfaces/table-heading';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'ca-my-investments',
  standalone: true,
  templateUrl: './my-investments.component.html',
  styleUrl: './my-investments.component.css',
  imports: [CurrencyPipe, DatePipe, CardComponent, TableComponent],
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
