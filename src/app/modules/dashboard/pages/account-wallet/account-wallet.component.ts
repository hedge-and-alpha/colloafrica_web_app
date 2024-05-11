import { Component } from '@angular/core';
import { ModalService } from '../../../../components/modal/modal.service';
import { ModalStatusComponent } from '../../../../components/modal-status/modal-status.component';

@Component({
  selector: 'ca-account-wallet',
  templateUrl: './account-wallet.component.html',
  styleUrl: './account-wallet.component.css',
})
export class AccountWalletComponent {
  constructor(private modalService: ModalService) {}

  openModal() {
    this.modalService.open(
      ModalStatusComponent,
      {
        size: 'small',
        closable: true,
        showHeading: true,
      },
      {
        message:
          'Unable to retrieve account. Please check account details and try again.',
        success: false,
      }
    );
  }
}
