import { Component } from '@angular/core';
import { AuthApiService } from '../../../../services/auth/auth-api.service';

@Component({
  selector: 'ca-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private authService: AuthApiService) {}

  handleLogout() {
    this.authService.logoutUser().subscribe();
  }
}
