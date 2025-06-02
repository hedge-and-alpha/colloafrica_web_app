import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'ca-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  @Input() collapsed = false;

  menuItems: MenuItem[] = [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: 'dashboard'
    },
    {
      path: '/admin/mgr-management',
      label: 'MGR Management',
      icon: 'mgr'
    },
    {
      path: '/admin/user-management',
      label: 'User Management',
      icon: 'users'
    },
    {
      path: '/admin/analytics',
      label: 'Analytics',
      icon: 'analytics'
    },
    {
      path: '/admin/settings',
      label: 'Settings',
      icon: 'settings'
    }
  ];

  constructor(private router: Router) {}

  isActiveRoute(path: string): boolean {
    return this.router.url === path;
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
} 