import { Component, OnInit } from '@angular/core';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../../../../../components/alert/alert.service';

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

  minDate = new Date();
  allotmentPositions: number[] = [];

  form = this.fb.group(
    {
      name: [''],
      desc: [''],
      duration: [''],
      number_of_members: [''],
      amount: [''],
      join_date_deadline: [''],
      contribution_start_date: ['', { disabled: true }],
      allocation_date: ['', { disabled: true }],
      theme_color: [''],
      allotment_type: [''],
      allotment_position: [],
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
    this.loading = true;

    this.api.getMgrByInviteLink(link).subscribe({
      next: ({ data: { mgr, available_positions } }) => {
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
          // allotment_position: new FormControl<string | null>(null, [Validators.required]),
        });

        if (mgr.allotment_type === 'manual') {
          this.isManual = true;
          this.allotmentPositions = available_positions!;
          this.allotmentPosition?.addValidators([Validators.required]);
        }
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;
    this.loading = true;

    let position = this.allotmentPosition.value;

    this.api.joinMgrByInviteLink(this.inviteId, position).subscribe({
      next: ({ data, message, status }) => {
        this.loading = false;
        this.alert.open('success', { details: message, summary: status });
        this.form.reset();
        this.router.navigate(['/', 'mgr']);
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
}
