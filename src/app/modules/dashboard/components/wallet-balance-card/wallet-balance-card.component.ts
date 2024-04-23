import { Component } from '@angular/core';

@Component({
  selector: 'ca-wallet-balance-card',
  templateUrl: './wallet-balance-card.component.html',
  styleUrl: './wallet-balance-card.component.css',
})
export class WalletBalanceCardComponent {
  balance = 0;
  show = false;
}
