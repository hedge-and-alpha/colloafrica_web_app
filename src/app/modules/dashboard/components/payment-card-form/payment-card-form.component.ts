import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '../../../../components/modal/modal.service';
import { ModalStatusComponent } from '../../../../components/modal-status/modal-status.component';

@Component({
  selector: 'ca-payment-card-form',
  templateUrl: './payment-card-form.component.html',
  styleUrl: './payment-card-form.component.css',
})
export class PaymentCardFormComponent {
  form = this.fb.group({});

  constructor(private fb: FormBuilder, private modalService: ModalService) {}

  handleSubmit() {
    // Your new card has been added.
    // The card you tried to add is invalid.
    this.modalService.update(
      ModalStatusComponent,
      'small',
      {
        closable: false,
        showHeading: false,
      },
      {
        message:
          'Unable to retrieve account. Please check account details and try again.',
        success: false,
      }
    );
  }
}
