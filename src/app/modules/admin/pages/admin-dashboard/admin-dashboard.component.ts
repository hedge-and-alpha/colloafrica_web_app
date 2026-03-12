import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { AdminAnalyticsService } from '../../../../services/api/admin-analytics.service';
import { ChartData, ChartType } from '../../components/chart-widget/chart-widget.component';

@Component({
  selector: 'ca-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  loading = false;
  dashboardStats: any = null;
  mgrAnalytics: any = null;
  userAnalytics: any = null;
  revenueAnalytics: any = null;
  realTimeMetrics: any = null;

  // Chart data
  mgrTrendsChartData: ChartData | null = null;
  userRegistrationChartData: ChartData | null = null;
  revenueChartData: ChartData | null = null;
  mgrStatusChartData: ChartData | null = null;

  // Make Math available in template
  Math = Math;

  private realTimeSubscription?: Subscription;

  constructor(private analyticsService: AdminAnalyticsService) {}

  ngOnInit() {
    this.loadAllAnalytics();
    this.startRealTimeUpdates();
  }

  ngOnDestroy() {
    this.realTimeSubscription?.unsubscribe();
  }

  loadAllAnalytics() {
    this.loading = true;
    
    // Load dashboard stats
    this.analyticsService.getDashboardStats().subscribe({
      next: (stats) => {
        this.dashboardStats = stats;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
        this.loading = false;
      }
    });

    // Load MGR analytics
    this.analyticsService.getMgrAnalytics().subscribe({
      next: (analytics) => {
        this.mgrAnalytics = analytics;
        this.generateMgrCharts(analytics);
      },
      error: (error) => {
        console.error('Error loading MGR analytics:', error);
      }
    });

    // Load user analytics
    this.analyticsService.getUserAnalytics().subscribe({
      next: (analytics) => {
        this.userAnalytics = analytics;
        this.generateUserCharts(analytics);
      },
      error: (error) => {
        console.error('Error loading user analytics:', error);
      }
    });

    // Load revenue analytics
    this.analyticsService.getRevenueAnalytics().subscribe({
      next: (analytics) => {
        this.revenueAnalytics = analytics;
        this.generateRevenueCharts(analytics);
      },
      error: (error) => {
        console.error('Error loading revenue analytics:', error);
      }
    });
  }

  private generateMgrCharts(analytics: any) {
    // MGR trends chart
    this.mgrTrendsChartData = {
      labels: analytics.monthlyTrends.map((trend: any) => trend.month),
      datasets: [
        {
          label: 'Created',
          data: analytics.monthlyTrends.map((trend: any) => trend.created),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)'
        },
        {
          label: 'Completed',
          data: analytics.monthlyTrends.map((trend: any) => trend.completed),
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)'
        }
      ]
    };

    // MGR status distribution chart
    this.mgrStatusChartData = {
      labels: analytics.statusDistribution.map((status: any) => status.status),
      datasets: [
        {
          label: 'MGR Status',
          data: analytics.statusDistribution.map((status: any) => status.count),
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b']
        }
      ]
    };
  }

  private generateUserCharts(analytics: any) {
    // User registration trends
    this.userRegistrationChartData = {
      labels: analytics.registrationTrends.map((trend: any) => trend.month),
      datasets: [
        {
          label: 'New Registrations',
          data: analytics.registrationTrends.map((trend: any) => trend.count),
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)'
        }
      ]
    };
  }

  private generateRevenueCharts(analytics: any) {
    // Revenue trends
    this.revenueChartData = {
      labels: analytics.monthlyRevenue.map((revenue: any) => revenue.month),
      datasets: [
        {
          label: 'Revenue',
          data: analytics.monthlyRevenue.map((revenue: any) => revenue.revenue),
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6, 182, 212, 0.1)'
        },
        {
          label: 'Commissions',
          data: analytics.monthlyRevenue.map((revenue: any) => revenue.commissions),
          borderColor: '#84cc16',
          backgroundColor: 'rgba(132, 204, 22, 0.1)'
        }
      ]
    };
  }

  private startRealTimeUpdates() {
    // Update real-time metrics every 30 seconds
    this.realTimeSubscription = interval(30000).subscribe(() => {
      this.loadRealTimeMetrics();
    });
    
    // Load initial real-time metrics
    this.loadRealTimeMetrics();
  }

  private loadRealTimeMetrics() {
    this.analyticsService.getRealTimeMetrics().subscribe({
      next: (metrics) => {
        this.realTimeMetrics = metrics;
      },
      error: (error) => {
        console.error('Error loading real-time metrics:', error);
      }
    });
  }

  refreshDashboard() {
    this.loadAllAnalytics();
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(value);
  }

  formatPercentage(value: number): string {
    return `${value}%`;
  }

  getMetricTrendClass(trend: number): string {
    if (trend > 0) return 'trend-positive';
    if (trend < 0) return 'trend-negative';
    return 'trend-neutral';
  }

  getMetricTrendIcon(trend: number): string {
    if (trend > 0) return '↗';
    if (trend < 0) return '↘';
    return '→';
  }
} 