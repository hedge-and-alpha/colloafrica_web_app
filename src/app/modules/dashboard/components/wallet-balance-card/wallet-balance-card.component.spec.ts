import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletBalanceCardComponent } from './wallet-balance-card.component';

describe('WalletBalanceCardComponent', () => {
  let component: WalletBalanceCardComponent;
  let fixture: ComponentFixture<WalletBalanceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WalletBalanceCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletBalanceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should show eye icon when balance is not visible', () => {
  //   const wbc: HTMLElement = fixture.debugElement.nativeElement;
  //   const button = wbc.querySelector('button');
  //   const icon = button?.querySelector('i');

  //   button?.click();
  //   fixture.detectChanges();

  //   expect(icon?.classList).toMatch(/ca-eye-slash/);
  // });

  // it('should show eye slash icon when balance is visible', () => {});
});
