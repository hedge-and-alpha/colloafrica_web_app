import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

export const contributionDateValidator: ValidatorFn = (
  control: AbstractControl
) => {
  const deadline = (
    control.get('join_date_deadline') as FormControl<string | null>
  ).value;

  const startDate = (
    control.get('contribution_start_date') as FormControl<string | null>
  ).value;

  if (startDate && startDate.length && !deadline) return { contributionStartDate: true };
  return null;
};
