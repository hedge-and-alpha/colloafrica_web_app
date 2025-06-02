import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AdminUserService, UserDetails, KycDocument, CreditScoreAdjustment, UserStatusUpdate } from '../../../../services/api/admin-user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() userId: number | null = null;
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onUserUpdated = new EventEmitter<void>();

  user: UserDetails | null = null;
  loading = false;
  activeTab = 'overview';
  showStatusModal = false;
  showCreditScoreModal = false;
  showNotificationModal = false;
  showKycReviewModal = false;
  showAdminNoteModal = false;

  // Form data
  statusUpdate: UserStatusUpdate = {
    status: '',
    reason: '',
    adminNote: '',
    notifyUser: true
  };

  creditScoreAdjustment: CreditScoreAdjustment = {
    newScore: 0,
    reason: '',
    type: 'manual_adjustment',
    adminNote: ''
  };

  notification = {
    title: '',
    message: '',
    type: 'info'
  };

  adminNote = {
    note: '',
    type: 'info',
    isInternal: true
  };

  selectedDocument: KycDocument | null = null;
  kycReviewAction: 'approve' | 'reject' = 'approve';
  kycReviewReason = '';

  availableStatuses = [
    { value: 'active', label: 'Active', color: 'green' },
    { value: 'verified', label: 'Verified', color: 'blue' },
    { value: 'pending_verification', label: 'Pending Verification', color: 'yellow' },
    { value: 'suspended', label: 'Suspended', color: 'red' },
    { value: 'deactivated', label: 'Deactivated', color: 'gray' }
  ];

  verificationLevels = [
    { value: 'none', label: 'None', color: 'gray' },
    { value: 'email', label: 'Email Verified', color: 'blue' },
    { value: 'phone', label: 'Phone Verified', color: 'green' },
    { value: 'basic_kyc', label: 'Basic KYC', color: 'yellow' },
    { value: 'full_kyc', label: 'Full KYC', color: 'purple' }
  ];

  riskLevels = [
    { value: 'low', label: 'Low Risk', color: 'green' },
    { value: 'medium', label: 'Medium Risk', color: 'yellow' },
    { value: 'high', label: 'High Risk', color: 'red' }
  ];

  constructor(private adminUserService: AdminUserService) {}

  ngOnInit() {
    if (this.userId && this.isOpen) {
      this.loadUserDetails();
    }
  }

  ngOnChanges() {
    if (this.userId && this.isOpen && !this.user) {
      this.loadUserDetails();
    }
    if (!this.isOpen) {
      this.resetComponent();
    }
  }

  loadUserDetails() {
    this.loading = true;
    this.adminUserService.getUserDetails(this.userId!).subscribe(
      (user) => {
        this.user = user;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading user details:', error);
        this.loading = false;
      }
    );
  }

  resetComponent() {
    this.user = null;
    this.activeTab = 'overview';
    this.closeAllModals();
  }

  closeAllModals() {
    this.showStatusModal = false;
    this.showCreditScoreModal = false;
    this.showNotificationModal = false;
    this.showKycReviewModal = false;
    this.showAdminNoteModal = false;
    this.selectedDocument = null;
  }

  close() {
    this.onClose.emit();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Status Management
  openStatusModal() {
    this.statusUpdate = {
      status: this.user?.status || '',
      reason: '',
      adminNote: '',
      notifyUser: true
    };
    this.showStatusModal = true;
  }

  updateUserStatus() {
    if (!this.userId) return;

    this.adminUserService.updateUserStatus(this.userId, this.statusUpdate).subscribe(
      (response) => {
        console.log('User status updated:', response);
        this.showStatusModal = false;
        this.loadUserDetails();
        this.onUserUpdated.emit();
      },
      (error) => {
        console.error('Error updating user status:', error);
      }
    );
  }

  // Credit Score Management
  openCreditScoreModal() {
    this.creditScoreAdjustment = {
      newScore: this.user?.creditScore || 0,
      reason: '',
      type: 'manual_adjustment',
      adminNote: ''
    };
    this.showCreditScoreModal = true;
  }

  adjustCreditScore() {
    if (!this.userId) return;

    this.adminUserService.adjustCreditScore(this.userId, this.creditScoreAdjustment).subscribe(
      (response) => {
        console.log('Credit score adjusted:', response);
        this.showCreditScoreModal = false;
        this.loadUserDetails();
        this.onUserUpdated.emit();
      },
      (error) => {
        console.error('Error adjusting credit score:', error);
      }
    );
  }

  // KYC Document Review
  openKycReviewModal(document: KycDocument, action: 'approve' | 'reject') {
    this.selectedDocument = document;
    this.kycReviewAction = action;
    this.kycReviewReason = '';
    this.showKycReviewModal = true;
  }

  reviewKycDocument() {
    if (!this.userId || !this.selectedDocument) return;

    this.adminUserService.reviewKycDocument(
      this.userId,
      this.selectedDocument.id,
      this.kycReviewAction,
      this.kycReviewReason
    ).subscribe(
      (response) => {
        console.log('KYC document reviewed:', response);
        this.showKycReviewModal = false;
        this.loadUserDetails();
        this.onUserUpdated.emit();
      },
      (error) => {
        console.error('Error reviewing KYC document:', error);
      }
    );
  }

  // Notifications
  openNotificationModal() {
    this.notification = {
      title: '',
      message: '',
      type: 'info'
    };
    this.showNotificationModal = true;
  }

  sendNotification() {
    if (!this.userId) return;

    this.adminUserService.sendNotification(this.userId, this.notification).subscribe(
      (response) => {
        console.log('Notification sent:', response);
        this.showNotificationModal = false;
      },
      (error) => {
        console.error('Error sending notification:', error);
      }
    );
  }

  // Admin Notes
  openAdminNoteModal() {
    this.adminNote = {
      note: '',
      type: 'info',
      isInternal: true
    };
    this.showAdminNoteModal = true;
  }

  addAdminNote() {
    if (!this.userId) return;

    this.adminUserService.addAdminNote(
      this.userId,
      this.adminNote.note,
      this.adminNote.type,
      this.adminNote.isInternal
    ).subscribe(
      (response) => {
        console.log('Admin note added:', response);
        this.showAdminNoteModal = false;
        this.loadUserDetails();
      },
      (error) => {
        console.error('Error adding admin note:', error);
      }
    );
  }

  // Password Reset
  resetPassword() {
    if (!this.userId) return;

    this.adminUserService.resetUserPassword(this.userId, true).subscribe(
      (response) => {
        console.log('Password reset initiated:', response);
        alert('Password reset email sent to user');
      },
      (error) => {
        console.error('Error resetting password:', error);
      }
    );
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

  getStatusClass(status: string): string {
    const statusObj = this.availableStatuses.find(s => s.value === status);
    return `status-${statusObj?.color || 'gray'}`;
  }

  getVerificationLevelClass(level: string): string {
    const levelObj = this.verificationLevels.find(l => l.value === level);
    return `verification-${levelObj?.color || 'gray'}`;
  }

  getRiskLevelClass(level: string): string {
    const riskObj = this.riskLevels.find(r => r.value === level);
    return `risk-${riskObj?.color || 'gray'}`;
  }

  getDocumentStatusClass(status: string): string {
    switch (status) {
      case 'approved': return 'doc-approved';
      case 'rejected': return 'doc-rejected';
      case 'pending': return 'doc-pending';
      default: return 'doc-pending';
    }
  }

  getCreditScoreColor(score: number): string {
    if (score >= 800) return '#10B981';
    if (score >= 700) return '#F59E0B';
    if (score >= 600) return '#EF4444';
    return '#6B7280';
  }

  downloadDocument(document: KycDocument) {
    // Implementation for document download
    window.open(document.fileUrl, '_blank');
  }

  getVerificationLabel(level: string): string {
    const option = this.verificationLevels.find(v => v.value === level);
    return option ? option.label : level;
  }

  getRiskLabel(level: string): string {
    const option = this.riskLevels.find(r => r.value === level);
    return option ? option.label : level;
  }

  Math = Math;
} 