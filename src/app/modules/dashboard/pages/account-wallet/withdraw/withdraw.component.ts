import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ModalService } from '../../../../../components/modal/modal.service';
import { ModalStatusComponent } from '../../../../../components/modal-status/modal-status.component';
import { DashboardApiService } from '../../../../../services/api/dashboard-api.service';
import { Observable } from 'rxjs';
import { BankAccount } from '../../../../../interfaces/bank-and-card';

type WithdrawStep = 'bank-details-form' | 'confirm' | 'otp';

@Component({
  selector: 'ca-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css',
})
export class WithdrawComponent implements OnInit {
  step: WithdrawStep = 'bank-details-form';
  isSubmitted = false;
  selectedBank!: BankAccount;
  banks$!: Observable<BankAccount[]>;

  form = this.fb.group(
    {
      bank: [null, [Validators.required]],
      account_number: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.min(1000)]],
    },
    { updateOn: 'submit' }
  );

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private api: DashboardApiService
  ) {}

  ngOnInit() {
    this.banks$ = this.api.getBankAccounts();
  }

  get bankName() {
    return this.form.get('bank_name');
  }
  get amount() {
    return this.form.get('amount');
  }

  handleSelectBank(event: BankAccount) {
    console.log(event);
    this.selectedBank = event;
    // this.bankCode?.setValue(event.bank_code);
    // if (event.bank_code === '999999') {
    //   this.transferType?.setValue('intra');
    // } else {
    //   this.transferType?.setValue('inter');
    // }
  }

  handleSubmit() {
    console.log(this.form.value);
    this.isSubmitted = true;

    // if (this.form.invalid) return

    this.modalService.updateConfig({
      closable: false,
      showHeading: false,
    });
    this.step = 'confirm';
  }

  moveToOtp() {
    this.modalService;
    this.modalService.updateConfig(
      {
        closable: true,
        showHeading: true,
        headingText: '',
      },
      'small'
    );
    this.step = 'otp';
  }

  cancelWithdrawalRequest() {
    this.modalService.close();
  }

  complete() {
    this.modalService.update(
      ModalStatusComponent,
      'small',
      {
        closable: false,
        showHeading: false,
      },
      {
        success: true,
        // success: false,
        status: 'Transfer successful',
        // status: 'Transfer failed',
        // message: 'Your transfer failed due to insufficient funds',
      }
    );
  }
}
