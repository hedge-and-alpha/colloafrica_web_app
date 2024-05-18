import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Card } from '../../../../interfaces/bank-and-card';

@Component({
  selector: 'ca-payment-card',
  standalone: true,
  templateUrl: './payment-card.component.html',
  styleUrl: 'payment-card.component.css',
  imports: [NgClass],
})
export class PaymentCardComponent {
  @Input() cardProvider: 'visa' | 'verve' | 'mastercards' = 'verve';
  @Input() card!: Card;
}
