import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAccountDetailsComponent } from './wallet-account-details.component';

describe('WalletAccountDetailsComponent', () => {
  let component: WalletAccountDetailsComponent;
  let fixture: ComponentFixture<WalletAccountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WalletAccountDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalletAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
