import { Component, Input } from '@angular/core';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { ModalStatusComponent } from '../../../../../../components/modal-status/modal-status.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MgrStoreService } from '../../../../../../stores+/mgr.store';
import { AlertService } from '../../../../../../components/alert/alert.service';

@Component({
  selector: 'ca-manage-group-member-modal',
  templateUrl: './manage-group-member-modal.component.html',
  styleUrl: './manage-group-member-modal.component.css',
})
export class ManageGroupMemberModalComponent {
  loading = false;

  @Input() action: 'swap' | 'delete' = 'swap';
  @Input() planId!: string;
  @Input() userId!: string;
  @Input() name!: string;
  @Input() newPosition!: number;

  constructor(
    private api: DashboardApiService,
    private modalService: ModalService,
    private alertService: AlertService
  ) {}

  removeMember() {
    this.loading = true;
    this.api.removeMember(this.planId, this.userId).subscribe({
      next: ({ message, status }) => {
        this.loading = false;
        this.api.getMGRById(this.planId).subscribe();
        this.modalService.update(
          ModalStatusComponent,
          'small',
          {
            closable: false,
            showHeading: false,
          },
          {
            success: true,
            status,
            message,
          }
        );
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
      },
    });
  }

  sendSwapRequest() {
    this.loading = true;
    this.api.proposePositionSwap(this.planId, +this.userId).subscribe({
      next: ({ message, status }) => {
        this.loading = false;
        this.api.getMGRById(this.planId).subscribe();
        this.modalService.update(
          ModalStatusComponent,
          'small',
          {
            closable: false,
            showHeading: false,
          },
          {
            success: true,
            status,
            message,
          }
        );
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.modalService.update(
          ModalStatusComponent,
          'small',
          {
            closable: false,
            showHeading: false,
          },
          {
            success: false,
            status: `Failed: (${error.status})`,
            message: error.error.message,
          }
        );
      },
    });
  }

  close() {
    this.modalService.close({ event: 'refresh' });
  }
}
