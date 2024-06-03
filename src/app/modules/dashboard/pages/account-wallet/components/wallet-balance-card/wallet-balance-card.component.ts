import { Component, computed } from '@angular/core';
import { UserStoreService } from '../../../../../../stores+/user.store';

@Component({
  selector: 'ca-wallet-balance-card',
  templateUrl: './wallet-balance-card.component.html',
  styleUrl: './wallet-balance-card.component.css',
})
export class WalletBalanceCardComponent {
  balance = computed(
    () => this.userStore.user!.virtual_account!.account_balance
  );
  show = false;

  constructor(private userStore: UserStoreService) {}
}
