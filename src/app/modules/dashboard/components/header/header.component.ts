import { Component, computed, inject, OnInit } from '@angular/core';
import { UserStoreService } from '../../../../stores+/user.store';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'ca-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private store = inject(UserStoreService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  user = computed(() => this.store.user);
  pageName = 'Dashboard';
  
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary')
    ).subscribe(route => {
      const routeData = route.snapshot.data;
      this.pageName = routeData['title'] || this.getPageNameFromUrl();
    });
  }

  private getPageNameFromUrl(): string {
    const url = this.router.url;
    
    // Check if the URL contains 'mgr' to display 'Contribution'
    if (url.includes('/mgr') || url.includes('/contribution')) {
      return 'Contribution';
    }
    
    const urlSegments = url.split('/');
    // Get the last segment of the URL
    const lastSegment = urlSegments.filter(segment => segment).pop() || 'Dashboard';
    // Convert to title case (e.g., 'profile-edit' becomes 'Profile Edit')
    return lastSegment
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
