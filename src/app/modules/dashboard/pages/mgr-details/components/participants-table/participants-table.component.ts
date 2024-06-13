import { Component, Input, OnInit, computed, effect } from '@angular/core';
import { MGR, MGRUser } from '../../../../../../interfaces/mgr.interface';
import { TableHeading } from '../../../../../../interfaces/table-heading';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { ManageGroupMemberModalComponent } from '../manage-group-member-modal/manage-group-member-modal.component';
import { MgrStoreService } from '../../../../../../stores+/mgr.store';
import { UserStoreService } from '../../../../../../stores+/user.store';

@Component({
  selector: 'ca-participants-table',
  templateUrl: './participants-table.component.html',
  styleUrl: './participants-table.component.css',
})
export class ParticipantsTableComponent implements OnInit {
  plan: MGR = history.state['plan'];

  tableHeading = TABLE_HEADING;

  users = computed(() => this.mgrStore.activePlan()?.mgr_users);
  activePlan = computed(() => this.mgrStore.activePlan());

  constructor(
    private api: DashboardApiService,
    private modalService: ModalService,
    private mgrStore: MgrStoreService,
    private userStore: UserStoreService
  ) {
    effect(() => {
      console.log(this.modalService.data());
    });
  }

  ngOnInit() {}

  removeMember(userId: string, firstName: string, lastName: string) {
    this.modalService.open(
      ManageGroupMemberModalComponent,
      'small',
      {},
      {
        action: 'delete',
        name: `${firstName} ${lastName}`,
        planId: this.plan.id,
        userId,
      }
    );
  }

  swapMember(plan: MGRUser) {
    this.modalService.open(
      ManageGroupMemberModalComponent,
      'small',
      {},
      {
        action: 'swap',
        newPosition: 4,
        planId: this.plan.id,
        userId: plan.user_id,
      }
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
