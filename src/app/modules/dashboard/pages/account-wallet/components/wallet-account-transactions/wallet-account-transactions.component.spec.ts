import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAccountTransactionsComponent } from './wallet-account-transactions.component';
import { CardComponent } from '../../../../components/card/card.component';
import { TableComponent } from '../../../../../../components/table/table.component';

describe('WalletAccountTransactionsComponent', () => {
  let component: WalletAccountTransactionsComponent;
  let fixture: ComponentFixture<WalletAccountTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WalletAccountTransactionsComponent],
      imports: [CardComponent, TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletAccountTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
