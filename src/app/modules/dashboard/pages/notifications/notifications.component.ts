import { Component } from '@angular/core';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { H1Component } from '../../components/h1/h1.component';

@Component({
  selector: 'ca-notifications',
  standalone: true,
  imports: [H1Component, NotificationItemComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {}
