import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../../../components/modal/modal.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { emptyFieldValidator } from '../../../../../../validators/emptyField.validator';
import { AllotmentTypeComponent } from '../allotment-type/allotment-type.component';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { MgrWelcomeComponent } from '../../../mgr-details/components/mgr-welcome/mgr-welcome.component';
import { AlertService } from '../../../../../../components/alert/alert.service';

type AllotmentType = 'manual' | 'auto';

@Component({
  selector: 'ca-mgr-plan-form',
  templateUrl: './mgr-plan-form.component.html',
  styleUrl: './mgr-plan-form.component.css',
})
export class MgrPlanFormComponent implements OnInit {
  isSubmitted = false;
  selectedThemeIndex: null | number = null;
  selectedAllotmentType: null | AllotmentType = null;

  themes: Theme[] = THEME_COLOURS;
  durations: Duration[] = DURATIONS;

  form = this.fb.group(
    {
      name: [null, [Validators.required, emptyFieldValidator()]],
      desc: [null, [Validators.required, emptyFieldValidator()]],
      duration: [null, [Validators.required]],
      number_of_members: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      join_date_deadline: [null, [Validators.required]],
      contribution_start_date: [null, [Validators.required]],
      allocation_date: [null, [Validators.required]],
      theme_color: [null, [Validators.required]],
      allotment_type: [null, [Validators.required]],
      // allotment_position: [null, [Validators.required]],
      terms: [null, [Validators.required]],
    },
    { updateOn: 'submit' }
  );

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private api: DashboardApiService,
    private alert: AlertService
  ) {}

  ngOnInit() {}

  get name() {
    return this.form.get('name');
  }
  get desc() {
    return this.form.get('desc');
  }
  get duration() {
    return this.form.get('duration');
  }
  get numberOfMembers() {
    return this.form.get('number_of_members');
  }
  get amount() {
    return this.form.get('amount');
  }
  get joinDateDeadline() {
    return this.form.get('join_date_deadline');
  }
  get startDate() {
    return this.form.get('contribution_start_date');
  }
  get allocationDate() {
    return this.form.get('allocation_date');
  }
  get themeColor() {
    return this.form.get('theme_color') as FormControl;
  }
  get allotmentType() {
    return this.form.get('allotment_type') as FormControl;
  }
  // get allotmentPosition() {
  //   return this.form.get('allotment_position');
  // }
  get terms() {
    return this.form.get('terms');
  }

  selectTheme(theme: Theme, idx: number) {
    this.selectedThemeIndex = idx;
    let themeString = `${theme.from} ${theme.to}`;
    this.themeColor?.patchValue(themeString);
  }

  selectAllotmentType() {
    this.modalService.open(AllotmentTypeComponent, 'large', {
      showHeading: true,
      headingText: 'Select Allotment mode',
      closable: true,
    });
  }

  handleSelectAllotmentType(event: AllotmentType) {
    this.selectedAllotmentType = event;
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;

    const data = { ...this.form.value };
    delete data.terms;
    console.log(this.form.value);

    this.api.createMGR(data).subscribe({});
  }
}

const DURATIONS: Duration[] = [
  { id: 'daily', name: 'Daily' },
  { id: 'weekly', name: 'Weekly' },
  { id: 'monthly', name: 'Monthly' },
];

const THEME_COLOURS: Theme[] = [
  {
    from: '#17B890',
    to: '#009D76',
  },
  {
    from: '#006dca',
    to: '#1e96fc',
  },
  {
    from: '#ffba08',
    to: '#ffd056',
  },
  {
    from: '#00241b',
    to: '#000000',
  },
  {
    from: '#bca52c',
    to: '#f6e691',
  },
  {
    from: '#470b96',
    to: '#6b1bd3',
  },
];

type Theme = { from: string; to: string };
type Duration = { id: string; name: string };
