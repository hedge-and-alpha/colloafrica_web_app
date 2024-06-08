import { Component, Input, OnInit } from '@angular/core';
import { MGR, MGRUser } from '../../../../../../interfaces/mgr.interface';
import { TableHeading } from '../../../../../../interfaces/table-heading';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';

@Component({
  selector: 'ca-participants-table',
  templateUrl: './participants-table.component.html',
  styleUrl: './participants-table.component.css',
})
export class ParticipantsTableComponent implements OnInit {
  plan: MGR = history.state['plan'];

  tableHeading = TABLE_HEADING;

  @Input() users: MGRUser[] = [];

  constructor(private api: DashboardApiService) {}

  ngOnInit() {
    this.getMgrDetails();
  }

  getMgrDetails() {
    this.api.getMGRById(this.plan.id).subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }
}

const TABLE_HEADING: TableHeading[] = [
  { label: 'Name' },
  { label: 'Role' },
  { label: 'Position' },
  { label: 'Status' },
  { label: 'Joined' },
  { label: 'Action' },
];
