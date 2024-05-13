import { Component } from '@angular/core';
import { ModalService } from '../../../../components/modal/modal.service';
import { TopUpComponent } from './top-up/top-up.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

@Component({
  selector: 'ca-account-wallet',
  templateUrl: './account-wallet.component.html',
  styleUrl: './account-wallet.component.css',
})
export class AccountWalletComponent {
  constructor(private modalService: ModalService) {}

  openModal(target: 'top-up' | 'withdraw') {
    if (target === 'top-up') {
      this.modalService.open(TopUpComponent, 'regular', {
        closable: true,
        showHeading: true,
        headingText: 'Enter the desired amount',
      });
    } else {
      this.modalService.open(WithdrawComponent, 'regular', {
        closable: true,
        showHeading: true,
        headingText: 'Enter bank details',
      });
    }
  }
}
