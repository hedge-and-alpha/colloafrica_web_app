import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AdminMgrService, MgrDetails, MgrMember } from '../../../../services/api/admin-mgr.service';

@Component({
  selector: 'ca-mgr-details',
  templateUrl: './mgr-details.component.html',
  styleUrl: './mgr-details.component.css'
})
export class MgrDetailsComponent implements OnInit, OnChanges {
  @Input() mgrId: string | null = null;
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() statusUpdated = new EventEmitter<void>();

  loading = false;
  mgrDetails: MgrDetails | null = null;
  activeTab = 'overview';
  selectedMember: MgrMember | null = null;
  
  // Admin actions
  showStatusModal = false;
  showNoteModal = false;
  showMemberModal = false;
  
  statusAction = '';
  adminNote = '';
  memberAction = '';
  memberNote = '';

  constructor(private adminMgrService: AdminMgrService) {}

  ngOnInit() {
    if (this.mgrId) {
      this.loadMgrDetails();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mgrId'] && this.mgrId) {
      this.loadMgrDetails();
    }
  }

  loadMgrDetails() {
    if (!this.mgrId) return;
    
    this.loading = true;
    this.adminMgrService.getMgrDetails(this.mgrId).subscribe({
      next: (details) => {
        this.mgrDetails = details;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading MGR details:', error);
        this.loading = false;
      }
    });
  }

  onClose() {
    this.close.emit();
    this.resetModals();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  openStatusModal(action: string) {
    this.statusAction = action;
    this.showStatusModal = true;
  }

  openNoteModal() {
    this.showNoteModal = true;
  }

  openMemberModal(member: MgrMember, action: string) {
    this.selectedMember = member;
    this.memberAction = action;
    this.showMemberModal = true;
  }

  confirmStatusUpdate() {
    if (!this.mgrId || !this.statusAction) return;

    this.adminMgrService.updateMgrStatus(this.mgrId, this.statusAction, this.adminNote).subscribe({
      next: () => {
        this.statusUpdated.emit();
        this.loadMgrDetails();
        this.resetModals();
      },
      error: (error) => {
        console.error('Error updating MGR status:', error);
      }
    });
  }

  addAdminNote() {
    if (!this.mgrId || !this.adminNote) return;

    this.adminMgrService.addAdminNote(this.mgrId, this.adminNote, 'info').subscribe({
      next: () => {
        this.loadMgrDetails();
        this.resetModals();
      },
      error: (error) => {
        console.error('Error adding admin note:', error);
      }
    });
  }

  updateMemberStatus() {
    if (!this.mgrId || !this.selectedMember || !this.memberAction) return;

    this.adminMgrService.updateMemberStatus(this.mgrId, this.selectedMember.userId, this.memberAction, this.memberNote).subscribe({
      next: () => {
        this.loadMgrDetails();
        this.resetModals();
      },
      error: (error) => {
        console.error('Error updating member status:', error);
      }
    });
  }

  resetModals() {
    this.showStatusModal = false;
    this.showNoteModal = false;
    this.showMemberModal = false;
    this.statusAction = '';
    this.adminNote = '';
    this.memberAction = '';
    this.memberNote = '';
    this.selectedMember = null;
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusBadgeClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'active': 'status-active',
      'pending': 'status-pending',
      'completed': 'status-completed',
      'suspended': 'status-suspended',
      'rejected': 'status-rejected',
      'defaulted': 'status-defaulted'
    };
    return statusClasses[status] || 'status-default';
  }

  getMemberScoreClass(score: number): string {
    if (score >= 800) return 'score-excellent';
    if (score >= 700) return 'score-good';
    if (score >= 600) return 'score-fair';
    return 'score-poor';
  }

  getContributionStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'completed': 'contribution-completed',
      'pending': 'contribution-pending',
      'failed': 'contribution-failed',
      'reversed': 'contribution-reversed'
    };
    return statusClasses[status] || 'contribution-default';
  }
} 