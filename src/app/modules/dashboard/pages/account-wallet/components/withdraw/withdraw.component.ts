import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, computed, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
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
export class WithdrawComponent implements OnInit, OnDestroy {
  step: WithdrawStep = 'bank-details-form';
  holderName = '';
  isSubmitted = false;
  loading = false;
  selectedBank: BankAccount | null = null;
  banks$!: Observable<BankAccount[]>;
  banks: BankAccount[] = [];
  user = computed(() => this.userStore.user);
  private destroy$ = new Subject<void>();

  form = this.fb.group({
    bank_account_id: [null as number | null, [Validators.required]],
    account_number: [''],
    amount: [null as number | null, [Validators.required, Validators.min(1000)]],
  });

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
    private transactionStore: TransactionStoreService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.banks$ = this.api.getBankAccounts();

    this.banks$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (banks) => {
        this.banks = banks;
        console.log('Banks loaded:', banks);
      },
      error: (err) => {
        console.error('Error fetching banks:', err);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

  handleSelectBank(bankId: number | null) {
    if (!bankId) {
      this.selectedBank = null;
      this.holderName = '';
      this.form.patchValue({ account_number: '' });
      console.log('Cleared selection');
      return;
    }

    // Find the bank from stored array
    this.selectedBank = this.banks.find(bank => bank.id === bankId) || null;

    if (this.selectedBank) {
      this.holderName = this.selectedBank.holder_name;
      const accountNum = this.selectedBank.account_number;

      this.form.patchValue({ account_number: accountNum });
      this.cdr.detectChanges();
    } else {
      console.log('Bank not found!');
      this.form.patchValue({ account_number: '' });
    }
  }

  handleSubmit() {
    this.isSubmitted = true;

    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });

    if (this.form.invalid || !this.validWithdrawalAmount(this.amount?.value)) {
      return;
    }

    this.step = 'confirm';
    this.modalService.updateConfig({
      closable: false,
      showHeading: false,
    });

    this.isSubmitted = false;
  }

  moveToOtp() {
    this.loading = true;
    this.api.requestOtp().subscribe(
      ({ message, status }: any) => {
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
      (error: HttpErrorResponse) => {
        console.log(error);
        this.loading = false;
        this.alert.open('danger', {
          details: error.error?.message || 'Failed to request OTP',
          summary: 'Error'
        });
      }
    );
  }

  cancelWithdrawalRequest() {
    this.modalService.close();
  }

  formattedCurrency(amount: number | null) {
    if (!amount) return '0';
    return new Intl.NumberFormat('en-US').format(10);
  }

  validWithdrawalAmount(amount: number | null | undefined) {
    return amount != null && amount >= 1000;
  }

  completeWithdrawal() {
    this.isSubmitted = true;
    if (this.otpForm.invalid) return;

    this.loading = true;
    const data = {
      bank_account_id: `${this.bankAccountId!.value}`,
      amount: `${this.amount!.value}`,
      otp: this.otp!.value,
    };

    this.api.initiateWithdrawal(data).subscribe(
      ({ data, status }: any) => {
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
      (error: HttpErrorResponse) => {
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
            message: error.error?.message || 'Withdrawal failed',
          }
        );
      }
    );
  }
}
