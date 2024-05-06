import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MgrIntroComponent } from './mgr-intro.component';

describe('MgrIntroComponent', () => {
  let component: MgrIntroComponent;
  let fixture: ComponentFixture<MgrIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MgrIntroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MgrIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
