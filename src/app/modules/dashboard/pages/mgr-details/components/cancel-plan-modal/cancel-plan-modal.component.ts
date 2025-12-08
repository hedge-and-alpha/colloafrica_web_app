import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { emptyFieldValidator } from '../../../../../../validators/emptyField.validator';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { AlertService } from '../../../../../../components/alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ca-cancel-plan-modal',
  templateUrl: './cancel-plan-modal.component.html',
  styleUrl: './cancel-plan-modal.component.css',
})
export class CancelPlanModalComponent {
  isSubmitted = false;
  loading = false;

  @Input() planId!: string;

  form = this.fb.group(
    {
      reason: ['My reason', [Validators.required, emptyFieldValidator()]],
    },
    { updateOn: 'submit' }
  );

  get reason() {
    return this.form.get('reason') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private api: DashboardApiService,
    private alert: AlertService,
    private modalService: ModalService,
    private router: Router
  ) { }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;

    this.loading = true;

    this.api.cancelMgrPlan(this.planId).subscribe(
      (value) => {
        const { message, status } = value as { message: any; status: any };
        this.loading = false;
        this.alert.open('success', { summary: status, details: message });
        this.modalService.close();
        this.router.navigate(['/', 'mgr']);
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.alert.open('danger', {
          summary: `${err.error.status}: ${err.status}`,
          details: err.error.message,
        });
      }
    );
  }
}
