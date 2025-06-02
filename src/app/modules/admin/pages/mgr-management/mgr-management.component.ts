import { Component, OnInit } from '@angular/core';
import { AdminMgrService, MgrListItem, MgrFilters } from '../../../../services/api/admin-mgr.service';

@Component({
  selector: 'ca-mgr-management',
  templateUrl: './mgr-management.component.html',
  styleUrl: './mgr-management.component.css'
})
export class MgrManagementComponent implements OnInit {
  loading = false;
  mgrs: MgrListItem[] = [];
  
  // Pagination
  currentPage = 1;
  totalPages = 0;
  totalItems = 0;
  itemsPerPage = 10;
  
  // Filters
  filters: MgrFilters = {
    status: 'all',
    category: '',
    search: '',
    sortBy: 'created_at',
    sortOrder: 'desc',
    page: 1,
    perPage: 10
  };
  
  // Filter options
  statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'rejected', label: 'Rejected' }
  ];
  
  sortOptions = [
    { value: 'created_at', label: 'Date Created' },
    { value: 'name', label: 'Name' },
    { value: 'member_count', label: 'Member Count' },
    { value: 'total_contributions', label: 'Total Contributions' },
    { value: 'last_activity', label: 'Last Activity' }
  ];
  
  categories: string[] = [];
  
  // View state
  selectedMgrId: string | null = null;
  showMgrDetails = false;
  
  // Bulk actions
  selectedMgrs: Set<string> = new Set();
  showBulkActions = false;

  // Make Math available in template
  Math = Math;

  constructor(private adminMgrService: AdminMgrService) {}

  ngOnInit() {
    this.loadCategories();
    this.loadMgrs();
  }

  loadCategories() {
    this.adminMgrService.getMgrCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  loadMgrs() {
    this.loading = true;
    this.filters.page = this.currentPage;
    this.filters.perPage = this.itemsPerPage;
    
    // Clean filters - remove 'all' status
    const cleanFilters = { ...this.filters };
    if (cleanFilters.status === 'all') {
      delete cleanFilters.status;
    }
    if (!cleanFilters.category) {
      delete cleanFilters.category;
    }
    if (!cleanFilters.search) {
      delete cleanFilters.search;
    }

    this.adminMgrService.getMgrs(cleanFilters).subscribe({
      next: (response) => {
        this.mgrs = response.data;
        this.totalItems = response.total;
        this.totalPages = response.totalPages;
        this.currentPage = response.page;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading MGRs:', error);
        this.loading = false;
      }
    });
  }

  onSearchChange(searchTerm: string) {
    this.filters.search = searchTerm;
    this.currentPage = 1;
    this.loadMgrs();
  }

  onStatusFilterChange(status: string) {
    this.filters.status = status;
    this.currentPage = 1;
    this.loadMgrs();
  }

  onCategoryFilterChange(category: string) {
    this.filters.category = category;
    this.currentPage = 1;
    this.loadMgrs();
  }

  onSortChange(sortBy: string) {
    this.filters.sortBy = sortBy as any;
    this.loadMgrs();
  }

  onSortOrderChange(order: string) {
    this.filters.sortOrder = order as 'asc' | 'desc';
    this.loadMgrs();
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadMgrs();
    }
  }

  onItemsPerPageChange(perPage: number) {
    this.itemsPerPage = perPage;
    this.currentPage = 1;
    this.loadMgrs();
  }

  clearFilters() {
    this.filters = {
      status: 'all',
      category: '',
      search: '',
      sortBy: 'created_at',
      sortOrder: 'desc',
      page: 1,
      perPage: 10
    };
    this.currentPage = 1;
    this.loadMgrs();
  }

  viewMgrDetails(mgrId: string) {
    this.selectedMgrId = mgrId;
    this.showMgrDetails = true;
  }

  closeMgrDetails() {
    this.showMgrDetails = false;
    this.selectedMgrId = null;
  }

  onMgrStatusUpdated() {
    this.loadMgrs();
  }

  quickUpdateStatus(mgrId: string, status: string) {
    this.adminMgrService.updateMgrStatus(mgrId, status).subscribe({
      next: () => {
        this.loadMgrs();
      },
      error: (error) => {
        console.error('Error updating MGR status:', error);
      }
    });
  }

  // Bulk actions
  toggleMgrSelection(mgrId: string) {
    if (this.selectedMgrs.has(mgrId)) {
      this.selectedMgrs.delete(mgrId);
    } else {
      this.selectedMgrs.add(mgrId);
    }
    this.showBulkActions = this.selectedMgrs.size > 0;
  }

  toggleAllMgrs() {
    if (this.selectedMgrs.size === this.mgrs.length) {
      this.selectedMgrs.clear();
    } else {
      this.mgrs.forEach(mgr => this.selectedMgrs.add(mgr.id));
    }
    this.showBulkActions = this.selectedMgrs.size > 0;
  }

  bulkUpdateStatus(status: string) {
    if (this.selectedMgrs.size === 0) return;
    
    const updates = Array.from(this.selectedMgrs).map(mgrId => 
      this.adminMgrService.updateMgrStatus(mgrId, status)
    );
    
    // Execute all updates (simplified - in real app would use proper bulk API)
    Promise.all(updates.map(update => update.toPromise()))
      .then(() => {
        this.selectedMgrs.clear();
        this.showBulkActions = false;
        this.loadMgrs();
      })
      .catch(error => {
        console.error('Error bulk updating MGRs:', error);
      });
  }

  exportMgrs() {
    this.adminMgrService.exportMgrs(this.filters).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `mgrs-export-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error exporting MGRs:', error);
      }
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getStatusBadgeClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'active': 'status-active',
      'pending': 'status-pending',
      'completed': 'status-completed',
      'suspended': 'status-suspended',
      'rejected': 'status-rejected'
    };
    return statusClasses[status] || 'status-default';
  }

  getProgressColor(progress: number): string {
    if (progress >= 80) return '#16a34a';
    if (progress >= 50) return '#d97706';
    return '#dc2626';
  }

  getPaginationRange(): number[] {
    const range = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);
    
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    
    return range;
  }
} 