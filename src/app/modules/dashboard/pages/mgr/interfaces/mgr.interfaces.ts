import { FormControl } from '@angular/forms';

export type MGRDuration = 'daily' | 'weekly' | 'monthly';

export type AllotmentType = 'manual' | 'auto';

export interface Theme {
  from: string;
  to: string;
}

export interface MGRDurationList {
  id: string;
  name: string;
}

export interface MGRForm {
  name: FormControl<null | string>;
  desc: FormControl<null | string>;
  duration: FormControl<null | string>;
  number_of_members: FormControl<null | string>;
  join_date_deadline: FormControl<null | string>;
  contribution_start_date: FormControl<null | string>;
  allocation_date: FormControl<null | string>;
  allotment_type: FormControl<null | string>;
  slot_number: FormControl<null | number>;
  theme_color: FormControl<null | string>;
  amount: FormControl<null | string>;
  // Optional field for public/private MGR plans
  is_public?: FormControl<number>;
}

export interface EditMGRForm {
  name: FormControl<string>;
  desc: FormControl<string>;
  duration: FormControl<string>;
  number_of_members: FormControl<string>;
  join_date_deadline: FormControl<string>;
  theme_color: FormControl<string>;
  amount: FormControl<string>;
}
