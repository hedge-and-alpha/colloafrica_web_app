import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalStatusComponent } from '../../../../components/modal-status/modal-status.component';
import { ModalService } from '../../../../components/modal/modal.service';

@Component({
  selector: 'ca-bank-account-form',
  templateUrl: './bank-account-form.component.html',
  styleUrl: './bank-account-form.component.css',
})
export class BankAccountFormComponent {
  form = this.fb.group({});

  constructor(private fb: FormBuilder, private modalService: ModalService) {}

  handleSubmit() {
    // New bank account added successfully.
    // Unable to retrieve account. Please check account details and try again.
    this.modalService.update(
      ModalStatusComponent,
      'small',
      {
        closable: false,
        showHeading: false,
      },
      {
        message: 'New bank account added successfully.',
        success: true,
      }
    );
  }
}
