import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
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
  title = 'collo-africa';

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof ResolveStart) {
        this.loading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationError
      ) {
        this.loading = false;
      }
    });

    this.handleAppRedirect();
  }

  private handleAppRedirect(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const params = new URLSearchParams(window.location.search);
    if (params.get('redirect') !== 'app') return;

    const userAgent = navigator.userAgent || navigator.vendor;
    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);

    if (isAndroid) {
      window.location.href =
        'market://details?id=com.colloafrica.mobile_app';
      setTimeout(() => {
        window.location.href =
          'https://play.google.com/store/apps/details?id=com.colloafrica.mobile_app';
      }, 500);
    } else if (isIOS) {
      window.location.href =
        'https://apps.apple.com/us/app/colloafrica/id6755192715';
    }
  }
}
