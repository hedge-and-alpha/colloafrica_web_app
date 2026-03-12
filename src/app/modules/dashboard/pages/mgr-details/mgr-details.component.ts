import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../../../components/modal/modal.service';
import {
  MGR,
  MGRAnalytics,
  MGRContributionStats,
  MGRUser,
} from '../../../../interfaces/mgr.interface';
import { DashboardApiService } from '../../../../services/api/dashboard-api.service';
import { UserStoreService } from '../../../../stores+/user.store';
import { PublicMgrJoinModalComponent } from '../mgr/components/public-mgr-join-modal/public-mgr-join-modal.component';

type View = 'details' | 'contribution' | 'collection';

@Component({
  selector: 'ca-mgr-details',
  templateUrl: './mgr-details.component.html',
  styleUrl: './mgr-details.component.css',
})
export class MgrDetailsComponent implements OnInit {
  planId!: string;
  planName!: string;

  adminId!: number;
  extraUsersCount = 0;

  isUserAdmin = false;
  isGroupStarted = false;
  loading = false;

  user = computed(() => this.userStore.user);
  view: WritableSignal<View> = signal('details');

  mgrPlan!: MGR;
  mgrPlanUsers: MGRUser[] = [];
  mgrAnalytics: MGRAnalytics = {
    total_contributions: '',
    total_allotments: 0,
    total_members: 0,
    users: [],
  };

  mgrContributions: MGRContributionStats[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: DashboardApiService,
    private userStore: UserStoreService,
    private modalService: ModalService
  ) {
    this.planId = this.route.snapshot.paramMap.get('id')!;

    effect(() => {
      if (this.modalService.data()?.action === 'refresh') {
        this.getMgrDetails();
      }
    });
  }

  ngOnInit(): void {
    this.getMgrDetails();

    // Check for showJoin query parameter for public MGR auto-join
    const showJoin = this.route.snapshot.queryParamMap.get('showJoin');
    if (showJoin === 'true') {
      // Wait for plan data to load before showing join modal
      setTimeout(() => {
        if (this.mgrPlan?.is_public) {
          this.showPublicJoinModal();
        }
      }, 500);
    }
  }

  handleViewChange(event: View) {
    this.view.set(event);
  }

  getMgrDetails() {
    this.api.getMGRById(this.planId).subscribe({
      next: ({ data }) => {
        this.mgrPlan = data;
        this.mgrPlanUsers = data.mgr_users!;
        const user = data.mgr_users!.find(
          (user) => user.user_id === this.user()?.id
        );
        this.planName = data.name;
        this.isUserAdmin = !!user && user.role === 'admin';
        this.isGroupStarted = data.status === 'started' || data.status === 'completed';
      },
    });
  }

  getMgrAnalytics(planId: string) {
    this.api.getMgrAnalyticsById(planId).subscribe({
      next: ({ data }) => {
        this.mgrAnalytics = data;
        this.extraUsersCount = data.users.slice(3).length;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      },
    });
  }

  showPublicJoinModal() {
    this.modalService.open(
      PublicMgrJoinModalComponent,
      'small',
      {
        closable: true,
        showHeading: false,
      },
      { plan: this.mgrPlan }
    );
  }
}
