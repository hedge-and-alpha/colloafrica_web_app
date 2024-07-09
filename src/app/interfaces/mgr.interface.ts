export interface MGR {
  name: string;
  desc: string;
  duration: string;
  number_of_members: string;
  logged_user_position: number;
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
  next_allocation_to: null | { name: string; slot_number: string };
  mgr_users?: MGRUser[];
  user_allocations: MGRUserAllocation[];
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

interface MGRStatsBase extends MGRUserBase {
  amount: string;
  user_id: number;
}

export interface MGRContributionStats extends MGRStatsBase {
  email: string;
  role: 'admin' | 'member';
  position: number;
}

export interface MGRCollectionStats
  extends Omit<MGRStatsBase, 'first_name' | 'last_name'> {
  id: string;
  mgr_cycle_id: string;
  mgr_id: string;
  created_at: string;
}
