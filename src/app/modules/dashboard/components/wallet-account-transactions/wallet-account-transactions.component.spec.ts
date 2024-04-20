import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAccountTransactionsComponent } from './wallet-account-transactions.component';

describe('WalletAccountTransactionsComponent', () => {
  let component: WalletAccountTransactionsComponent;
  let fixture: ComponentFixture<WalletAccountTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WalletAccountTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalletAccountTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
