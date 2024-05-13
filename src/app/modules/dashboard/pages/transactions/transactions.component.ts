import { Component } from '@angular/core';
import { TableHeading } from '../../../../interfaces/table-heading';
import { DatePipe, DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';
import { TableComponent } from '../../../../components/table/table.component';
import { CardComponent } from '../../components/card/card.component';
import { H1Component } from '../../components/h1/h1.component';

@Component({
  selector: 'ca-transactions',
  standalone: true,
  imports: [
    NgClass,
    DatePipe,
    DecimalPipe,
    TitleCasePipe,
    CardComponent,
    H1Component,
    TableComponent,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  tableHeading = TABLE_HEADING;
  tableData = [
    {
      id: '83456721',
      amount: '500',
      date: '2024-04-20T01:56:59.492Z',
      type: 'debit',
      status: 'success',
      debitedFrom: 'Card',
      comment: '₦5,00.00 added to MGR',
    },
    {
      id: '83456721',
      amount: '1500',
      date: '2024-04-20T01:56:59.492Z',
      type: 'credit',
      status: 'pending',
      debitedFrom: 'Card',
      comment: 'Transaction failed',
    },
    {
      id: '83456721',
      amount: '1500',
      date: '2024-04-20T01:56:59.492Z',
      type: 'credit',
      status: 'failed',
      debitedFrom: 'Card',
      comment: '₦5,00.00 added to MGR',
    },
  ];
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
