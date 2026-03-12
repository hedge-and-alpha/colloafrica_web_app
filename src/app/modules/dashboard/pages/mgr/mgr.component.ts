import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, debounceTime, distinctUntilChanged, forkJoin } from 'rxjs';
import { ModalService } from '../../../../components/modal/modal.service';
import { MGR } from '../../../../interfaces/mgr.interface';
import { DashboardApiService } from '../../../../services/api/dashboard-api.service';
import { PublicMgrJoinModalComponent } from './components/public-mgr-join-modal/public-mgr-join-modal.component';

@Component({
  selector: 'ca-mgr',
  styleUrl: './mgr.component.css',
  templateUrl: './mgr.component.html',
})
export class MgrComponent implements OnInit, OnDestroy {
  defaultFiltervalue = 'active';
  view: 'intro' | 'new' | 'join' = 'intro';

  hasMgr = true;
  loading = true;
  filtered = false;
  isPublicView = false;
  canCreatePublicMgr = false;

  adminMgrs: MGR[] = [];
  participantMgrs: MGR[] = [];
  publicMgrs: MGR[] = [];
  allPublicMgrs: MGR[] = [];

  searchControl = new FormControl('');
  searchFilters = {
    search: '',
    frequency: '',
    duration: '',
    category: '',
    min_amount: '',
    max_amount: '',
    start_date_from: '',
    start_date_to: ''
  };

  paramSub!: Subscription;
  searchSub!: Subscription;

  constructor(private router: Router, private api: DashboardApiService, private modalService: ModalService) { }

  ngOnInit() {
    this.isPublicView = this.router.url.includes('/public');

    if (this.isPublicView) {
      this.checkPublicMgrPermission();
    }

    if (this.isPublicView) {
      this.fetchPublicPlans();
    } else {
      this.fetchMgrs(this.defaultFiltervalue);
    }

    // Setup search functionality for public MGRs
    if (this.isPublicView) {
      this.searchSub = this.searchControl.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(searchTerm => {
        this.searchFilters.search = searchTerm || '';
        this.applyFilters();
      });
    }
  }

  checkPublicMgrPermission() {
    this.api.checkPublicMgrPermission().subscribe({
      next: (response) => {
        this.canCreatePublicMgr = response.data?.can_create || false;
      },
      error: (error) => {
        console.error('Error checking public MGR permission:', error);
        this.canCreatePublicMgr = false;
      }
    });
  }

