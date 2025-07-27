export interface MGR {
  name: string;
  desc: string;
  duration: string;
  currency?: any;
  number_of_members: string;
  logged_user_position: number;
  current_cycle_number: number;
  amount: string;
  join_date_deadline: string;
  contribution_start_date: string;
  allocation_date: string;
  theme_color: string;
  allotment_type: string;
  invite_link: string;
  creator_id: number;
  status: string;
  id: string;
  is_public?: boolean;
  next_allocation_to: null | { name: string; slot_number: string };
  mgr_users?: MGRUser[];
  user_allocations: MGRUserAllocation[];
  cycle_dates: { cycle_number: number; cycle_date: string }[];
  total_allocation: number;
  total_contribution: string;
  
  // New properties for public MGRs
  public_description?: string;
  description?: string;
  category?: string;
  available_slots?: number;
  total_slots?: number;
  current_members?: number;
  join_deadline?: string;
  display_status?: string;
  can_join?: boolean;
  deadline_passed?: boolean;
  creator?: {
    name: string;
    id: number;
  };
}

export interface MGRUserAllocation {
  amount: string;
  payment_date: string;
  allotment_period: string;
  status: 'success';
}

export interface MGRUserBase {
  first_name: string;
  last_name: string;
}

export interface MGRUser extends MGRUserBase {
  user_id: number;
  role: string;
  position: number;
  status: number;
  join_date: string;
  profile_pic: null | string;
  rollover?: boolean;
}

export interface MGRAnalytics {
  total_contributions: string;
  total_allotments: number;
  total_members: number;
  users: MGRAnalyticsUser[];
}

export interface MGRAnalyticsUser extends MGRUserBase {
  id: number;
  profile_pic: null | string;
}

export interface MGRContributionStats {
  user_id: number;
  amount: string;
  date: string;
  allotted: boolean;
}
