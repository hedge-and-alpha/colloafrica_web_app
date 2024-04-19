import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertsSliderComponent } from './adverts-slider.component';

describe('AdvertsSliderComponent', () => {
  let component: AdvertsSliderComponent;
  let fixture: ComponentFixture<AdvertsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvertsSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
