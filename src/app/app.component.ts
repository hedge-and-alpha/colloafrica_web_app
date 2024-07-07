import { Component, OnInit, inject } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  ResolveEnd,
  ResolveStart,
  Router,
} from '@angular/router';
import { AlertService } from './components/alert/alert.service';

@Component({
  selector: 'ca-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  loading = false;

  private router = inject(Router);
  private alertService = inject(AlertService);

  ngOnInit() {
    this.router.events.subscribe((event) => {
      // if (event instanceof NavigationEnd) {
      //   this.alertService.closeAll();
      // }

      if (event instanceof ResolveStart) {
        this.loading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationError
      ) {
        this.loading = false;
      }
    });
  }
}
