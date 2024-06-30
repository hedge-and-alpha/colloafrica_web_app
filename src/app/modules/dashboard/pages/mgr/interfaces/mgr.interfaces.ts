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
}
