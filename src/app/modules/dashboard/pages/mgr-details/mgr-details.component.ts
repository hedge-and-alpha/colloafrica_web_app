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
import { map } from 'rxjs';
import {
  MGR,
  MGRAnalytics,
  MGRCollectionStats,
  MGRContributionStats,
} from '../../../../interfaces/mgr.interface';
import { DashboardApiService } from '../../../../services/api/dashboard-api.service';
import { UserStoreService } from '../../../../stores+/user.store';
import { ModalService } from '../../../../components/modal/modal.service';

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

  getContributionStats(planId: string) {
    this.api
      .getMgrPlanContributionStats(planId)
      .pipe(
        map((res) => {
          res.data.contributions = [
            ...res.data.contributions,
            // {
            //   amount: '10000.00',
            //   user_id: 2,
            //   email: 'johndoe@yopmail.com',
            //   first_name: 'John',
            //   last_name: 'Doe',
            //   position: 1,
            //   role: 'admin',
            // },
            // {
            //   id: '809024d4-2fb0-11ef-aaef-705a0f866f70',
            //   amount: '10000.00',
            //   mgr_cycle_id: '83939b28-2f9d-11ef-aaef-705a0f866f70',
            //   mgr_id: '2b508c14-1d67-4c19-bcd7-49e9afab6810',
            //   user_id: 2,
            //   created_at: '2024-06-21T10:32:20.000000Z',
            // },
          ];
          return res;
        })
      )
      .subscribe({
        next: ({ data }) => {
          this.mgrContributions = data.contributions;
        },
      });
  }
}
