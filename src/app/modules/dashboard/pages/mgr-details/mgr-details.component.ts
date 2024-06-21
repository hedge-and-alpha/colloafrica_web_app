import {
  Component,
  OnInit,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardApiService } from '../../../../services/api/dashboard-api.service';
import { MGRAnalytics } from '../../../../interfaces/mgr.interface';
import { map, tap } from 'rxjs';

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

  ngOnInit(): void {}

  handleViewChange(event: View) {
    this.view.set(event);
    // this.router.navigate([], {
    //   relativeTo: this.route,
    //   queryParams: { tab: event },
    //   replaceUrl: true,
    // });
  }

  getMgrDetails(planId: string) {
    this.api
      .getMgrAnalyticsById(planId)
      .pipe(
        map((res) => {
          const users = [
            {
              id: 2,
              first_name: 'promsie',
              last_name: 'nwanozie',
              profile_pic: 'assets/images/profile-photo.webp',
            },
            {
              id: 3,
              first_name: 'john',
              last_name: 'doe',
              profile_pic: null,
            },
          ];
          res.data.users.push(...users);
          return res;
        })
      )
      .subscribe({
        next: ({ data }) => {
          this.mgrAnalytics = data;
          console.log(this.mgrAnalytics);
          this.extraUsersCount = data.users.slice(3).length;
        },
      });
  }
}
