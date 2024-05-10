import { Component, Input } from '@angular/core';

@Component({
  selector: 'ca-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrl: './notification-item.component.css',
})
export class NotificationItemComponent {
  @Input() notificationTitle = '';
  @Input() message = '';
  @Input() datetime = new Date().toISOString();
  @Input() type = '';
}
