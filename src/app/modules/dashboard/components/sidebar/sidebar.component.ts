import { Component } from '@angular/core';
import { AuthApiService } from '../../../../services/api/auth-api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'ca-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(
    private router: Router,
    private auth: AuthService,
    private api: AuthApiService
  ) {}

  handleLogout() {
    this.auth.url = this.router.url;
    this.api.logoutUser().subscribe();
  }
}
