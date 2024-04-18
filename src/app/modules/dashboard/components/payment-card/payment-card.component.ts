import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ca-payment-card',
  standalone: true,
  templateUrl: './payment-card.component.html',
  styleUrl: 'payment-card.component.css',
  imports: [NgClass],
})
export class PaymentCardComponent {
  @Input() cardProvider: 'visa' | 'verve' | 'master' = 'verve';
}
