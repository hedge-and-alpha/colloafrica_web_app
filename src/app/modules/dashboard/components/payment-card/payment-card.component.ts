import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Card } from '../../../../interfaces/bank-and-card';
import { CreditCardNumberPipe } from '../../../../pipes/credit-card-number/credit-card-number.pipe';

@Component({
  selector: 'ca-payment-card',
  standalone: true,
  templateUrl: './payment-card.component.html',
  styleUrl: 'payment-card.component.css',
  imports: [NgClass, CreditCardNumberPipe],
})
export class PaymentCardComponent {
  @Input() cardProvider: 'visa' | 'verve' | 'mastercards' = 'verve';
  @Input() card!: Card;
}
