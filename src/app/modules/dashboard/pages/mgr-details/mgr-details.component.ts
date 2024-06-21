import {
  Component,
  OnInit,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardApiService } from '../../../../services/api/dashboard-api.service';
import {
  MGRAnalytics,
  MGRCollectionStats,
} from '../../../../interfaces/mgr.interface';
import { map, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

type View = 'details' | 'contribution' | 'collection';

@Component({
  selector: 'ca-mgr-details',
  templateUrl: './mgr-details.component.html',
  styleUrl: './mgr-details.component.css',
})
export class MgrDetailsComponent implements OnInit {
  view: WritableSignal<View> = signal('details');
  planId = history.state['plan']['id'];

  extraUsersCount = 0;

  mgrAnalytics: MGRAnalytics = {
    total_contributions: '',
    total_allotments: 0,
    total_members: 0,
    users: [],
  };

  mgrCollections: MGRCollectionStats[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: DashboardApiService
  ) {
    effect(() => {
      if (this.view() !== 'details') {
        this.getMgrDetails(this.planId);
      }
    });
  }

  ngOnInit(): void {
    this.getCollectionStats(this.planId);
  }

  handleViewChange(event: View) {
    this.view.set(event);
    // this.router.navigate([], {
    //   relativeTo: this.route,
    //   queryParams: { tab: event },
    //   replaceUrl: true,
    // });
  }

  getMgrDetails(planId: string) {
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

  getCollectionStats(planId: string) {
    this.api
      .getMgrPlanCollectionStats(planId)
      .pipe(
        map((res) => {
          res.data.allotments = [
            ...res.data.allotments,
            {
              id: '809024d4-2fb0-11ef-aaef-705a0f866f70',
              amount: '10000.00',
              mgr_cycle_id: '83939b28-2f9d-11ef-aaef-705a0f866f70',
              mgr_id: '2b508c14-1d67-4c19-bcd7-49e9afab6810',
              user_id: 2,
              first_name: '',
              last_name: '',
              created_at: '2024-06-21T10:32:20.000000Z',
            },
            {
              id: '809024d4-2fb0-11ef-aaef-705a0f866f70',
              amount: '10000.00',
              mgr_cycle_id: '83939b28-2f9d-11ef-aaef-705a0f866f70',
              mgr_id: '2b508c14-1d67-4c19-bcd7-49e9afab6810',
              user_id: 2,
              first_name: '',
              last_name: '',
              created_at: '2024-06-21T10:32:20.000000Z',
            },
          ];
          return res;
        })
      )
      .subscribe({
        next: ({ data }) => {
          this.mgrCollections = data.allotments;
        },
      });
  }
}
