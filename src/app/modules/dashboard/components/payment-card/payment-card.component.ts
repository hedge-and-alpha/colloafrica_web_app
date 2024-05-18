import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Card } from '../../../../interfaces/bank-and-card';
import { CreditCardNumberPipe } from '../../../../pipes/credit-card-number/credit-card-number.pipe';
import { DashboardApiService } from '../../../../services/api/dashboard-api.service';
import { AlertService } from '../../../../components/alert/alert.service';
import { CardAndBankStoreService } from '../../../../stores+/card-bank.store';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(
    private api: DashboardApiService,
    private alert: AlertService,
    private cardBankStore: CardAndBankStoreService
  ) {}

  handleDelete(id: number) {
    this.loading = true;

    this.api.deleteBankCard(`${id}`).subscribe({
      next: () => {
        this.alert.open('success', {
          summary: 'Success!',
          details: 'Card deleted successfully',
        });
        this.cardBankStore.deleteBankCard(id);
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.alert.open('danger', {
          summary: error.error.status + ' ' + error.status,
          details: error.error.message,
        });
        this.loading = false;
      },
    });
  }
}
