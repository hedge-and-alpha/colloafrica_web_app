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
  filtered = false;

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
