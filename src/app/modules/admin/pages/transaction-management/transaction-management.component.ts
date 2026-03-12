import { Component, OnInit } from '@angular/core';
import { AdminTransactionService, TransactionListItem, TransactionFilters, TransactionAnalytics } from '../../../../services/api/admin-transaction.service';

@Component({
  selector: 'app-transaction-management',
  templateUrl: './transaction-management.component.html',
  styleUrls: ['./transaction-management.component.css']
})
export class TransactionManagementComponent implements OnInit {
  transactions: TransactionListItem[] = [];
  analytics: TransactionAnalytics | null = null;
  loading = false;
  analyticsLoading = false;
  selectedTransactions: Set<number> = new Set();
  showTransactionDetails = false;
  selectedTransactionId: number | null = null;

  // Filters
  filters: TransactionFilters = {
    search: '',
    type: '',
    status: '',
    paymentMethod: '',
    riskLevel: '',
    amountRange: { min: 0, max: 10000000 },
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
    perPage: 10
  };

  // Pagination
  totalTransactions = 0;
  totalPages = 0;
  currentPage = 1;

  // Filter Options
  typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'deposit', label: 'Deposits' },
    { value: 'withdrawal', label: 'Withdrawals' },
    { value: 'contribution', label: 'Contributions' },
    { value: 'disbursement', label: 'Disbursements' },
    { value: 'transfer', label: 'Transfers' },
    { value: 'refund', label: 'Refunds' }
  ];

  statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'flagged', label: 'Flagged for Review' }
  ];

  paymentMethodOptions = [
    { value: '', label: 'All Payment Methods' },
    { value: 'Paystack', label: 'Paystack' },
    { value: 'Flutterwave', label: 'Flutterwave' },
    { value: 'Bank Transfer', label: 'Bank Transfer' },
    { value: 'Internal', label: 'Internal Transfer' }
  ];

  riskLevelOptions = [
    { value: '', label: 'All Risk Levels' },
    { value: 'low', label: 'Low Risk (0-30)' },
    { value: 'medium', label: 'Medium Risk (30-70)' },
    { value: 'high', label: 'High Risk (70+)' }
  ];

  sortOptions = [
    { value: 'createdAt', label: 'Date Created' },
    { value: 'amount', label: 'Amount' },
    { value: 'userName', label: 'User Name' },
    { value: 'type', label: 'Transaction Type' },
    { value: 'status', label: 'Status' },
    { value: 'riskScore', label: 'Risk Score' }
  ];

  perPageOptions = [10, 25, 50, 100];

  // Quick Action Options
  quickActions = [
    { value: 'approve', label: 'Approve Selected', class: 'btn-success' },
    { value: 'flag', label: 'Flag for Review', class: 'btn-warning' },
    { value: 'export', label: 'Export Selected', class: 'btn-secondary' }
  ];

  constructor(private adminTransactionService: AdminTransactionService) {}

  ngOnInit() {
    this.loadTransactions();
    this.loadAnalytics();
  }

  loadTransactions() {
    this.loading = true;
    this.adminTransactionService.getTransactions(this.filters).subscribe(
      (response) => {
        this.transactions = response.data;
        this.totalTransactions = response.total;
        this.totalPages = response.totalPages;
        this.currentPage = response.page;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading transactions:', error);
        this.loading = false;
      }
    );
  }

  loadAnalytics() {
    this.analyticsLoading = true;
    this.adminTransactionService.getTransactionAnalytics().subscribe(
      (analytics) => {
        this.analytics = analytics;
        this.analyticsLoading = false;
      },
      (error) => {
        console.error('Error loading analytics:', error);
        this.analyticsLoading = false;
      }
    );
  }

  // Search and Filtering
  onSearchChange() {
    this.filters.page = 1;
    this.loadTransactions();
  }

  onFilterChange() {
    this.filters.page = 1;
    this.loadTransactions();
  }

  onSortChange() {
    this.loadTransactions();
  }

  clearFilters() {
    this.filters = {
      search: '',
      type: '',
      status: '',
      paymentMethod: '',
      riskLevel: '',
      amountRange: { min: 0, max: 10000000 },
      sortBy: 'createdAt',
      sortOrder: 'desc',
      page: 1,
      perPage: this.filters.perPage
    };
    this.loadTransactions();
  }

  // Pagination
  onPageChange(page: number) {
    this.filters.page = page;
    this.loadTransactions();
  }

  onPerPageChange() {
    this.filters.page = 1;
    this.loadTransactions();
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
  toggleTransactionSelection(transactionId: number) {
    if (this.selectedTransactions.has(transactionId)) {
      this.selectedTransactions.delete(transactionId);
    } else {
      this.selectedTransactions.add(transactionId);
    }
  }

  toggleAllTransactions() {
    if (this.selectedTransactions.size === this.transactions.length) {
      this.selectedTransactions.clear();
    } else {
      this.selectedTransactions.clear();
      this.transactions.forEach(transaction => this.selectedTransactions.add(transaction.id));
    }
  }

  isTransactionSelected(transactionId: number): boolean {
    return this.selectedTransactions.has(transactionId);
  }

  get allTransactionsSelected(): boolean {
    return this.transactions.length > 0 && this.selectedTransactions.size === this.transactions.length;
  }

  get someTransactionsSelected(): boolean {
    return this.selectedTransactions.size > 0 && this.selectedTransactions.size < this.transactions.length;
  }

  // Quick Actions
  executeQuickAction(action: string) {
    if (this.selectedTransactions.size === 0) {
      alert('Please select transactions first');
      return;
    }

    const transactionIds = Array.from(this.selectedTransactions);
    
    switch (action) {
      case 'approve':
        this.bulkApproveTransactions(transactionIds);
        break;
      case 'flag':
        this.bulkFlagTransactions(transactionIds);
        break;
      case 'export':
        this.exportSelectedTransactions(transactionIds);
        break;
    }
  }

  private bulkApproveTransactions(transactionIds: number[]) {
    const confirmMessage = `Are you sure you want to approve ${transactionIds.length} transaction(s)?`;
    if (confirm(confirmMessage)) {
      transactionIds.forEach(transactionId => {
        this.adminTransactionService.approveTransaction(transactionId, 'Bulk approval action').subscribe(
          () => {
            console.log(`Transaction ${transactionId} approved`);
          },
          (error) => {
            console.error(`Error approving transaction ${transactionId}:`, error);
          }
        );
      });
      
      setTimeout(() => {
        this.loadTransactions();
        this.selectedTransactions.clear();
      }, 1000);
    }
  }

  private bulkFlagTransactions(transactionIds: number[]) {
    const reason = prompt('Enter reason for flagging these transactions:');
    if (reason) {
      transactionIds.forEach(transactionId => {
        this.adminTransactionService.flagTransaction(transactionId, reason, 'Bulk flag action').subscribe(
          () => {
            console.log(`Transaction ${transactionId} flagged`);
          },
          (error) => {
            console.error(`Error flagging transaction ${transactionId}:`, error);
          }
        );
      });
      
      setTimeout(() => {
        this.loadTransactions();
        this.selectedTransactions.clear();
      }, 1000);
    }
  }

  private exportSelectedTransactions(transactionIds: number[]) {
    // Create filters for selected transactions
    const exportFilters = { ...this.filters };
    
    this.adminTransactionService.exportTransactions(exportFilters, 'csv').subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `selected_transactions_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error exporting transactions:', error);
      }
    );
  }

  // Transaction Details Modal
  openTransactionDetails(transactionId: number) {
    this.selectedTransactionId = transactionId;
    this.showTransactionDetails = true;
  }

  closeTransactionDetails() {
    this.showTransactionDetails = false;
    this.selectedTransactionId = null;
  }

  onTransactionUpdated() {
    this.loadTransactions();
    this.loadAnalytics();
  }

  // Export Functions
  exportAllTransactions() {
    this.adminTransactionService.exportTransactions(this.filters, 'csv').subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions_export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error exporting transactions:', error);
      }
    );
  }

  exportAsExcel() {
    this.adminTransactionService.exportTransactions(this.filters, 'excel').subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions_export_${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error exporting transactions:', error);
      }
    );
  }

  // Individual Quick Actions
  quickApprove(transactionId: number, event: Event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to approve this transaction?')) {
      this.adminTransactionService.approveTransaction(transactionId, 'Quick approve action').subscribe(
        () => {
          this.loadTransactions();
        },
        (error) => {
          console.error('Error approving transaction:', error);
        }
      );
    }
  }

  quickFlag(transactionId: number, event: Event) {
    event.stopPropagation();
    const reason = prompt('Enter reason for flagging this transaction:');
    if (reason) {
      this.adminTransactionService.flagTransaction(transactionId, reason, 'Quick flag action').subscribe(
        () => {
          this.loadTransactions();
        },
        (error) => {
          console.error('Error flagging transaction:', error);
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getTypeClass(type: string): string {
    switch (type) {
      case 'deposit': return 'type-deposit';
      case 'withdrawal': return 'type-withdrawal';
      case 'contribution': return 'type-contribution';
      case 'disbursement': return 'type-disbursement';
      case 'transfer': return 'type-transfer';
      case 'refund': return 'type-refund';
      default: return 'type-default';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'pending': return 'status-pending';
      case 'failed': return 'status-failed';
      case 'cancelled': return 'status-cancelled';
      case 'flagged': return 'status-flagged';
      default: return 'status-default';
    }
  }

  getRiskClass(riskScore: number): string {
    if (riskScore < 30) return 'risk-low';
    if (riskScore < 70) return 'risk-medium';
    return 'risk-high';
  }

  getRiskLabel(riskScore: number): string {
    if (riskScore < 30) return 'Low Risk';
    if (riskScore < 70) return 'Medium Risk';
    return 'High Risk';
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'deposit': return 'icon-arrow-down';
      case 'withdrawal': return 'icon-arrow-up';
      case 'contribution': return 'icon-mgr';
      case 'disbursement': return 'icon-payout';
      case 'transfer': return 'icon-transfer';
      case 'refund': return 'icon-refund';
      default: return 'icon-transaction';
    }
  }

  Math = Math;
} 