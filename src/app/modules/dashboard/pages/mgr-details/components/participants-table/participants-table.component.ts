import { Component, Input, OnInit } from '@angular/core';
import { MGR, MGRUser } from '../../../../../../interfaces/mgr.interface';
import { TableHeading } from '../../../../../../interfaces/table-heading';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { ManageGroupMemberModalComponent } from '../manage-group-member-modal/manage-group-member-modal.component';

@Component({
  selector: 'ca-participants-table',
  templateUrl: './participants-table.component.html',
  styleUrl: './participants-table.component.css',
})
export class ParticipantsTableComponent implements OnInit {
  plan: MGR = history.state['plan'];

  tableHeading = TABLE_HEADING;

  @Input() users: MGRUser[] = [];

  constructor(
    private api: DashboardApiService,
    private modalService: ModalService
  ) {}

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

  removeMember(userId: string, firstName: string, lastName: string) {
    this.modalService.open(
      ManageGroupMemberModalComponent,
      'small',
      {},
      {
        action: 'delete',
        name: `${firstName} ${lastName}`,
        planId: this.plan.id,
        userId: userId,
      }
    );
  }

  swapMember(userId: string, firstName: string, lastName: string) {
    this.modalService.open(
      ManageGroupMemberModalComponent,
      'small',
      {},
      { action: 'swap', newPosition: 1, planId: this.plan.id, userId: userId }
      /**
       * !TODO: pass new position
       */
    );
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
