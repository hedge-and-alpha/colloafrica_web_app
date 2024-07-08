import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../../../../components/alert/alert.service';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { MGR } from '../../../../../../interfaces/mgr.interface';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { emptyFieldValidator } from '../../../../../../validators/emptyField.validator';
import { DURATIONS, THEME_COLOURS } from '../../data/mgr.data';
import {
  AllotmentType,
  MGRDuration,
  MGRDurationList,
  MGRForm,
  Theme,
} from '../../interfaces/mgr.interfaces';
import { AllotmentTypeComponent } from '../allotment-type/allotment-type.component';
import { UtilsService } from '../../../../../../services/utils/utils.service';
import { contributionDateValidator } from '../../../../../../validators/contribution-date.validator';

@Component({
  selector: 'ca-mgr-plan-form',
  templateUrl: './mgr-plan-form.component.html',
  styleUrl: './mgr-plan-form.component.css',
})
export class MgrPlanFormComponent implements OnInit, OnDestroy {
  selectedAllotmentType: null | AllotmentType = null;

  selectedPosition = 0;
  numberOfAllowableMembers = 0;
  selectedThemeIndex: null | number = null;

  isSubmitted = false;
  isEditing = false;
  loading = false;

  minJoinDate = new Date();
  minContributionDate = new Date(new Date().setDate(new Date().getDate() + 1));

  numberOfMembersSub?: Subscription;
  joinDateSub?: Subscription;
  startDateSub?: Subscription;
  durationSub?: Subscription;

  themes: Theme[] = THEME_COLOURS;
  durations: MGRDurationList[] = DURATIONS;

  terms = new FormControl<boolean>(false, [
    Validators.required,
    Validators.requiredTrue,
  ]);

