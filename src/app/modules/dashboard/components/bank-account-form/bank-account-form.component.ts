import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ModalStatusComponent } from '../../../../components/modal-status/modal-status.component';
import { ModalService } from '../../../../components/modal/modal.service';
import { DashboardApiService } from '../../../../services/api/dashboard-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CardAndBankStoreService } from '../../../../stores+/card-bank.store';

type BankInfo = {
  bank_name: string;
  bank_code: string;
};

@Component({
  selector: 'ca-bank-account-form',
  templateUrl: './bank-account-form.component.html',
  styleUrl: './bank-account-form.component.css',
})
export class BankAccountFormComponent implements OnInit {
  isSubmitted = false;
  loading = false;

  banks$!: Observable<BankInfo[]>;

  form = this.fb.group({
    account_number: [
      null,
      [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(/^[0-9]{10}$/),
      ],
    ],
    bank_name: [null, [Validators.required]],
    bank_code: [null, [Validators.required]],
    transfer_type: ['inter'],
  });

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private api: DashboardApiService,
    private cardBankStore: CardAndBankStoreService
  ) {}

  ngOnInit() {
    this.banks$ = this.api.getBanks();
  }

  get bankName() {
    return this.form.get('bank_name');
  }
  get accountNumber() {
    return this.form.get('account_number');
  }
  get bankCode() {
    return this.form.get('bank_code') as FormControl<null | string>;
  }

  handleSelectBank(event: BankInfo) {
    this.bankCode?.setValue(event.bank_code);
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;
    this.loading = true;

    this.api.addBankAccount(this.form.value).subscribe({
      next: (ba) => {
        this.cardBankStore.addBankAccount(ba);
        this.modalService.update(
          ModalStatusComponent,
          'small',
          {
            closable: false,
            showHeading: false,
          },
          {
            message: 'New bank account added successfully.',
            status: 'Success!',
            success: true,
          }
        );
      },
      error: (error: HttpErrorResponse) => {
        this.modalService.update(
          ModalStatusComponent,
          'small',
          {
            closable: false,
            showHeading: false,
          },
          {
            message: error.error.message,
            status: error.error.status + ' ' + error.status,
            success: false,
          }
        );
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
