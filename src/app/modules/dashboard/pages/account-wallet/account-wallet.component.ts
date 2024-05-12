import { Component } from '@angular/core';
import { ModalService } from '../../../../components/modal/modal.service';
import { TopUpComponent } from './top-up/top-up.component';

@Component({
  selector: 'ca-account-wallet',
  templateUrl: './account-wallet.component.html',
  styleUrl: './account-wallet.component.css',
})
export class AccountWalletComponent {
  constructor(private modalService: ModalService) {}

  openModal() {
    this.modalService.open(TopUpComponent, 'regular', {
      closable: true,
      showHeading: true,
      headingText: 'Enter the desired amount',
    });
  }
}
