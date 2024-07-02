import { Component, Input } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ca-notification-item',
  standalone: true,
  imports: [DatePipe, CardComponent],
  templateUrl: './notification-item.component.html',
  styleUrl: './notification-item.component.css',
})
export class NotificationItemComponent {
  @Input() notificationTitle!: string;
  @Input() message!: string;
  @Input() datetime!: string;
  @Input() type!: string;
}
