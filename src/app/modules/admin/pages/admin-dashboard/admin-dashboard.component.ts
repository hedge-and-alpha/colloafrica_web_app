import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../../../services/api/admin-api.service';

@Component({
  selector: 'ca-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  loading = false;
  analytics: any = null;

  constructor(private adminApi: AdminApiService) {}

  ngOnInit() {
    this.loadDashboardAnalytics();
  }

  loadDashboardAnalytics() {
    this.loading = true;
    this.adminApi.getDashboardAnalytics().subscribe({
      next: (response) => {
        this.analytics = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard analytics:', error);
        this.loading = false;
        // For development, use mock data
        this.analytics = this.getMockAnalytics();
      }
    });
  }

  private getMockAnalytics() {
    return {
      totalUsers: 1250,
      totalMgrs: 89,
      activeMgrs: 45,
      pendingMgrs: 12,
      totalContributions: '₦2,450,000',
      monthlyGrowth: 15.3,
      recentActivity: [
        { type: 'mgr_created', message: 'New MGR "Savings Circle" created', time: '2 hours ago' },
        { type: 'user_joined', message: 'John Doe joined platform', time: '4 hours ago' },
        { type: 'mgr_completed', message: 'MGR "Investment Group" completed', time: '6 hours ago' }
      ]
    };
  }
} 