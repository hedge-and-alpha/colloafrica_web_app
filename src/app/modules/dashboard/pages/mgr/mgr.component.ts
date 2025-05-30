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
  defaultFiltervalue = 'active';

  hasMgr = true;
  loading = true;
  filtered = false;
  isPublicView = false;

  adminMgrs: MGR[] = [];
  participantMgrs: MGR[] = [];
  publicMgrs: MGR[] = [];

  // mgrs$: Observable
  paramSub!: Subscription;

  constructor(private router: Router, private api: DashboardApiService) {}

  ngOnInit() {
    // Check if we're on the public plans route
    this.isPublicView = this.router.url.includes('/public');
    
    if (this.isPublicView) {
      this.fetchPublicPlans();
    } else {
      this.fetchMgrs(this.defaultFiltervalue);
    }
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

  fetchPublicPlans() {
    this.loading = true;
    // For demo purposes - normally this would be a call to your API service
    // this.api.getPublicMgrs().subscribe(...)
    // Instead, we'll use mock data similar to the existing MGR structure
    setTimeout(() => {
      this.publicMgrs = [
        {
          id: 'pub1',
          name: 'Lead Product Designer',
          desc: 'Start building wealth for yourself and Reduce the stress of building capital for your business',
          duration: 'weekly',
          currency: 'NGN',
          number_of_members: '10',
          logged_user_position: 0,
          current_cycle_number: 1,
          amount: '5000',
          join_date_deadline: '2025-08-28',
          contribution_start_date: '2025-08-28',
          allocation_date: '2025-09-04',
          theme_color: '#4B0082',
          allotment_type: 'random',
          invite_link: 'https://collo.africa/mgr/pub1',
          creator_id: 1,
          status: 'active',
          next_allocation_to: null,
          user_allocations: [],
          cycle_dates: [],
          total_allocation: 0,
          total_contribution: '0'
        },
        {
          id: 'pub2',
          name: 'Store Supply MGR Plan',
          desc: 'Start building wealth for yourself and Reduce the stress of building capital for your business',
          duration: 'monthly',
          currency: 'NGN',
          number_of_members: '12',
          logged_user_position: 0,
          current_cycle_number: 1,
          amount: '10000',
          join_date_deadline: '2025-08-28',
          contribution_start_date: '2025-08-28',
          allocation_date: '2025-09-28',
          theme_color: '#FF6B35',
          allotment_type: 'random',
          invite_link: 'https://collo.africa/mgr/pub2',
          creator_id: 2,
          status: 'active',
          next_allocation_to: null,
          user_allocations: [],
          cycle_dates: [],
          total_allocation: 0,
          total_contribution: '0'
        },
        {
          id: 'pub3',
          name: 'Store Supply MGR Plan',
          desc: 'Start building wealth for yourself and Reduce the stress of building capital for your business',
          duration: 'monthly',
          currency: 'NGN',
          number_of_members: '8',
          logged_user_position: 0,
          current_cycle_number: 1,
          amount: '15000',
          join_date_deadline: '2025-08-28',
          contribution_start_date: '2025-08-28',
          allocation_date: '2025-09-28',
          theme_color: '#000000',
          allotment_type: 'random',
          invite_link: 'https://collo.africa/mgr/pub3',
          creator_id: 3,
          status: 'active',
          next_allocation_to: null,
          user_allocations: [],
          cycle_dates: [],
          total_allocation: 0,
          total_contribution: '0'
        },
        {
          id: 'pub4',
          name: 'Lead Product Designer',
          desc: 'Start building wealth for yourself and Reduce the stress of building capital for your business',
          duration: 'weekly',
          currency: 'NGN',
          number_of_members: '6',
          logged_user_position: 0,
          current_cycle_number: 1,
          amount: '7500',
          join_date_deadline: '2025-08-28',
          contribution_start_date: '2025-08-28',
          allocation_date: '2025-09-04',
          theme_color: '#009473',
          allotment_type: 'random',
          invite_link: 'https://collo.africa/mgr/pub4',
          creator_id: 4,
          status: 'active',
          next_allocation_to: null,
          user_allocations: [],
          cycle_dates: [],
          total_allocation: 0,
          total_contribution: '0'
        },
        {
          id: 'pub5',
          name: 'Store Supply MGR Plan',
          desc: 'Start building wealth for yourself and Reduce the stress of building capital for your business',
          duration: 'daily',
          currency: 'NGN',
          number_of_members: '15',
          logged_user_position: 0,
          current_cycle_number: 1,
          amount: '2000',
          join_date_deadline: '2025-08-28',
          contribution_start_date: '2025-08-28',
          allocation_date: '2025-08-29',
          theme_color: '#E03C31',
          allotment_type: 'random',
          invite_link: 'https://collo.africa/mgr/pub5',
          creator_id: 5,
          status: 'active',
          next_allocation_to: null,
          user_allocations: [],
          cycle_dates: [],
          total_allocation: 0,
          total_contribution: '0'
        },
        {
          id: 'pub6',
          name: 'Store Supply MGR Plan',
          desc: 'Start building wealth for yourself and Reduce the stress of building capital for your business',
          duration: 'monthly',
          currency: 'NGN',
          number_of_members: '10',
          logged_user_position: 0,
          current_cycle_number: 1,
          amount: '20000',
          join_date_deadline: '2025-08-28',
          contribution_start_date: '2025-08-28',
          allocation_date: '2025-09-28',
          theme_color: '#1877F2',
          allotment_type: 'random',
          invite_link: 'https://collo.africa/mgr/pub6',
          creator_id: 6,
          status: 'active',
          next_allocation_to: null,
          user_allocations: [],
          cycle_dates: [],
          total_allocation: 0,
          total_contribution: '0'
        }
      ];
      
      this.loading = false;
    }, 1000); // Simulate network delay
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
