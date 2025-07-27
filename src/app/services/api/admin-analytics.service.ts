import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../interfaces/api-response';

interface DashboardStats {
  totalUsers: number;
  totalMgrs: number;
  activeMgrs: number;
  pendingMgrs: number;
  completedMgrs: number;
  totalContributions: number;
  monthlyGrowth: number;
  userGrowthRate: number;
  avgMgrSize: number;
  successRate: number;
}

interface MgrAnalytics {
  statusDistribution: { status: string; count: number; percentage: number }[];
  categoryDistribution: { category: string; count: number; percentage: number }[];
  monthlyTrends: { month: string; created: number; completed: number }[];
  performanceMetrics: { metric: string; value: number; trend: number }[];
}

interface UserAnalytics {
  registrationTrends: { month: string; count: number }[];
  activityMetrics: { metric: string; value: number; change: number }[];
  demographicBreakdown: { category: string; data: { label: string; value: number }[] }[];
  topPerformers: { name: string; mgrsCreated: number; totalContributions: number }[];
}

interface RevenueAnalytics {
  monthlyRevenue: { month: string; revenue: number; commissions: number }[];
  revenueByCategory: { category: string; revenue: number; percentage: number }[];
  projections: { month: string; projected: number; actual?: number }[];
  kpis: { metric: string; current: number; target: number; trend: number }[];
}

@Injectable({
  providedIn: 'root',
})
export class AdminAnalyticsService {
  private readonly baseUrl = environment.API_BASE_URL;
  
  get authToken(): string | null {
    return localStorage.getItem('AUTH_TOKEN');
  }

  constructor(private readonly http: HttpClient) {}

