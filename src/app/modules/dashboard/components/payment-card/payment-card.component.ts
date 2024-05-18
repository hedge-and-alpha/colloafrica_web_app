import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Card } from '../../../../interfaces/bank-and-card';
import { CreditCardNumberPipe } from '../../../../pipes/credit-card-number/credit-card-number.pipe';
import { DashboardApiService } from '../../../../services/api/dashboard-api.service';
import { AlertService } from '../../../../components/alert/alert.service';

@Component({
  selector: 'ca-payment-card',
  standalone: true,
  templateUrl: './payment-card.component.html',
  styleUrl: 'payment-card.component.css',
  imports: [NgClass, CreditCardNumberPipe],
})
export class PaymentCardComponent {
  loading = false;

  @Input() cardProvider: 'visa' | 'verve' | 'mastercards' = 'verve';
  @Input() card!: Card;

  constructor(private api: DashboardApiService, private alert: AlertService) {}

  handleDelete(id: number) {
    this.loading = !this.loading;
    console.log({ id });
  }
}
