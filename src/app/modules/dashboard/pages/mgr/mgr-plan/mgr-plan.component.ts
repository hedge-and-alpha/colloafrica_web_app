import { Component } from '@angular/core';
import { TableHeading } from '../../../../../interfaces/table-heading';

@Component({
  selector: 'ca-mgr-plan',
  templateUrl: './mgr-plan.component.html',
  styleUrl: './mgr-plan.component.css',
})
export class MgrPlanComponent {
  tableHeading = TABLE_HEADING;
}

const TABLE_HEADING: TableHeading[] = [
  { label: 'Name' },
  { label: 'Role' },
  { label: 'Position' },
  { label: 'Status' },
  { label: 'Joined' },
  { label: 'Action' },
];
