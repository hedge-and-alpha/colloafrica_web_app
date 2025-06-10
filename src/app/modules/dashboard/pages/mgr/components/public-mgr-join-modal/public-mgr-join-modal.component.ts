import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../../components/alert/alert.service';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { Router } from '@angular/router';
import { MGR } from '../../../../../../interfaces/mgr.interface';

@Component({
  selector: 'ca-public-mgr-join-modal',
  templateUrl: './public-mgr-join-modal.component.html',
  styleUrls: ['./public-mgr-join-modal.component.css']
})
export class PublicMgrJoinModalComponent implements OnInit {
  @Input() plan!: MGR;
  @Output() joinSuccess = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<void>();

  joinForm: FormGroup;
  loading = false;
  
  // Position selection properties
  selectedPosition: number | null = null;
  
  // Eligibility check properties
  eligibilityChecked = false;
  canJoin = true;
  eligibilityMessage = '';

  data: { plan: MGR } = { plan: {} as MGR };

  constructor(
    private fb: FormBuilder,
    private api: DashboardApiService,
    private alert: AlertService,
    private router: Router,
    private modalService: ModalService
  ) {
    this.joinForm = this.fb.group({
      position: [''],
      agreement: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {
    if (this.plan) {
      this.data.plan = this.plan;
      // Automatically check eligibility when component loads
      this.checkEligibility();
    }
  }

  // Position selection methods
  onPositionSelected(position: number | null) {
    this.selectedPosition = position;
    this.joinForm.patchValue({ position: position?.toString() || '' });
  }

  onRecommendationRequested() {
    // Implementation for position recommendation
    // This could call an API or use some logic to recommend a position
    console.log('Position recommendation requested');
  }

  // Eligibility check method
  checkEligibility() {
    if (!this.plan?.id) return;
    
    this.api.checkJoinEligibility(this.plan.id).subscribe({
      next: (response: any) => {
        this.eligibilityChecked = true;
        this.canJoin = response.data?.eligible || true;
        this.eligibilityMessage = response.data?.message || '';
      },
      error: (error: any) => {
        this.eligibilityChecked = true;
        this.canJoin = true; // Default to true if check fails
        this.eligibilityMessage = 'Unable to check eligibility, but you can still try to join.';
        console.error('Eligibility check failed:', error);
      }
    });
  }

  onSubmit() {
    if (this.joinForm.valid) {
      this.loading = true;
      
      const joinData = {
        agreement: this.joinForm.value.agreement,
        ...(this.selectedPosition && { position: this.selectedPosition })
      };

      this.api.joinPublicMgr(this.plan.id, joinData).subscribe({
        next: (response: any) => {
          this.loading = false;
          this.alert.open('success', {
            summary: 'Success!',
            details: 'You have successfully joined the MGR plan',
            closable: true
          });
          this.joinSuccess.emit(true);
          // Close the modal
          this.modalService.close();
          // Navigate to the MGR details page
          this.router.navigate(['/mgr', this.plan.id, 'view']);
        },
        error: (error: any) => {
          this.loading = false;
          this.alert.open('danger', {
            summary: 'Error',
            details: error.error?.message || 'Failed to join MGR plan',
            closable: true
          });
        }
      });
    }
  }

  onCancel() {
    this.cancel.emit();
    this.modalService.close();
  }
} 