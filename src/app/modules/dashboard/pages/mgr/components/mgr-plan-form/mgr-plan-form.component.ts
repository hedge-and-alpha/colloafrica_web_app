import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../../../../components/alert/alert.service';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { emptyFieldValidator } from '../../../../../../validators/emptyField.validator';
import { AllotmentTypeComponent } from '../allotment-type/allotment-type.component';
import { MGR } from '../../../../../../interfaces/mgr.interface';

type AllotmentType = 'manual' | 'auto';

@Component({
  selector: 'ca-mgr-plan-form',
  templateUrl: './mgr-plan-form.component.html',
  styleUrl: './mgr-plan-form.component.css',
})
export class MgrPlanFormComponent implements OnInit {
  isSubmitted = false;
  isEditing = false;
  loading = false;
  selectedThemeIndex: null | number = null;
  selectedAllotmentType: null | AllotmentType = null;

  themes: Theme[] = THEME_COLOURS;
  durations: Duration[] = DURATIONS;

  form: MGRForm = this.fb.group(
    {
      name: new FormControl<null | string>(null, [
        Validators.required,
        emptyFieldValidator(),
      ]),
      desc: new FormControl<null | string>(null, [
        Validators.required,
        emptyFieldValidator(),
      ]),
      duration: new FormControl<string | null>(null, [Validators.required]),
      number_of_members: new FormControl<string | null>(null, [
        Validators.required,
      ]),
      amount: new FormControl<string | null>(null, [Validators.required]),
      join_date_deadline: new FormControl<string | null>(null, [
        Validators.required,
      ]),
      contribution_start_date: new FormControl<string | null>(null, [
        Validators.required,
      ]),
      allocation_date: new FormControl<string | null>(null, [
        Validators.required,
      ]),
      theme_color: new FormControl<string | null>(null, [Validators.required]),
      allotment_type: new FormControl<string | null>(null, [
        Validators.required,
      ]),
      // allotment_position: new FormControl<string | null>(null, [Validators.required]),
      terms: new FormControl<boolean | null>(null, [Validators.required]),
    },
    { updateOn: 'submit' }
  );

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private api: DashboardApiService,
    private alert: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let isEdit = this.route.snapshot.paramMap.get('action');

    if (isEdit && isEdit === 'edit') {
      this.isEditing = true;
      let plan = history.state['plan'] as MGR;

      this.form.patchValue({
        name: plan.name,
        amount: plan.amount,
        desc: plan.desc,
        number_of_members: plan.number_of_members,
        allocation_date: plan.allocation_date,
        allotment_type: plan.allotment_type,
        contribution_start_date: plan.contribution_start_date,
        duration: plan.duration,
        join_date_deadline: plan.join_date_deadline,
        theme_color: plan.theme_color,
        terms: true,
      });
    }
  }

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

    this.loading = true;

    const data = { ...this.form.value };
    delete data.terms;

    if (!this.isEditing) {
      this.createNewPlan(data);
    } else {
      this.editPlan(data);
    }
  }

  createNewPlan(data: object) {
    this.api.createMGR(data).subscribe({
      next: ({ data, message, status }) => {
        this.loading = false;
        this.alert.open('success', { details: message, summary: status });
        this.form.reset();
        this.router.navigate(['/', 'mgr', data.name], {
          queryParams: { new_plan: true },
          state: { isAdmin: true, plan: data },
        });
        /**
         * !Todo: add data to mgr store
         */
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.alert.open('danger', {
          details: `${err.message}`,
          summary: `${err.status}: ${err.statusText}`,
        });
      },
    });
  }

  editPlan(data: object) {
    console.log(data);
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
type MGRForm = FormGroup<{
  name: FormControl<null | string>;
  desc: FormControl<null | string>;
  duration: FormControl<null | string>;
  number_of_members: FormControl<null | string>;
  join_date_deadline: FormControl<null | string>;
  contribution_start_date: FormControl<null | string>;
  allocation_date: FormControl<null | string>;
  allotment_type: FormControl<null | string>;
  theme_color: FormControl<null | string>;
  amount: FormControl<null | string>;
  terms: FormControl<null | boolean>;
}>;
