import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, ResolveStart, Router } from '@angular/router';

@Component({
  selector: 'ca-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  loading = false;

  private router = inject(Router);

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof ResolveStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd) {
        this.loading = false;
      }
    });
  }
}
