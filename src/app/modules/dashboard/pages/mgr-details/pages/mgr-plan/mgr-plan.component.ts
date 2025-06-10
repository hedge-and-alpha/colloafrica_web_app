import { Component, Input, OnInit, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { MGR, MGRUser } from '../../../../../../interfaces/mgr.interface';
import { TableHeading } from '../../../../../../interfaces/table-heading';
import { MgrStoreService } from '../../../../../../stores+/mgr.store';
import { ManageGroupMemberModalComponent } from '../../components/manage-group-member-modal/manage-group-member-modal.component';
import { AlertService } from '../../../../../../components/alert/alert.service';
import { ChangePositionComponent } from '../../components/change-position/change-position.component';
import { UserStoreService } from '../../../../../../stores+/user.store';

@Component({
  selector: 'ca-mgr-plan',
  templateUrl: './mgr-plan.component.html',
  styleUrl: './mgr-plan.component.css',
})
export class MgrPlanComponent implements OnInit {
  inviteLink: null | string = null;
  adminId?: number;
  isBvnVerified = false;
  isNewlyCreatedPlan = false;

  user = computed(() => this.userStore.user);
  activePlan = computed(() => this.mgrStore.activePlan() as { logged_user_position?: number; status?: string } | null);

  tableHeading = TABLE_HEADING;

  @Input({ required: true }) plan!: MGR;
  @Input({ required: true }) users: MGRUser[] = [];

  constructor(
    private modalService: ModalService,
    private route: ActivatedRoute,
    private mgrStore: MgrStoreService,
    private alert: AlertService,
    private userStore: UserStoreService
  ) {}

  ngOnInit() {
    this.initPageData();

    let newlyCreatedQueryParam =
      this.route.snapshot.queryParamMap.get('new_plan');

    if (newlyCreatedQueryParam) {
      this.isNewlyCreatedPlan = true;
      this.openModal(this.isNewlyCreatedPlan);
    }
  }

  initPageData() {
    // this.users = this.plan.mgr_users!;
    this.adminId = this.plan.mgr_users!.find(
      (user) => user.role === 'admin'
    )?.user_id;
    
    // Different link generation based on MGR type
    if (this.plan.is_public) {
      // For public MGRs, create direct view link
      this.inviteLink = `https://colloafrica.com/mgr/${this.plan.id}/view`;
    } else if (this.plan.invite_link) {
      // For private MGRs, create invite link
      this.inviteLink = `https://colloafrica.com/features/mgr/join?contribution_amount=${this.plan.amount}&desc=${this.plan.desc}&frequency=${this.plan.duration}&invite_id=${this.plan.invite_link}&join_date_deadline=${this.plan.join_date_deadline}&members=${this.plan.number_of_members}&mgr_id=${this.plan.id}&start_date=${this.plan.contribution_start_date}`;
    } else {
      this.inviteLink = null;
    }
  }

  async shareLink() {
    try {
      await navigator.share({
        title: this.plan.name,
        text: this.plan.desc,
        url: this.inviteLink ?? '',
      });
    } catch (error) {
      this.alert.open('danger', { details: `${error}` });
    }
  }

  handleChangeAllocationPosition() {
    this.modalService.open(
      ChangePositionComponent,
      'small',
      {
        showHeading: true,
        closable: true,
        headingText: 'Change Allocation Position',
      },
      { mgrId: this.plan.id }
    );
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

  leavePlan(userId: string, firstName: string, lastName: string) {
    this.modalService.open(
      ManageGroupMemberModalComponent,
      'small',
      {},
      {
        action: 'leave',
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
        newPosition: plan.position,
        planId: this.plan.id,
        userId: plan.user_id,
      }
    );
  }

  /**
   * Determines if the rollover button should be shown
   * The button should be shown when:
   * - The MGR is active
   * - The current user is a member of the MGR
   * - The user hasn't already opted in for rollover
   */
  showRolloverButton(): boolean {
    if (!this.plan) return false;
    
    const isActive = this.plan.status === 'active';
    const currentUser = this.user();
    const isMember = this.plan.mgr_users?.some(user => user.user_id === currentUser?.id);
    const hasOptedIn = this.plan.mgr_users?.find(user => user.user_id === currentUser?.id)?.rollover;
    
    return isActive && !!isMember && !hasOptedIn;
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
