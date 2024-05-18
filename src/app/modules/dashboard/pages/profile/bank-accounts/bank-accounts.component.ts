import { AsyncPipe } from '@angular/common';
import { Component, OnInit, computed } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderComponent } from '../../../../../components/loader/loader.component';
import { ModalService } from '../../../../../components/modal/modal.service';
import { SwitchComponent } from '../../../../../components/switch/switch.component';
import { StatusTextDirective } from '../../../../../directives/status-text/status-text.directive';
import { BankAccount } from '../../../../../interfaces/bank-and-card';
import { CardAndBankStoreService } from '../../../../../stores+/card-bank.store';
import { BankAccountFormComponent } from '../../../components/bank-account-form/bank-account-form.component';
import { BankAccountInfoItemColumnComponent } from '../../../components/bank-account-info-item-column/bank-account-info-item-column.component';
import { BankAccountInfoItemComponent } from '../../../components/bank-account-info-item/bank-account-info-item.component';
import { CardComponent } from '../../../components/card/card.component';

@Component({
  selector: 'ca-bank-accounts',
  standalone: true,
  templateUrl: './bank-accounts.component.html',
  styleUrl: './bank-accounts.component.css',
  imports: [
    AsyncPipe,
    BankAccountInfoItemComponent,
    BankAccountInfoItemColumnComponent,
    CardComponent,
    LoaderComponent,
    SwitchComponent,
    StatusTextDirective,
  ],
})
export class BankAccountsComponent implements OnInit {
  bankAccounts$!: Observable<BankAccount[]>;
  res = computed(() => this.cardAndBankStore.bankAccounts());

  constructor(
    private modalService: ModalService,
    private cardAndBankStore: CardAndBankStoreService
  ) {}

  ngOnInit() {
    this.cardAndBankStore.getBankAccounts();
  }

  openModal() {
    this.modalService.open(BankAccountFormComponent, 'regular', {
      closable: true,
      showHeading: true,
      headingText: 'Enter bank details',
    });
  }
}
