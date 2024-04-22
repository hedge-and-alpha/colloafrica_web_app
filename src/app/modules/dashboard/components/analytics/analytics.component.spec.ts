import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsComponent } from './analytics.component';
import { AnalyticsCardComponent } from '../analytics-card/analytics-card.component';

describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render four analytics cards with icons', () => {
    const analyticsComponent: HTMLElement = fixture.debugElement.nativeElement;
    const cards = analyticsComponent.querySelectorAll('ca-analytics-card');
    const icons: HTMLElement[] = [];

    cards.forEach((card) => {
      const i = card.querySelector('i');
      i && icons.push(i);
    });

    expect(cards.length).toBe(4);
    expect(icons.length).toEqual(4);
  });
});
