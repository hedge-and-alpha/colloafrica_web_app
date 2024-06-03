import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInfoCardComponent } from './account-info-card.component';
import { CardComponent } from '../../../../components/card/card.component';

describe('AccountInfoCardComponent', () => {
  let component: AccountInfoCardComponent;
  let fixture: ComponentFixture<AccountInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountInfoCardComponent],
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the progress bar when verification is incomplete', () => {
    const comp = new AccountInfoCardComponent();
    comp.isComplete = false;

    const el: HTMLElement = fixture.debugElement.nativeElement;
    const progressEl = el.querySelector('progress');

    expect(progressEl).toBeDefined();
  });

  it('should hide the progress bar when verification is complete', () => {
    component.isComplete = true;
    fixture.detectChanges();

    const el: HTMLElement = fixture.debugElement.nativeElement;
    const progressEl = el.querySelector('progress');

    expect(progressEl).toBeNull();
  });

  it('should render 3 paragraphs and one button if verification is complete', () => {
    component.isComplete = true;
    fixture.detectChanges();

    const el: HTMLElement = fixture.debugElement.nativeElement;
    const paras = el.querySelectorAll('p');
    const button = el.querySelector('button');

    expect(paras.length).toBe(3);
    expect(paras[0].textContent).toMatch(/Account Number/i);
    expect(button).not.toBeNull();
  });
});
