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
  mgr_users?: MGRUser[];
}

export interface MGRUser {
  user_id: number;
  first_name: string;
  last_name: string;
  role: string;
  position: number;
  status: number;
  join_date: string;
}
