import { Component, OnInit } from '@angular/core';
import { AdminUserService, UserListItem, UserFilters } from '../../../../services/api/admin-user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: UserListItem[] = [];
  loading = false;
  selectedUsers: Set<number> = new Set();
  showUserDetails = false;
  selectedUserId: number | null = null;

  // Filters
  filters: UserFilters = {
    search: '',
    status: '',
    verificationLevel: '',
    riskLevel: '',
    creditScoreRange: { min: 0, max: 1000 },
    sortBy: 'joined_at',
    sortOrder: 'desc',
    page: 1,
    perPage: 10
  };

  // Pagination
  totalUsers = 0;
  totalPages = 0;
  currentPage = 1;

  // Filter Options
  statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'verified', label: 'Verified' },
    { value: 'pending_verification', label: 'Pending Verification' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'deactivated', label: 'Deactivated' }
  ];

  verificationOptions = [
    { value: '', label: 'All Verification Levels' },
    { value: 'none', label: 'None' },
    { value: 'email', label: 'Email Verified' },
    { value: 'phone', label: 'Phone Verified' },
    { value: 'basic_kyc', label: 'Basic KYC' },
    { value: 'full_kyc', label: 'Full KYC' }
  ];

  riskOptions = [
    { value: '', label: 'All Risk Levels' },
    { value: 'low', label: 'Low Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'high', label: 'High Risk' }
  ];

  sortOptions = [
    { value: 'joined_at', label: 'Registration Date' },
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'credit_score', label: 'Credit Score' },
    { value: 'last_login', label: 'Last Login' },
    { value: 'total_contributions', label: 'Total Contributions' }
  ];

  perPageOptions = [10, 25, 50, 100];

  // Bulk Actions
  bulkActions = [
    { value: 'activate', label: 'Activate Users', class: 'btn-success' },
    { value: 'suspend', label: 'Suspend Users', class: 'btn-warning' },
    { value: 'verify', label: 'Mark as Verified', class: 'btn-primary' },
    { value: 'export', label: 'Export Selected', class: 'btn-secondary' }
  ];

  constructor(private adminUserService: AdminUserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.adminUserService.getUsers(this.filters).subscribe(
      (response) => {
        this.users = response.data;
        this.totalUsers = response.total;
        this.totalPages = response.totalPages;
        this.currentPage = response.page;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
      }
    );
  }

  // Search and Filtering
  onSearchChange() {
    this.filters.page = 1;
    this.loadUsers();
  }

  onFilterChange() {
    this.filters.page = 1;
    this.loadUsers();
  }

  onSortChange() {
    this.loadUsers();
  }

  clearFilters() {
    this.filters = {
      search: '',
      status: '',
      verificationLevel: '',
      riskLevel: '',
      creditScoreRange: { min: 0, max: 1000 },
      sortBy: 'joined_at',
      sortOrder: 'desc',
      page: 1,
      perPage: this.filters.perPage
    };
    this.loadUsers();
  }

  // Pagination
  onPageChange(page: number) {
    this.filters.page = page;
    this.loadUsers();
  }

  onPerPageChange() {
    this.filters.page = 1;
    this.loadUsers();
  }

  getPaginationPages(): number[] {
    const pages = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Selection Management
  toggleUserSelection(userId: number) {
    if (this.selectedUsers.has(userId)) {
      this.selectedUsers.delete(userId);
    } else {
      this.selectedUsers.add(userId);
    }
  }

  toggleAllUsers() {
    if (this.selectedUsers.size === this.users.length) {
      this.selectedUsers.clear();
    } else {
      this.selectedUsers.clear();
      this.users.forEach(user => this.selectedUsers.add(user.id));
    }
  }

  isUserSelected(userId: number): boolean {
    return this.selectedUsers.has(userId);
  }

  get allUsersSelected(): boolean {
    return this.users.length > 0 && this.selectedUsers.size === this.users.length;
  }

  get someUsersSelected(): boolean {
    return this.selectedUsers.size > 0 && this.selectedUsers.size < this.users.length;
  }

  // Bulk Actions
  executeBulkAction(action: string) {
    if (this.selectedUsers.size === 0) {
      alert('Please select users first');
      return;
    }

    const userIds = Array.from(this.selectedUsers);
    
    switch (action) {
      case 'activate':
        this.bulkUpdateStatus(userIds, 'active');
        break;
      case 'suspend':
        this.bulkUpdateStatus(userIds, 'suspended');
        break;
      case 'verify':
        this.bulkUpdateStatus(userIds, 'verified');
        break;
      case 'export':
        this.exportSelectedUsers(userIds);
        break;
    }
  }

  private bulkUpdateStatus(userIds: number[], status: string) {
    const confirmMessage = `Are you sure you want to ${status} ${userIds.length} user(s)?`;
    if (confirm(confirmMessage)) {
      // In a real application, you would make API calls to update each user
      userIds.forEach(userId => {
        this.adminUserService.updateUserStatus(userId, {
          status,
          reason: `Bulk ${status} action`,
          adminNote: `Bulk action performed on ${new Date().toISOString()}`,
          notifyUser: true
        }).subscribe(
          () => {
            console.log(`User ${userId} status updated to ${status}`);
          },
          (error) => {
            console.error(`Error updating user ${userId}:`, error);
          }
        );
      });
      
      // Reload users and clear selection
      setTimeout(() => {
        this.loadUsers();
        this.selectedUsers.clear();
      }, 1000);
    }
  }

  private exportSelectedUsers(userIds: number[]) {
    // Create filters for selected users
    const exportFilters = { ...this.filters };
    // In a real application, you would modify the filters to include only selected users
    
    this.adminUserService.exportUsers(exportFilters, 'csv').subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `selected_users_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error exporting users:', error);
      }
    );
  }

  // User Details Modal
  openUserDetails(userId: number) {
    this.selectedUserId = userId;
    this.showUserDetails = true;
  }

  closeUserDetails() {
    this.showUserDetails = false;
    this.selectedUserId = null;
  }

  onUserUpdated() {
    this.loadUsers();
  }

  // Export Functions
  exportAllUsers() {
    this.adminUserService.exportUsers(this.filters, 'csv').subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error exporting users:', error);
      }
    );
  }

  exportAsExcel() {
    this.adminUserService.exportUsers(this.filters, 'excel').subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users_export_${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error exporting users:', error);
      }
    );
  }

  // Quick Actions
  quickSuspend(userId: number, event: Event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to suspend this user?')) {
      this.adminUserService.updateUserStatus(userId, {
        status: 'suspended',
        reason: 'Quick suspend action',
        adminNote: 'User suspended via quick action',
        notifyUser: true
      }).subscribe(
        () => {
          this.loadUsers();
        },
        (error) => {
          console.error('Error suspending user:', error);
        }
      );
    }
  }

  quickActivate(userId: number, event: Event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to activate this user?')) {
      this.adminUserService.updateUserStatus(userId, {
        status: 'active',
        reason: 'Quick activate action',
        adminNote: 'User activated via quick action',
        notifyUser: true
      }).subscribe(
        () => {
          this.loadUsers();
        },
        (error) => {
          console.error('Error activating user:', error);
        }
      );
    }
  }

  resetUserPassword(userId: number, event: Event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to reset this user\'s password?')) {
      this.adminUserService.resetUserPassword(userId, true).subscribe(
        () => {
          alert('Password reset email sent to user');
        },
        (error) => {
          console.error('Error resetting password:', error);
        }
      );
    }
  }

  // Utility Methods
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'verified': return 'status-verified';
      case 'active': return 'status-active';
      case 'pending_verification': return 'status-pending';
      case 'suspended': return 'status-suspended';
      case 'deactivated': return 'status-deactivated';
      default: return 'status-default';
    }
  }

  getVerificationClass(level: string): string {
    switch (level) {
      case 'full_kyc': return 'verification-full';
      case 'basic_kyc': return 'verification-basic';
      case 'phone': return 'verification-phone';
      case 'email': return 'verification-email';
      case 'none': return 'verification-none';
      default: return 'verification-none';
    }
  }

  getRiskClass(level: string): string {
    switch (level) {
      case 'low': return 'risk-low';
      case 'medium': return 'risk-medium';
      case 'high': return 'risk-high';
      default: return 'risk-unknown';
    }
  }

  getCreditScoreClass(score: number): string {
    if (score >= 800) return 'credit-excellent';
    if (score >= 700) return 'credit-good';
    if (score >= 600) return 'credit-fair';
    return 'credit-poor';
  }

  getVerificationLabel(level: string): string {
    const option = this.verificationOptions.find(v => v.value === level);
    return option ? option.label : level;
  }

  Math = Math;
} 