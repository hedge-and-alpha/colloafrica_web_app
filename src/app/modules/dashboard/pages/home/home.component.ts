import { Component } from '@angular/core';
import { TableHeading } from '../../../../interfaces/table-heading';

@Component({
  selector: 'ca-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tableHeading = TABLE_HEADING;
  tableData = [
    {
      id: '83456721',
      amount: '500',
      date: '2024-04-20T01:56:59.492Z',
      type: 'debit',
      status: 'success',
    },
    {
      id: '83456721',
      amount: '1500',
      date: '2024-04-20T01:56:59.492Z',
      type: 'credit',
      status: 'pending',
    },
    {
      id: '83456721',
      amount: '1500',
      date: '2024-04-20T01:56:59.492Z',
      type: 'credit',
      status: 'failed',
    },
  ];
}

const TABLE_HEADING: TableHeading[] = [
  { label: 'Transaction ID' },
  { label: 'Amount' },
  { label: 'Status' },
  { label: 'Trans. Date' },
  { label: 'Type' },
];
