import { Component, computed } from '@angular/core';
import { ModalService } from '../../../../components/modal/modal.service';
import { TopUpComponent } from './components/top-up/top-up.component';
import { UserStoreService } from '../../../../stores+/user.store';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { AlertService } from '../../../../components/alert/alert.service';

@Component({
  selector: 'ca-account-wallet',
  templateUrl: './account-wallet.component.html',
  styleUrl: './account-wallet.component.css',
})
export class AccountWalletComponent {
  bvnVerified = computed(() => this.userStore.user!.bvn_verification_status);

  constructor(
    private modalService: ModalService,
    private userStore: UserStoreService,
    private alertService: AlertService
  ) { }

  verifyBvn() {
    async function loadBvn() {
      return (await import('../../components/verify-bvn/verify-bvn.component'))
        .VerifyBvnComponent;
    }

    loadBvn().then((bvnComponent) => {
      this.modalService.open(bvnComponent, 'regular', {
        showHeading: false,
      });
    });
  }

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

  payBills() {
    this.alertService.open('danger', {
      details: 'Feature coming soon',
      closable: true,
    });
  }
}
