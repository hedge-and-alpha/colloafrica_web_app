import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { MGR } from '../../../../interfaces/mgr.interface';
import { DashboardApiService } from '../../../../services/api/dashboard-api.service';

@Component({
  selector: 'ca-mgr',
  templateUrl: './mgr.component.html',
  styleUrl: './mgr.component.css',
})
export class MgrComponent implements OnInit, OnDestroy {
  view: 'intro' | 'new' | 'join' = 'intro';
  defaultFiltervalue = 'all';

  hasMgr = true;
  loading = true;
  filtered = false;

  adminMgrs: MGR[] = [];
  participantMgrs: MGR[] = [];

  // mgrs$: Observable
  paramSub!: Subscription;

  constructor(private router: Router, private api: DashboardApiService) {}

  ngOnInit() {
    this.fetchMgrs();
  }

  fetchMgrs(status?: string) {
    this.loading = true;

    return forkJoin({
      admin: this.api.getAdminMGR(status),
      participant: this.api.getParticipantMGR(status),
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

  handleMgrFilter(event: string) {
    this.filtered = true;
    this.defaultFiltervalue = event;
    if (event === 'all') {
      this.fetchMgrs();
      return;
    }
    this.fetchMgrs(event);
  }

  createNewPlan() {
    this.router.navigate(['/mgr', 0, 'new']);
  }

  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
  }
}
