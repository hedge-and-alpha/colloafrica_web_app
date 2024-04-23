import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { RouterLinkActive } from '@angular/router';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [RouterLinkActive],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a menu element', () => {
    const sidebar: HTMLElement = fixture.debugElement.nativeElement;
    const menuEl = sidebar.querySelector('menu');

    expect(menuEl).toBeDefined();
  });

  it('should contain the right amount of links', () => {
    const sidebar: HTMLElement = fixture.debugElement.nativeElement;
    const menuEl = sidebar.querySelector('menu');
    const listItems = menuEl?.querySelectorAll('li');

    expect(listItems).toBeDefined();
    expect(listItems?.length).toBe(7);
  });

  it('should contain logout button', () => {
    const sidebar: HTMLElement = fixture.debugElement.nativeElement;
    const menuEl = sidebar.querySelector('menu');
    const button = menuEl?.querySelector('button');

    expect(button).toBeDefined();
  });
});
