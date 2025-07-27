import { Component, OnInit } from '@angular/core';
import { AdminAnalyticsService } from '../../../../services/api/admin-analytics.service';
import { ChartData } from '../../components/chart-widget/chart-widget.component';

@Component({
  selector: 'ca-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit {
  loading = false;
  selectedTimeframe = '30days';
  
  // Analytics data
  userAnalytics: any = null;
  mgrAnalytics: any = null;
  revenueAnalytics: any = null;
  
  // Chart data
  userDemographicsChartData: ChartData | null = null;
  mgrCategoryChartData: ChartData | null = null;
  revenueProjectionChartData: ChartData | null = null;
  activityMetricsChartData: ChartData | null = null;
  mgrTrendsChartData: ChartData | null = null;

  // Make Math available in template
  Math = Math;

  timeframeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 3 Months' },
    { value: '1year', label: 'Last Year' }
  ];

  constructor(private analyticsService: AdminAnalyticsService) {}

  ngOnInit() {
    this.loadAnalytics();
  }

  loadAnalytics() {
    this.loading = true;
    
    // Load user analytics
    this.analyticsService.getUserAnalytics().subscribe({
      next: (analytics) => {
        this.userAnalytics = analytics;
        this.generateUserCharts(analytics);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user analytics:', error);
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

  private generateUserCharts(analytics: any) {
    // Demographics chart (age groups)
    const ageGroupsData = analytics.demographicBreakdown.find(
      (breakdown: any) => breakdown.category === 'Age Groups'
    );
    
    if (ageGroupsData) {
      this.userDemographicsChartData = {
        labels: ageGroupsData.data.map((item: any) => item.label),
        datasets: [
          {
            label: 'Age Distribution',
            data: ageGroupsData.data.map((item: any) => item.value),
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
          }
        ]
      };
    }

    // Activity metrics chart
    this.activityMetricsChartData = {
      labels: analytics.activityMetrics.map((metric: any) => metric.metric),
      datasets: [
        {
          label: 'Activity Metrics',
          data: analytics.activityMetrics.map((metric: any) => metric.value),
          backgroundColor: ['#8b5cf6', '#06b6d4', '#84cc16']
        }
      ]
    };
  }

  private generateMgrCharts(analytics: any) {
    // MGR category distribution
    this.mgrCategoryChartData = {
      labels: analytics.categoryDistribution.map((category: any) => category.category),
      datasets: [
        {
          label: 'MGR Categories',
          data: analytics.categoryDistribution.map((category: any) => category.count),
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b']
        }
      ]
    };

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
  }

  private generateRevenueCharts(analytics: any) {
    // Revenue projections chart
    const allMonths = [
      ...analytics.monthlyRevenue.map((rev: any) => rev.month),
      ...analytics.projections.map((proj: any) => proj.month)
    ];
    
    const actualRevenue = analytics.monthlyRevenue.map((rev: any) => rev.revenue);
    const projectedRevenue = [
      ...Array(analytics.monthlyRevenue.length).fill(null),
      ...analytics.projections.map((proj: any) => proj.projected)
    ];

    this.revenueProjectionChartData = {
      labels: allMonths,
      datasets: [
        {
          label: 'Actual Revenue',
          data: [...actualRevenue, ...Array(analytics.projections.length).fill(null)],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)'
        },
        {
          label: 'Projected Revenue',
          data: projectedRevenue,
          borderColor: '#94a3b8',
          backgroundColor: 'rgba(148, 163, 184, 0.1)'
        }
      ]
    };
  }

  onTimeframeChange(event: any) {
    const target = event.target as HTMLSelectElement;
    this.selectedTimeframe = target.value;
    this.loadAnalytics();
  }

  exportData() {
    // Implement data export functionality
    console.log('Exporting analytics data...');
  }

  generateReport() {
    // Implement report generation
    console.log('Generating analytics report...');
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(value);
  }

  formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`;
  }

  getChangeClass(change: number): string {
    if (change > 0) return 'positive-change';
    if (change < 0) return 'negative-change';
    return 'neutral-change';
  }

  getChangeIcon(change: number): string {
    if (change > 0) return '↗';
    if (change < 0) return '↘';
    return '→';
  }
} 