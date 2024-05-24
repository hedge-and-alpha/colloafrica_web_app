import { Component, OnInit, computed } from '@angular/core';
import { UserStoreService } from '../../../../stores+/user.store';

@Component({
  selector: 'ca-wallet-account-details',
  templateUrl: './wallet-account-details.component.html',
  styleUrl: './wallet-account-details.component.css',
})
export class WalletAccountDetailsComponent implements OnInit {
  account = computed(() => this.userStore.user!.virtual_account);
  accountDetails = '';

  constructor(private userStore: UserStoreService) {}

  ngOnInit() {
    this.accountDetails = `Account Name: ${
      this.account()?.account_first_name
    } ${this.account()?.account_last_name}
    Bank: VFD Bank
    Account Number: ${this.account()?.account_number}`;
  }
}
