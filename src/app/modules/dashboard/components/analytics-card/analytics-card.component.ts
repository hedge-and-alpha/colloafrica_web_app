import { Component, Input } from '@angular/core';

@Component({
  selector: 'ca-analytics-card',
  templateUrl: './analytics-card.component.html',
  styleUrl: './analytics-card.component.css',
})
export class AnalyticsCardComponent {
  @Input() title = '';
  @Input() amount = 0;
}
