import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, computed } from '@angular/core';
import { AlertService } from '../../../../../components/alert/alert.service';
import { ModalService } from '../../../../../components/modal/modal.service';
import { DashboardApiService } from '../../../../../services/api/dashboard-api.service';
import { CardAndBankStoreService } from '../../../../../stores+/card-bank.store';
import { BankAccountFormComponent } from '../../../components/bank-account-form/bank-account-form.component';

@Component({
  selector: 'ca-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrl: './bank-accounts.component.css',
})
export class BankAccountsComponent implements OnInit {
  loading = false;
  bankAccounts = computed(() => this.cardAndBankStore.bankAccounts());

  constructor(
    private modalService: ModalService,
    private api: DashboardApiService,
    private cardAndBankStore: CardAndBankStoreService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.getBankAccounts();
  }

  getBankAccounts() {
    if (this.cardAndBankStore.bankAccounts()) {
      return;
    }

    this.loading = true;
    this.api.getBankAccounts().subscribe({
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
    this.modalService.open(BankAccountFormComponent, 'regular', {
      closable: true,
      showHeading: true,
      headingText: 'Enter bank details',
    });
  }
}
