import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../../../../components/alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ca-change-position',
  templateUrl: './change-position.component.html',
  styleUrl: './change-position.component.css',
})
export class ChangePositionComponent implements OnInit {
  loading = false;

  availableSlots$!: Observable<number[]>;

  form = this.fb.nonNullable.group({
    slot: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.min(1),
    ]),
  });

  @Input() mgrId!: string;

  constructor(
    private modalService: ModalService,
    private api: DashboardApiService,
    private fb: FormBuilder,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.availableSlots$ = this.api.getMgrPlanAvailableSlots(this.mgrId);
  }

  handleSubmit() {
    if (this.form.invalid) return;
    this.loading = true;

    this.api.changeMgrPosition(this.mgrId, this.form.value.slot!).subscribe({
      next: ({ message, status }) => {
        this.loading = false;
        this.modalService.close({ action: 'refresh' });
        this.alert.open('success', {
          summary: status,
          details: message,
        });
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.alert.open('success', {
          summary: `Failed: ${err.status}`,
          details: `${err.error.message}`,
        });
      },
    });
  }
}
