import { Component } from '@angular/core';
import { TableHeading } from '../../../../interfaces/table-heading';

@Component({
  selector: 'ca-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tableHeading = TABLE_HEADING;
  tableData = [];
}

const TABLE_HEADING: TableHeading[] = [
  { label: 'Transaction ID' },
  { label: 'Amount' },
  { label: 'Status' },
  { label: 'Trans. Date' },
  { label: 'Type' },
];
