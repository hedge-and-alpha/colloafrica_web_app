import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../../../../components/alert/alert.service';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';

@Component({
  selector: 'ca-join-mgr-plan-form',
  templateUrl: './join-mgr-plan-form.component.html',
  styleUrl: './join-mgr-plan-form.component.css',
})
export class JoinMgrPlanFormComponent implements OnInit {
  inviteId = '';
  isManual = false;
  loading = false;
  isSubmitted = false;
  isDisabled = true;
  showError = true;

  minDate = new Date();
  joinDate = new Date();
  contributionDate = new Date();
  allocationDate = new Date();
  allotmentPositions: number[] = [];
  durations: Duration[] = DURATIONS;

  form = this.fb.group(
    {
      name: ['', { disabled: true }],
      desc: ['', { disabled: true }],
      duration: ['', { disabled: true }],
      number_of_members: ['', { disabled: true }],
      amount: ['', { disabled: true }],
      join_date_deadline: ['', { disabled: true }],
      contribution_start_date: ['', { disabled: true }],
      allocation_date: ['', { disabled: true }],
      theme_color: [''],
      allotment_type: [''],
      allotment_position: [''],
      terms: [null, [Validators.requiredTrue]],
    },
    { updateOn: 'submit' }
  );

  constructor(
    private api: DashboardApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let inviteIdQueryParam = this.route.snapshot.queryParamMap.get('invite_id');

    if (inviteIdQueryParam) {
      this.inviteId = inviteIdQueryParam;
      this.getMgrDetails(this.inviteId);
    }
  }

  get allotmentPosition() {
    return this.form.get('allotment_position') as FormControl;
  }

  get terms() {
    return this.form.get('terms');
  }

  getMgrDetails(link: string) {
    this.api.getMgrByInviteLink(link).subscribe({
      next: ({ data: { mgr, available_positions } }) => {
        this.joinDate = new Date(mgr.join_date_deadline);
        this.contributionDate = new Date(mgr.contribution_start_date);
        this.allocationDate = new Date(mgr.allocation_date);

        if (mgr.allotment_type === 'manual') {
          this.isManual = true;
          this.allotmentPositions = available_positions!;
        }

        this.form.patchValue({
          name: mgr.name,
          desc: mgr.desc,
          duration: mgr.duration,
          number_of_members: mgr.number_of_members,
          amount: mgr.amount,
          join_date_deadline: mgr.join_date_deadline,
          contribution_start_date: mgr.contribution_start_date,
          allocation_date: mgr.allocation_date,
          theme_color: mgr.theme_color,
          allotment_type: mgr.theme_color,
        });
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.isManual && !this.allotmentPosition.value) {
      this.showError = true;
      return;
    }
    this.showError = false;
    this.loading = true;

    let position = this.allotmentPosition.value;

    this.api.joinMgrByInviteLink(this.inviteId, position).subscribe({
      next: ({ data, message, status }) => {
        this.loading = false;
        this.alert.open('success', { details: message, summary: status });
        this.form.reset();
        this.router.navigate(['/', 'mgr', data.mgr.name], {
          queryParams: { new_plan: true },
          state: { isAdmin: false, plan: data.mgr },
        });
        /**
         * !Todo: add data to mgr store
         */
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.alert.open('danger', {
          details: `${err.error.message}`,
          summary: `${err.status}: ${err.statusText}`,
        });
      },
    });
  }
}

const DURATIONS: Duration[] = [
  { id: 'daily', name: 'Daily' },
  { id: 'weekly', name: 'Weekly' },
  { id: 'monthly', name: 'Monthly' },
];

type Duration = { id: string; name: string };
