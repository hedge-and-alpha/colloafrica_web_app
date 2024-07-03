interface IDashboardChartData {
  year: number;
  month: string;
  total_amount: string;
}

export interface IDashboardAnalytics {
  total_contributions: string;
  amount_allotted: string;
  investments: number;
  wallet_balance: string;
}

export interface IDashboardData extends IDashboardAnalytics {
  contributions_last_12_months: IDashboardChartData[];
  allocations_last_12_months: IDashboardChartData[];
}
