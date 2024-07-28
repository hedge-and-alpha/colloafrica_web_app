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
        this.isGroupStarted = data.status === 'started';
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
}
