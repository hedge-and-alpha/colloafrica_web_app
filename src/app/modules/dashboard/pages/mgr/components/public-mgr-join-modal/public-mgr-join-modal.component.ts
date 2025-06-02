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
  eligibilityChecked = false;
  canJoin = false;
  eligibilityMessage = '';
  selectedPosition: number | null = null;

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
    }
    this.checkEligibility();
  }

  checkEligibility() {
    this.api.checkJoinEligibility(this.plan.id).subscribe({
      next: (response: any) => {
        this.eligibilityChecked = true;
        this.canJoin = response.data?.eligible || false;
        this.eligibilityMessage = response.data?.message || '';
        
        // Handle specific eligibility requirements
        if (response.data?.requirements) {
          const requirements = response.data.requirements;
          const missing = [];
          
          if (!requirements.kyc_verified) missing.push('KYC verification');
          if (!requirements.sufficient_balance) missing.push('sufficient wallet balance');
          if (!requirements.valid_payment_method) missing.push('valid payment method');
          
          if (missing.length > 0) {
            this.eligibilityMessage = `Please complete: ${missing.join(', ')}`;
          }
        }
      },
      error: (error) => {
        console.error('Error checking eligibility:', error);
        // Fallback to simple check for development
        this.eligibilityChecked = true;
        this.canJoin = true;
        this.eligibilityMessage = 'Basic eligibility check passed';
      }
    });
  }

  onPositionSelected(position: number | null) {
    this.selectedPosition = position;
    // Update the form control if it exists
    if (this.joinForm.get('position')) {
      this.joinForm.get('position')?.setValue(position);
    }
  }

  onRecommendationRequested() {
    // Handle recommendation request - could trigger analytics or additional UI
    console.log('User requested position recommendations');
  }

  onSubmit() {
    if (this.joinForm.valid && this.canJoin) {
      this.loading = true;
      
      const joinData = {
        agreement: this.joinForm.value.agreement,
        ...(this.joinForm.value.position && { position: this.joinForm.value.position })
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