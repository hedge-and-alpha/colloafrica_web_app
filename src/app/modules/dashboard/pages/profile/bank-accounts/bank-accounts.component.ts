import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
} from '@angular/core';
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
  toDeleteIds: number[] = [];

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

  greyOutAccountItem(id: number) {
    return this.toDeleteIds.includes(id);
  }

  unGreyOutDeletedItem(id: number) {
    this.toDeleteIds = this.toDeleteIds.filter((item) => item !== id);
  }

  handleDelete(id: number) {
    this.toDeleteIds.push(id);

    this.api.deleteBankAccount(id).subscribe({
      next: () => {
        this.alert.open('success', {
          summary: 'Success!',
          details: 'Bank account deleted successfully',
        });
        this.cardAndBankStore.deleteBankAccount(id);
        this.unGreyOutDeletedItem(id);
      },
      error: (error: HttpErrorResponse) => {
        this.alert.open('danger', {
          summary: error.error.status + ' ' + error.status,
          details: error.error.message,
        });
      },
    });
  }

  togglePrimary(id: number) {
    this.api.primaryBankAccount(id).subscribe({
      next: ({ message, status, data }) => {
        this.alert.open('success', {
          summary: status,
          details: `${data.bank_name} ${message.toLowerCase()}`,
        });
        this.cardAndBankStore.togglePrimaryAccount(data);
      },
      error: (error: HttpErrorResponse) => {
        this.alert.open('danger', {
          summary: error.error.status + ' ' + error.status,
          details: error.error.message,
        });
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
