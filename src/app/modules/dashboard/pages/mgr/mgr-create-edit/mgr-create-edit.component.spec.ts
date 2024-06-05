import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MgrCreateComponent } from './mgr-create-edit.component';

describe('MgrCreateComponent', () => {
  let component: MgrCreateComponent;
  let fixture: ComponentFixture<MgrCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MgrCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MgrCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