  form: FormGroup<MGRForm> = this.fb.group(
    {
      name: new FormControl<null | string>(null, [
        Validators.required,
        emptyFieldValidator(),
      ]),
      desc: new FormControl<null | string>(null, [
        Validators.required,
        Validators.maxLength(120),
        emptyFieldValidator(),
      ]),
      duration: new FormControl<string | null>(null, {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      number_of_members: new FormControl<string | null>(null, {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      amount: new FormControl<string | null>(null, [
        Validators.required,
        Validators.min(1000),
      ]),
      join_date_deadline: new FormControl<string | null>(null, {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      contribution_start_date: new FormControl<string | null>(null, {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      allocation_date: new FormControl<string | null>(
        { value: null, disabled: true },
        {
          validators: [Validators.required],
        }
      ),
      theme_color: new FormControl<string | null>(null, [Validators.required]),
      allotment_type: new FormControl<string | null>(null, [
        Validators.required,
      ]),
      slot_number: new FormControl<number | null>(null),
    },
    { updateOn: 'submit' }
  );

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private api: DashboardApiService,
    private alert: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: UtilsService
  ) {
    effect(() => {
      if (this.modalService.data()) {
        const { position, type } = this.modalService.data() as {
          position: number;
          type: 'manual' | 'auto';
        };
        this.selectedPosition = position;
        this.selectedAllotmentType = type;
        this.slotNumber.patchValue(position);
        this.allotmentType.patchValue(type);
      }
    });
  }

  ngOnInit() {
    this.observeNumberOfMembersControl();
    this.observeJoinDateControl();
    this.observeDurationControl();
    this.observeStartDateControl();
  }

  get name() {
    return this.form.get('name') as FormControl;
  }
  get desc() {
    return this.form.get('desc') as FormControl;
  }
  get duration() {
    return this.form.get('duration') as FormControl;
  }
  get numberOfMembers() {
    return this.form.get('number_of_members') as FormControl;
  }
  get amount() {
    return this.form.get('amount') as FormControl;
  }
  get joinDateDeadline() {
    return this.form.get('join_date_deadline') as FormControl<string | null>;
  }
  get startDate() {
    return this.form.get('contribution_start_date') as FormControl;
  }
  get allocationDate() {
    return this.form.get('allocation_date') as FormControl;
  }
  get themeColor() {
    return this.form.get('theme_color') as FormControl;
  }
  get allotmentType() {
    return this.form.get('allotment_type') as FormControl;
  }
  get slotNumber() {
    return this.form.get('slot_number') as FormControl;
  }

  calculateAllotmentDate(duration: MGRDuration) {
    const today = new Date();
    let startDate = this.startDate as FormControl<string | null>;
    let nextAllocationDate!: string | number | Date;

    if (!startDate.value) {
      if (duration === 'daily') {
        nextAllocationDate = new Date(today.setDate(today.getDate() + 1));
      } else {
        nextAllocationDate = new Date(today.setDate(today.getDate() + 2));
      }
    } else {
      const start = new Date(startDate.value);
      if (duration === 'daily') {
        nextAllocationDate = new Date(start.setDate(start.getDate() + 1));
      } else {
        nextAllocationDate = new Date(start.setDate(start.getDate() + 2));
      }
    }

    this.allocationDate.setValue(this.utils.toISODate(nextAllocationDate));
  }

  observeDurationControl() {
    this.durationSub = this.duration.valueChanges.subscribe({
      next: (value) => {
        this.calculateAllotmentDate(value);
      },
    });
  }

  observeJoinDateControl() {
    this.joinDateSub = this.joinDateDeadline?.valueChanges.subscribe({
      next: (value) => {
        if (value) {
          if (this.startDate.value) {
            const join = new Date(value).getTime();
            const start = new Date(this.startDate.value).getTime();

            if (join >= start) {
              this.joinDateDeadline.setErrors({ deadline: true });
            }
          }

          const date = new Date(value);
          const minStartDate = new Date(date.setDate(date.getDate() + 1));
          this.minContributionDate = minStartDate;
        }
      },
    });
  }

  observeStartDateControl() {
    this.startDateSub = this.startDate?.valueChanges.subscribe({
      next: (value) => {
        if (value) {
          this.calculateAllotmentDate(this.duration.value);

          if (this.joinDateDeadline.value) {
            const join = new Date(this.joinDateDeadline.value).getTime();
            const start = new Date(value).getTime();

            if (start > join) {
              this.joinDateDeadline.setErrors(null);
            }
          }
        }
      },
    });
  }

  observeNumberOfMembersControl() {
    this.numberOfMembersSub = this.numberOfMembers?.valueChanges.subscribe({
      next: (value) => {
        this.numberOfAllowableMembers = value ? +value : 0;
      },
    });
  }

  selectTheme(theme: Theme, idx: number) {
    this.selectedThemeIndex = idx;
    let themeString = `${theme.from} ${theme.to}`;
    this.themeColor?.patchValue(themeString);
  }

  selectAllotmentType() {
    this.modalService.open(
      AllotmentTypeComponent,
      'large',
      {
        showHeading: true,
        headingText: 'Select Allotment mode',
        closable: true,
      },
      {
        numberOfMembers: this.numberOfAllowableMembers,
        selectedPosition: this.selectedPosition,
      }
    );
  }

  handleSelectAllotmentType(event: AllotmentType) {
    this.selectedAllotmentType = event;
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid || this.terms.invalid) return;

    this.loading = true;

    this.createNewPlan({ ...this.form.getRawValue() });
  }

  createNewPlan(data: object) {
    this.api.createMGR(data).subscribe({
      next: ({ data, message, status }) => {
        this.loading = false;
        this.alert.open('success', { details: message, summary: status });
        this.form.reset();
        this.router.navigate(['/', 'mgr', data.id, 'details'], {
          queryParams: { new_plan: true },
          state: { plan: data },
        });
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

  ngOnDestroy() {
    this.numberOfMembersSub?.unsubscribe();
    this.joinDateSub?.unsubscribe();
    this.startDateSub?.unsubscribe();
    this.durationSub?.unsubscribe();
  }
}
