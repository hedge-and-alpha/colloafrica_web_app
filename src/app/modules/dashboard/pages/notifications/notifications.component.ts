import { Component, OnInit } from '@angular/core';
import { DashboardApiService } from '../../../../services/api/dashboard-api.service';
import { Observable } from 'rxjs';
import { INotificationData } from '../../../../interfaces/notification';

@Component({
  selector: 'ca-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {
  notifications$!: Observable<INotificationData[]>;

  constructor(private api: DashboardApiService) {
    this.notifications$ = this.api.getUnreadNotifications();
  }

  ngOnInit(): void {
    this.getUnreadNotifications();
  }

  getUnreadNotifications() {}
}
