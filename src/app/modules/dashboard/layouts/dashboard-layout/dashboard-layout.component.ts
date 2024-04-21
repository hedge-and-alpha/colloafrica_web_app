import { Component, ElementRef, signal, viewChild } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  Router,
} from '@angular/router';

@Component({
  selector: 'ca-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
  host: {
    '(document:click)': 'onClickOutsideMainNav($event)',
  },
})
export class DashboardLayoutComponent {
  showNav = signal(false);

  nav = viewChild<ElementRef>('mainNav');

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe({
      next: (e) => {
        if (
          e instanceof NavigationEnd ||
          e instanceof NavigationCancel ||
          e instanceof NavigationError
        ) {
          this.showNav.set(false);
        }
      },
    });
  }

  toggleNav(e: Event) {
    e.stopPropagation();
    this.showNav.set(!this.showNav());
  }

  onClickOutsideMainNav(event: Event) {
    const navEl = this.nav()?.nativeElement as HTMLElement;
    const clickedOutside = navEl.contains(event.target as Node);

    if (!clickedOutside) {
      this.showNav.set(false);
    }
  }
}
