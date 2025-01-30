import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, computed } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AlertService } from '../../../../../../components/alert/alert.service';
import { ModalStatusComponent } from '../../../../../../components/modal-status/modal-status.component';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { BankAccount } from '../../../../../../interfaces/bank-and-card';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { TransactionStoreService } from '../../../../../../stores+/transaction.store';
import { UserStoreService } from '../../../../../../stores+/user.store';
import { emptyFieldValidator } from '../../../../../../validators/emptyField.validator';

type WithdrawStep = 'bank-details-form' | 'confirm' | 'otp';

@Component({
  selector: 'ca-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css',
})
export class WithdrawComponent implements OnInit {
  step: WithdrawStep = 'bank-details-form';
  holderName = '';
  isSubmitted = false;
  loading = false;
  selectedBank: BankAccount | null = null;
  banks$!: Observable<BankAccount[]>;
  withdrawalAmount =  new FormControl();
  user = computed(() => this.userStore.user);

  form = this.fb.group(
    {
      bank_account_id: [null, [Validators.required]],
      account_number: [null, [Validators.required]],
    },
    { updateOn: 'submit' }
  );

  otpForm = this.fb.group({
    otp: [
      '',
      [Validators.required, Validators.maxLength(4), emptyFieldValidator],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private api: DashboardApiService,
    private userStore: UserStoreService,
    private alert: AlertService,
    private transactionStore: TransactionStoreService
  ) {}

  ngOnInit() {
    this.banks$ = this.api.getBankAccounts();
  }

  get bankAccountId() {
    return this.form.get('bank_account_id');
  }
  get accountNumber() {
    return this.form.get('account_number');
  }
  get amount() {
    return this.form.get('amount');
  }
  get otp() {
    return this.otpForm.get('otp');
  }

  handleSelectBank(event: BankAccount | undefined) {
    if (!event) {
      this.selectedBank = null;
      this.holderName = '';
      this.accountNumber?.patchValue(null);
      return;
    }
    this.selectedBank = event;
    this.holderName = event.holder_name;
    this.accountNumber?.setValue(event.account_number as any);
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;
    this.step = 'confirm';
    this.modalService.updateConfig({
      closable: false,
      showHeading: false,
    });
    this.isSubmitted = false;
  }

  moveToOtp() {
    this.loading = true;
    this.api.requestOtp().subscribe({
      next: ({ message, status }) => {
        this.alert.open('success', { details: message, summary: status });
        this.loading = false;
        this.modalService.updateConfig(
          {
            closable: true,
            showHeading: true,
            headingText: '',
          },
          'small'
        );
        this.step = 'otp';
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.loading = false;
      },
    });
  }

  cancelWithdrawalRequest() {
    this.modalService.close();
  }

  formattedCurrency(amount: number) {
    return new Intl.NumberFormat('en-US').format(amount * 0.005);
  }

  validWithdrawalAmount(amount: number) {
    return amount && amount > 1000
  }

  completeWithdrawal() {
    this.isSubmitted = true;

    if (this.otpForm.invalid) return;
    this.loading = true;

    const data = {
      bank_account_id: `${this.bankAccountId!.value}`,
      amount: `${this.withdrawalAmount.value}`,
      otp: this.otp!.value,
    };

    this.api.initiateWithdrawal(data).subscribe({
      next: ({ data, status }) => {
        this.modalService.update(
          ModalStatusComponent,
          'small',
          {
            closable: false,
            showHeading: false,
          },
          {
            success: true,
            status: status,
          }
        );
        this.userStore.updateWalletBalance(data.current_balance);
        this.transactionStore.updateTransactions(data.transaction);
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.modalService.update(
          ModalStatusComponent,
          'small',
          {
            closable: false,
            showHeading: false,
          },
          {
            success: false,
            status: error.status + ': Transfer failed',
            message: error.error.message,
          }
        );
      },
    });
  }
}
