import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  Router,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';

@Component({
  selector: 'ca-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isNavOpen = false;
  router = inject(Router);

  @Output() toggleChange = new EventEmitter<boolean>();

  ngOnInit() {
    this.router.events.subscribe({
      next: (e) => {
        if (
          e instanceof NavigationEnd ||
          e instanceof NavigationCancel ||
          e instanceof NavigationError
        ) {
          this.isNavOpen = false;
          this.toggleChange.emit(this.isNavOpen);
        }
      },
    });
  }
}
