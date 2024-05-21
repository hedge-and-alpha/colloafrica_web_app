import { Component, computed } from '@angular/core';
import { UserStoreService } from '../../../../stores+/user.store';

@Component({
  selector: 'ca-wallet-account-details',
  templateUrl: './wallet-account-details.component.html',
  styleUrl: './wallet-account-details.component.css',
})
export class WalletAccountDetailsComponent {
  user = computed(() => this.userStore.user!);

  constructor(private userStore: UserStoreService) {}
}
