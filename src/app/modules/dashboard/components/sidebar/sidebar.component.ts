import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'ca-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  handleLogout() {
    this.authService.logoutUser().subscribe();
  }
}