  fetchMgrs(status?: string) {
    this.loading = true;

    return forkJoin({
      admin: this.api.getAdminMGR(status),
      participant: this.api.getParticipantMGR(status),
    }).subscribe({
      next: (result) => {
        const { admin, participant } = result as { admin: { data: MGR[] }, participant: { data: MGR[] } };
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

    this.api.getPublicMgrs().subscribe({
      next: (response) => {
        this.loading = false;
        this.publicMgrs = response.data?.data || []; // Handle paginated response
        this.allPublicMgrs = response.data?.data || []; // Store all MGRs for filtering
      },
      error: (error) => {
        this.loading = false;
        console.error('Error fetching public MGRs:', error);
        // Fallback to mock data for development if API fails
        this.publicMgrs = [];
        this.allPublicMgrs = [];
      }
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

  createPublicPlan() {
    this.router.navigate(['/mgr', 0, 'new'], { queryParams: { type: 'public' } });
  }

  joinPublicPlan(plan: MGR) {
    if (plan.can_join === false || (plan.display_status || plan.status) === 'filled' || (plan.display_status || plan.status) === 'deadline passed') {
      return;
    }

    this.modalService.open(
      PublicMgrJoinModalComponent,
      'small',
      {
        closable: true,
        showHeading: false,
      },
      { plan }
    );
  }

  getJoinButtonText(plan: MGR): string {
    if ((plan.display_status || plan.status) === 'filled') {
      return 'Group Filled';
    } else if ((plan.display_status || plan.status) === 'deadline passed') {
      return 'Deadline Passed';
    } else if (plan.can_join === false) {
      return 'Cannot Join';
    } else {
      return 'Join Plan';
    }
  }

  applyFilters() {
    if (!this.isPublicView) return;

    let filteredMgrs = [...this.allPublicMgrs];

    // Apply search filter
    if (this.searchFilters.search) {
      const searchLower = this.searchFilters.search.toLowerCase();
      filteredMgrs = filteredMgrs.filter(mgr =>
        mgr.name.toLowerCase().includes(searchLower) ||
        (mgr.public_description || mgr.description || '').toLowerCase().includes(searchLower) ||
        (mgr.category || '').toLowerCase().includes(searchLower)
      );
    }

    // Apply frequency filter (daily/weekly/monthly)
    if (this.searchFilters.frequency) {
      filteredMgrs = filteredMgrs.filter(mgr => mgr.duration === this.searchFilters.frequency);
    }

    // Apply duration filter (total length like 3 months, 6 months)
    if (this.searchFilters.duration) {
      filteredMgrs = filteredMgrs.filter(mgr => {
        // Calculate total duration based on frequency and member count
        const totalSlots = mgr.total_slots || parseInt(mgr.number_of_members);
        const frequency = mgr.duration;

        // Convert to approximate months for comparison
        let durationInMonths = 0;
        if (frequency === 'daily') {
          durationInMonths = totalSlots / 30; // Approximate days to months
        } else if (frequency === 'weekly') {
          durationInMonths = totalSlots / 4; // Approximate weeks to months
        } else if (frequency === 'monthly') {
          durationInMonths = totalSlots;
        }

        // Filter based on selected duration range
        const selectedDuration = this.searchFilters.duration;
        if (selectedDuration === '1-3') return durationInMonths >= 1 && durationInMonths <= 3;
        if (selectedDuration === '4-6') return durationInMonths >= 4 && durationInMonths <= 6;
        if (selectedDuration === '7-12') return durationInMonths >= 7 && durationInMonths <= 12;
        if (selectedDuration === '12+') return durationInMonths > 12;

        return true;
      });
    }

    // Apply category filter
    if (this.searchFilters.category) {
      filteredMgrs = filteredMgrs.filter(mgr => mgr.category === this.searchFilters.category);
    }

    // Apply amount filters
    if (this.searchFilters.min_amount) {
      const minAmount = parseFloat(this.searchFilters.min_amount);
      filteredMgrs = filteredMgrs.filter(mgr => parseFloat(mgr.amount) >= minAmount);
    }

    if (this.searchFilters.max_amount) {
      const maxAmount = parseFloat(this.searchFilters.max_amount);
      filteredMgrs = filteredMgrs.filter(mgr => parseFloat(mgr.amount) <= maxAmount);
    }

    // Apply start date range filters
    if (this.searchFilters.start_date_from) {
      const startDateFrom = new Date(this.searchFilters.start_date_from);
      filteredMgrs = filteredMgrs.filter(mgr => {
        const mgrStartDate = new Date(mgr.contribution_start_date);
        return mgrStartDate >= startDateFrom;
      });
    }

    if (this.searchFilters.start_date_to) {
      const startDateTo = new Date(this.searchFilters.start_date_to);
      filteredMgrs = filteredMgrs.filter(mgr => {
        const mgrStartDate = new Date(mgr.contribution_start_date);
        return mgrStartDate <= startDateTo;
      });
    }

    this.publicMgrs = filteredMgrs;
  }

  updateFilter(filterKey: keyof typeof this.searchFilters, value: string) {
    this.searchFilters[filterKey] = value;
    this.applyFilters();
  }

  clearFilters() {
    this.searchFilters = {
      search: '',
      frequency: '',
      duration: '',
      category: '',
      min_amount: '',
      max_amount: '',
      start_date_from: '',
      start_date_to: ''
    };
    this.searchControl.setValue('');

    // Reset all select and input elements
    const selects = document.querySelectorAll('select');
    const inputs = document.querySelectorAll('input[type="number"], input[type="date"]');

    selects.forEach(select => (select as HTMLSelectElement).value = '');
    inputs.forEach(input => (input as HTMLInputElement).value = '');

    this.publicMgrs = [...this.allPublicMgrs];
  }

  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
    this.searchSub?.unsubscribe();
  }
}
