import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { DashboardApiService } from '../../../../services/api/dashboard-api.service';
import { MGR } from '../../../../interfaces/mgr.interface';

@Component({
  selector: 'ca-mgr',
  templateUrl: './mgr.component.html',
  styleUrl: './mgr.component.css',
})
export class MgrComponent implements OnInit, OnDestroy {
  view: 'intro' | 'new' | 'join' = 'intro';
  hasMgr = true;
  loading = true;

  adminMgrs: MGR[] = [];
  participantMgrs: MGR[] = [];

  // mgrs$: Observable
  paramSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: DashboardApiService
  ) {}

  ngOnInit() {
    // this.route.paramMap.subscribe((param) => {
    //   const p = param.get('view');
    //   this.view = p as 'intro' | 'new' | 'join';
    // });
    this.fetchMgrs();
  }

  fetchMgrs() {
    this.loading = true;

    return forkJoin({
      admin: this.api.getAdminMGR(),
      participant: this.api.getParticipantMGR(),
    }).subscribe({
      next: ({ admin, participant }) => {
        this.loading = false;
        this.adminMgrs = admin.data;
        this.participantMgrs = participant.data;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  createNewPlan() {
    this.router.navigate(['/mgr', 0, 'new']);
  }

  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
  }
}