  /**
   * Get dashboard statistics
   */
  getDashboardStats(): Observable<DashboardStats> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.get<ApiResponse & { data: DashboardStats }>(
      `${this.baseUrl}/admin/analytics/dashboard-stats`,
      { headers }
    ).pipe(
      map((response) => response.data),
      catchError(() => of(this.getMockDashboardStats()))
    );
  }

  /**
   * Get MGR analytics
   */
  getMgrAnalytics(): Observable<MgrAnalytics> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.get<ApiResponse & { data: MgrAnalytics }>(
      `${this.baseUrl}/admin/analytics/mgr-analytics`,
      { headers }
    ).pipe(
      map((response) => response.data),
      catchError(() => of(this.getMockMgrAnalytics()))
    );
  }

  /**
   * Get user analytics
   */
  getUserAnalytics(): Observable<UserAnalytics> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.get<ApiResponse & { data: UserAnalytics }>(
      `${this.baseUrl}/admin/analytics/user-analytics`,
      { headers }
    ).pipe(
      map((response) => response.data),
      catchError(() => of(this.getMockUserAnalytics()))
    );
  }

  /**
   * Get revenue analytics
   */
  getRevenueAnalytics(): Observable<RevenueAnalytics> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.get<ApiResponse & { data: RevenueAnalytics }>(
      `${this.baseUrl}/admin/analytics/revenue-analytics`,
      { headers }
    ).pipe(
      map((response) => response.data),
      catchError(() => of(this.getMockRevenueAnalytics()))
    );
  }

  /**
   * Get real-time metrics
   */
  getRealTimeMetrics(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.get<ApiResponse & { data: any }>(
      `${this.baseUrl}/admin/analytics/real-time`,
      { headers }
    ).pipe(
      map((response) => response.data),
      catchError(() => of(this.getMockRealTimeMetrics()))
    );
  }

  // Mock data methods for development
  private getMockDashboardStats(): DashboardStats {
    return {
      totalUsers: 1250,
      totalMgrs: 89,
      activeMgrs: 45,
      pendingMgrs: 12,
      completedMgrs: 32,
      totalContributions: 2450000,
      monthlyGrowth: 15.3,
      userGrowthRate: 8.7,
      avgMgrSize: 8.2,
      successRate: 94.2
    };
  }

  private getMockMgrAnalytics(): MgrAnalytics {
    return {
      statusDistribution: [
        { status: 'Active', count: 45, percentage: 50.6 },
        { status: 'Completed', count: 32, percentage: 36.0 },
        { status: 'Pending', count: 12, percentage: 13.4 }
      ],
      categoryDistribution: [
        { category: 'Savings', count: 35, percentage: 39.3 },
        { category: 'Investment', count: 28, percentage: 31.5 },
        { category: 'Emergency', count: 26, percentage: 29.2 }
      ],
      monthlyTrends: [
        { month: 'Jan', created: 12, completed: 8 },
        { month: 'Feb', created: 15, completed: 10 },
        { month: 'Mar', created: 18, completed: 12 },
        { month: 'Apr', created: 22, completed: 15 },
        { month: 'May', created: 25, completed: 18 }
      ],
      performanceMetrics: [
        { metric: 'Average Duration', value: 6.5, trend: 2.3 },
        { metric: 'Success Rate', value: 94.2, trend: 1.8 },
        { metric: 'Member Retention', value: 87.5, trend: -0.5 }
      ]
    };
  }

  private getMockUserAnalytics(): UserAnalytics {
    return {
      registrationTrends: [
        { month: 'Jan', count: 120 },
        { month: 'Feb', count: 145 },
        { month: 'Mar', count: 180 },
        { month: 'Apr', count: 220 },
        { month: 'May', count: 285 }
      ],
      activityMetrics: [
        { metric: 'Daily Active Users', value: 685, change: 12.5 },
        { metric: 'Monthly Active Users', value: 1120, change: 8.3 },
        { metric: 'Session Duration', value: 24.5, change: 5.2 }
      ],
      demographicBreakdown: [
        {
          category: 'Age Groups',
          data: [
            { label: '18-25', value: 25 },
            { label: '26-35', value: 45 },
            { label: '36-50', value: 30 }
          ]
        },
        {
          category: 'Gender',
          data: [
            { label: 'Female', value: 58 },
            { label: 'Male', value: 42 }
          ]
        }
      ],
      topPerformers: [
        { name: 'John Doe', mgrsCreated: 5, totalContributions: 125000 },
        { name: 'Jane Smith', mgrsCreated: 4, totalContributions: 98000 },
        { name: 'Mike Johnson', mgrsCreated: 3, totalContributions: 75000 }
      ]
    };
  }

  private getMockRevenueAnalytics(): RevenueAnalytics {
    return {
      monthlyRevenue: [
        { month: 'Jan', revenue: 45000, commissions: 2250 },
        { month: 'Feb', revenue: 52000, commissions: 2600 },
        { month: 'Mar', revenue: 68000, commissions: 3400 },
        { month: 'Apr', revenue: 75000, commissions: 3750 },
        { month: 'May', revenue: 89000, commissions: 4450 }
      ],
      revenueByCategory: [
        { category: 'Savings MGRs', revenue: 125000, percentage: 45.2 },
        { category: 'Investment MGRs', revenue: 95000, percentage: 34.3 },
        { category: 'Emergency MGRs', revenue: 57000, percentage: 20.5 }
      ],
      projections: [
        { month: 'Jun', projected: 95000, actual: undefined },
        { month: 'Jul', projected: 102000, actual: undefined },
        { month: 'Aug', projected: 110000, actual: undefined }
      ],
      kpis: [
        { metric: 'Revenue Growth', current: 18.5, target: 20.0, trend: 2.3 },
        { metric: 'Commission Rate', current: 5.2, target: 5.0, trend: -0.2 },
        { metric: 'Customer LTV', current: 2450, target: 2500, trend: 1.8 }
      ]
    };
  }

  private getMockRealTimeMetrics(): any {
    return {
      activeUsers: 156,
      ongoingContributions: 23,
      pendingApprovals: 5,
      systemHealth: 98.5,
      lastUpdated: new Date().toISOString()
    };
  }
} 