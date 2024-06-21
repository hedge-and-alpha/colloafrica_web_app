import { Component, OnInit, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { MGR, MGRUser } from '../../../../../../interfaces/mgr.interface';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { MgrStoreService } from '../../../../../../stores+/mgr.store';
import { ManageGroupMemberModalComponent } from '../../components/manage-group-member-modal/manage-group-member-modal.component';
import { TableHeading } from '../../../../../../interfaces/table-heading';

@Component({
  selector: 'ca-mgr-plan',
  templateUrl: './mgr-plan.component.html',
  styleUrl: './mgr-plan.component.css',
})
export class MgrPlanComponent implements OnInit {
  inviteLink: null | string = null;
  isBvnVerified = false;
  isNewlyCreatedPlan = false;

  plan: MGR = history.state['plan'];
  activePlan = computed(() => this.mgrStore.activePlan());

  tableHeading = TABLE_HEADING;
  users: MGRUser[] = [];

  constructor(
    private modalService: ModalService,
    private route: ActivatedRoute,
    private api: DashboardApiService,
    private mgrStore: MgrStoreService
  ) {}

  ngOnInit() {
    this.getMgrDetails();

    this.inviteLink = `${location.origin}/mgr/${this.plan.id}/join?invite_id=${this.plan.invite_link}`;

    let newlyCreatedQueryParam =
      this.route.snapshot.queryParamMap.get('new_plan');

    if (newlyCreatedQueryParam) {
      this.isNewlyCreatedPlan = true;
      this.openModal(this.isNewlyCreatedPlan);
    }
  }

  getMgrDetails() {
    this.api.getMGRById(this.plan.id).subscribe({
      next: ({ data }) => {
        this.users = data.mgr_users as MGRUser[];
      },
    });
  }

  openModal(isNew: boolean) {
    async function loadMgrWelcome() {
      return (
        await import('../../components/mgr-welcome/mgr-welcome.component')
      ).MgrWelcomeComponent;
    }

    if (!this.isBvnVerified) {
      loadMgrWelcome().then((MgrWelcomeComponent) => {
        this.modalService.open(
          MgrWelcomeComponent,
          'small',
          {
            showHeading: false,
          },
          { isNewPlan: isNew }
        );
      });
    }
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
        userId,
      }
    );
  }

  swapMember(plan: MGRUser) {
    console.log({ plan });
    this.modalService.open(
      ManageGroupMemberModalComponent,
      'small',
      {},
      {
        action: 'swap',
        newPosition: plan.position,
        planId: this.plan.id,
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
