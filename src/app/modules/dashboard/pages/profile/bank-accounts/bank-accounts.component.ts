import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { BankAccountInfoItemComponent } from '../../../components/bank-account-info-item/bank-account-info-item.component';
import { BankAccountInfoItemColumnComponent } from '../../../components/bank-account-info-item-column/bank-account-info-item-column.component';

@Component({
  selector: 'ca-bank-accounts',
  standalone: true,
  templateUrl: './bank-accounts.component.html',
  styleUrl: './bank-accounts.component.css',
  imports: [
    BankAccountInfoItemComponent,
    BankAccountInfoItemColumnComponent,
    CardComponent,
  ],
})
export class BankAccountsComponent {}
