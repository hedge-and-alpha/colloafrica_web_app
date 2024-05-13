import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '../../../../components/modal/modal.service';
import { ModalStatusComponent } from '../../../../components/modal-status/modal-status.component';

@Component({
  selector: 'ca-verify-bvn',
  templateUrl: './verify-bvn.component.html',
  styleUrl: './verify-bvn.component.css',
})
export class VerifyBvnComponent {
  isSubmitted = false;

  form = this.fb.group({
    bvn: [null],
  });

  constructor(private fb: FormBuilder, private modalService: ModalService) {}

  get bvn() {
    return this.form.get('bvn');
  }

  handleSubmit() {
    this.modalService.update(
      ModalStatusComponent,
      'small',
      {},
      {
        success: true,
        status: 'verification successful',
        message:
          'Congratulations!, your identity has been successfully verified \
           and your account is now secure. Your new account number for \
           transactions is 3096827890.',
        // success: false,
        // status: 'verification failed',
        // message:
        //   'The name on your profile does not match the name on your BVN. \
        //   Please ensure that the information provided is accurate \
        //   and corresponds to your official records',
      }
    );
  }

  skipVerification() {
    this.modalService.close();
  }
}
