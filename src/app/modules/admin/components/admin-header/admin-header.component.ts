import { Component, EventEmitter, Output, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../../../../services/api/auth-api.service';
import { UserStoreService } from '../../../../stores+/user.store';

@Component({
  selector: 'ca-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  @Output() sidebarToggle = new EventEmitter<boolean>();
  
  isSidebarCollapsed = false;
  user = computed(() => this.userStore.user);

  constructor(
    private authApi: AuthApiService,
    private router: Router,
    private userStore: UserStoreService
  ) {}

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.sidebarToggle.emit(this.isSidebarCollapsed);
  }

  logout() {
    this.authApi.logoutUser().subscribe({
      next: () => {
        this.router.navigate(['/auth']);
      },
      error: () => {
        // Even if logout fails on server, clear local data
        this.authApi.clearAuth();
        this.router.navigate(['/auth']);
      }
    });
  }
} 