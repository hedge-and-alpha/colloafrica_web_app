import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ModalService } from '../../../../../components/modal/modal.service';
import { ModalStatusComponent } from '../../../../../components/modal-status/modal-status.component';

type WithdrawStep = 'bank-details-form' | 'confirm' | 'otp';

@Component({
  selector: 'ca-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css',
})
export class WithdrawComponent {
  step: WithdrawStep = 'bank-details-form';
  isSubmitted = false;

  form = this.fb.group(
    {
      bank: [null, [Validators.required]],
      account_number: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.min(1000)]],
    },
    { updateOn: 'submit' }
  );

  constructor(private fb: FormBuilder, private modalService: ModalService) {}

  handleSubmit() {
    console.log(this.form.value);
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
