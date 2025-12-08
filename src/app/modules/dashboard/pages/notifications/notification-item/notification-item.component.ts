import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { DatePipe } from '@angular/common';
import { DashboardApiService } from '../../../../../services/api/dashboard-api.service';
import { INotificationData } from '../../../../../interfaces/notification';
import { ModalService } from '../../../../../components/modal/modal.service';
import { ButtonLoadingDirective } from '../../../../../directives/button-loading/button-loading.directive';
import { AlertService } from '../../../../../components/alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

interface NotificationType {
  debit: boolean;
  credit: boolean;
  swap: boolean;
  swap_request: boolean;
}

@Component({
  selector: 'ca-notification-item',
  standalone: true,
  imports: [DatePipe, CardComponent, ButtonLoadingDirective],
  templateUrl: './notification-item.component.html',
  styleUrl: './notification-item.component.css',
})
export class NotificationItemComponent implements OnInit {
  isAccepting = false;
  isRejecting = false;
  notificationTypes!: NotificationType;

  @Input() notification!: INotificationData;

  @Output() notificationChange = new EventEmitter();

  constructor(
    private api: DashboardApiService,
    private modalService: ModalService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.notificationTypes = {
      debit: this.notification.data.notification_type!.toLowerCase().includes('debit'),
      credit: this.notification.data.notification_type!.toLowerCase().includes('credit'),
      swap_request: this.notification.data.notification_type === 'swap request',
      swap: !!this.notification.data.notification_type!.toLowerCase().includes('swap'),
    };
  }

  manageSwapRequest(action: 'accept' | 'reject') {
    if (action === 'accept') {
      this.isAccepting = true;
    } else {
      this.isRejecting = true;
    }

    if (this.notification.data.swap_request_id) {
      this.api
        .manageSwapRequests(action, this.notification.data.swap_request_id, this.notification.id)
        .subscribe({
          next: ({ message, status }) => {
            this.isAccepting = false;
            this.isRejecting = false;
            this.alertService.open('success', {
              summary: status,
              details: message,
            });
            this.notificationChange.emit();
          },
          error: (err: HttpErrorResponse) => {
            this.isAccepting = false;
            this.isRejecting = false;
            this.notificationChange.emit();
            this.alertService.open('danger', {
              details: `${err.error.message}`,
            });
          },
        });
    }
  }

  acceptRequest() { }
  rejectRequest() { }
}
