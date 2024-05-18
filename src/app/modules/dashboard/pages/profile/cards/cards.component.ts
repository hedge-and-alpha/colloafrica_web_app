import { Component, OnInit, computed } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { ColsField3Component } from '../../../../../components/cols-field-3/cols-field-3.component';
import { PaymentCardComponent } from '../../../components/payment-card/payment-card.component';
import { ModalService } from '../../../../../components/modal/modal.service';
import { PaymentCardFormComponent } from '../../../components/payment-card-form/payment-card-form.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../../../../components/alert/alert.service';
import { DashboardApiService } from '../../../../../services/api/dashboard-api.service';
import { CardAndBankStoreService } from '../../../../../stores+/card-bank.store';
import { LoaderComponent } from '../../../../../components/loader/loader.component';

@Component({
  selector: 'ca-cards',
  standalone: true,
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
  imports: [
    CardComponent,
    ColsField3Component,
    LoaderComponent,
    PaymentCardComponent,
  ],
})
export class CardsComponent implements OnInit {
  loading = false;
  cards = computed(() => this.cardAndBankStore.cards());

  constructor(
    private modalService: ModalService,
    private api: DashboardApiService,
    private cardAndBankStore: CardAndBankStoreService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.getBankCards();
  }

  getBankCards() {
    if (this.cardAndBankStore.cards()) {
      return;
    }

    this.api.getBankCards().subscribe({
      next: () => {
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

  openModal() {
    this.modalService.open(PaymentCardFormComponent, 'regular', {
      closable: true,
      showHeading: true,
      headingText: 'Enter card details',
    });
  }
}
