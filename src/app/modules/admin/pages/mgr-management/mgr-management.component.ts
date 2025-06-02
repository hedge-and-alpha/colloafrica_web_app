import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../../../services/api/admin-api.service';

@Component({
  selector: 'ca-mgr-management',
  templateUrl: './mgr-management.component.html',
  styleUrl: './mgr-management.component.css'
})
export class MgrManagementComponent implements OnInit {
  loading = false;
  mgrs: any[] = [];
  selectedStatus = 'all';

  constructor(private adminApi: AdminApiService) {}

  ngOnInit() {
    this.loadMgrs();
  }

  loadMgrs() {
    this.loading = true;
    this.adminApi.getMgrManagementData(this.selectedStatus === 'all' ? undefined : this.selectedStatus).subscribe({
      next: (response) => {
        this.mgrs = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading MGRs:', error);
        this.loading = false;
        // Mock data for development
        this.mgrs = [
          { id: '1', name: 'Savings Circle', status: 'pending', creator: 'John Doe', created_at: '2024-01-15' },
          { id: '2', name: 'Investment Group', status: 'active', creator: 'Jane Smith', created_at: '2024-01-10' }
        ];
      }
    });
  }

  onStatusChange(status: string) {
    this.selectedStatus = status;
    this.loadMgrs();
  }

  approveMgr(mgrId: string) {
    this.adminApi.updateMgrStatus(mgrId, 'approve').subscribe({
      next: () => {
        this.loadMgrs();
      },
      error: (error) => {
        console.error('Error approving MGR:', error);
      }
    });
  }

  rejectMgr(mgrId: string) {
    this.adminApi.updateMgrStatus(mgrId, 'reject').subscribe({
      next: () => {
        this.loadMgrs();
      },
      error: (error) => {
        console.error('Error rejecting MGR:', error);
      }
    });
  }
} 