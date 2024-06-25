import { Component, Input } from '@angular/core';
import { TableHeading } from '../../../../../../interfaces/table-heading';
import { MGRContributionStats } from '../../../../../../interfaces/mgr.interface';

@Component({
  selector: 'ca-mgr-contribution-statistics',
  templateUrl: './mgr-contribution-statistics.component.html',
  styleUrl: './mgr-contribution-statistics.component.css',
})
export class MgrContributionStatisticsComponent {
  tableHeading = TABLE_HEADING;

  @Input({ required: true }) contributionStats: MGRContributionStats[] = [];
}

const TABLE_HEADING: TableHeading[] = [
  { label: 'Name' },
  { label: 'Amount' },
  { label: 'Role' },
  { label: 'Position' },
  { label: 'Status' },
];
