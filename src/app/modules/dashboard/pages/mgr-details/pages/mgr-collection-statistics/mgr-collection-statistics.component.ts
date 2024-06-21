import { Component, Input } from '@angular/core';
import { MGRCollectionStats } from '../../../../../../interfaces/mgr.interface';
import { TableHeading } from '../../../../../../interfaces/table-heading';

@Component({
  selector: 'ca-mgr-collection-statistics',
  templateUrl: './mgr-collection-statistics.component.html',
  styleUrl: './mgr-collection-statistics.component.css',
})
export class MgrCollectionStatisticsComponent {
  tableHeading = TABLE_HEADING;

  @Input({ required: true, transform: transformCollections })
  collectionStats: MGRCollectionStats[] = [];
}

function transformCollections(collections: MGRCollectionStats[]) {
  return collections.map((stat, i) => ({ sn: i + 1, ...stat }));
}

const TABLE_HEADING: TableHeading[] = [
  { label: 'S/N' },
  { label: 'Allotment Period' },
  { label: 'Amount' },
  { label: 'Payment Date' },
  { label: 'Status' },
];
