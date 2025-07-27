import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../../../../components/alert/alert.service';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { MGR } from '../../../../../../interfaces/mgr.interface';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { emptyFieldValidator } from '../../../../../../validators/emptyField.validator';
import { DURATIONS, THEME_COLOURS } from '../../data/mgr.data';
import {
  AllotmentType,
  MGRDuration,
  MGRDurationList,
  MGRForm,
  Theme,
} from '../../interfaces/mgr.interfaces';
import { AllotmentTypeComponent } from '../allotment-type/allotment-type.component';
import { UtilsService } from '../../../../../../services/utils/utils.service';
import { contributionDateValidator } from '../../../../../../validators/contribution-date.validator';

@Component({
  selector: 'ca-mgr-plan-form',
  templateUrl: './mgr-plan-form.component.html',
  styleUrl: './mgr-plan-form.component.css',
})
export class MgrPlanFormComponent implements OnInit, OnDestroy {
  selectedAllotmentType: null | AllotmentType = null;

  selectedPosition = 0;
  numberOfAllowableMembers = 0;
  selectedThemeIndex: null | number = null;

  isSubmitted = false;
  isEditing = false;
  loading = false;
  isPublicMgr = false;
  publicDescription = '';

  minJoinDate = new Date();
  minContributionDate = new Date(new Date().setDate(new Date().getDate() + 1));

  numberOfMembersSub?: Subscription;
  joinDateSub?: Subscription;
  startDateSub?: Subscription;
  durationSub?: Subscription;

  themes: Theme[] = THEME_COLOURS;
  durations: MGRDurationList[] = DURATIONS;

  terms = new FormControl<boolean>(false, [
    Validators.required,
    Validators.requiredTrue,
  ]);

  form: FormGroup<MGRForm> = this.fb.group(
    {
      name: new FormControl<null | string>(null, [
        Validators.required,
        emptyFieldValidator(),
      ]),
      desc: new FormControl<null | string>(null, [
        Validators.required,
        Validators.maxLength(120),
        emptyFieldValidator(),
      ]),
      duration: new FormControl<string | null>(null, {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      number_of_members: new FormControl<string | null>(null, {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      amount: new FormControl<string | null>(null, [
        Validators.required,
        Validators.min(1000),
      ]),
      join_date_deadline: new FormControl<string | null>(null),
      contribution_start_date: new FormControl<string | null>(null, {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      allocation_date: new FormControl<string | null>(
        { value: null, disabled: true },
        {
          validators: [Validators.required],
        }
      ),
      theme_color: new FormControl<string | null>(null),
      allotment_type: new FormControl<string | null>(null, [
        Validators.required,
      ]),
      slot_number: new FormControl<number | null>(null),
    },
    { updateOn: 'submit' }
  );

  // Track if we have an effect subscription
  private hasModalEffect = false;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private api: DashboardApiService,
    private alert: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: UtilsService
  ) {
    // Create an effect to watch for modal data changes
    if (!this.hasModalEffect) {
      this.hasModalEffect = true;
      effect(() => {
        const modalData = this.modalService.data();
        if (modalData && modalData.type) {
          // Handle allotment type selection from modal
          if (modalData.type === 'manual' || modalData.type === 'auto') {
            this.selectedAllotmentType = modalData.type;
            this.allotmentType.patchValue(modalData.type === 'auto' ? 'auto' : 'manual');
            
            if (modalData.position !== undefined) {
              this.selectedPosition = modalData.position;
              this.slotNumber.patchValue(modalData.position);
            }
          }
        }
      });
    }
  }

  ngOnInit() {
    // Check if creating a public MGR based on query parameter
    this.route.queryParams.subscribe(params => {
      this.isPublicMgr = params['type'] === 'public';
      
      // If it's a public MGR, set a default description
      if (this.isPublicMgr) {
        this.publicDescription = 'Join our MGR plan to save together and achieve financial goals!';
      }
    });

    this.observeNumberOfMembersControl();
    this.observeJoinDateControl();
    this.observeDurationControl();
    this.observeStartDateControl();
  }

  get name() {
    return this.form.get('name') as FormControl;
  }
  get desc() {
    return this.form.get('desc') as FormControl;
  }
  get duration() {
    return this.form.get('duration') as FormControl;
  }
  get numberOfMembers() {
    return this.form.get('number_of_members') as FormControl;
  }
  get amount() {
    return this.form.get('amount') as FormControl;
  }
  get joinDateDeadline() {
    return this.form.get('join_date_deadline') as FormControl<string | null>;
  }
  get startDate() {
    return this.form.get('contribution_start_date') as FormControl;
  }
  get allocationDate() {
    return this.form.get('allocation_date') as FormControl;
  }
  get themeColor() {
    return this.form.get('theme_color') as FormControl;
  }
  get allotmentType() {
    return this.form.get('allotment_type') as FormControl;
  }
  get slotNumber() {
    return this.form.get('slot_number') as FormControl;
  }

  calculateAllotmentDate(duration: MGRDuration) {
    const today = new Date();
    let startDate = this.startDate as FormControl<string | null>;
    let nextAllocationDate!: string | number | Date;

    if (!startDate.value) {
      if (duration === 'daily') {
        nextAllocationDate = new Date(today.setDate(today.getDate() + 1));
      } else {
        nextAllocationDate = new Date(today.setDate(today.getDate() + 2));
      }
    } else {
      const start = new Date(startDate.value);
      if (duration === 'daily') {
        nextAllocationDate = new Date(start.setDate(start.getDate() + 1));
      } else {
        nextAllocationDate = new Date(start.setDate(start.getDate() + 2));
      }
    }

    this.allocationDate.setValue(this.utils.toISODate(nextAllocationDate));
  }

  observeDurationControl() {
    this.durationSub = this.duration.valueChanges.subscribe({
      next: (value) => {
        this.calculateAllotmentDate(value);
      },
    });
  }

  observeJoinDateControl() {
    this.joinDateSub = this.joinDateDeadline?.valueChanges.subscribe({
      next: (value) => {
        if (value) {
          if (this.startDate.value) {
            const join = new Date(value).getTime();
            const start = new Date(this.startDate.value).getTime();

            if (join >= start) {
              this.joinDateDeadline.setErrors({ deadline: true });
            }
          }

          const date = new Date(value);
          const minStartDate = new Date(date.setDate(date.getDate() + 1));
          this.minContributionDate = minStartDate;
        }
      },
    });
  }

  observeStartDateControl() {
    this.startDateSub = this.startDate?.valueChanges.subscribe({
      next: (value) => {
        if (value) {
          this.calculateAllotmentDate(this.duration.value);

          if (this.joinDateDeadline.value) {
            const join = new Date(this.joinDateDeadline.value).getTime();
            const start = new Date(value).getTime();

            if (start > join) {
              this.joinDateDeadline.setErrors(null);
            }
          }
        }
      },
    });
  }

  observeNumberOfMembersControl() {
    this.numberOfMembersSub = this.numberOfMembers?.valueChanges.subscribe({
      next: (value) => {
        this.numberOfAllowableMembers = value ? +value : 0;
      },
    });
  }

  selectTheme(theme: Theme, idx: number) {
    this.selectedThemeIndex = idx;
    let themeString = `${theme.from} ${theme.to}`;
    this.themeColor?.patchValue(themeString);
  }

  selectAllotmentType() {
    // Get the current value from the form control
    const currentValue = this.allotmentType.value;
    
    // If the form control already has a value, use it to set the selectedAllotmentType
    if (currentValue && !this.selectedAllotmentType) {
      this.selectedAllotmentType = currentValue === 'automatic' ? 'auto' : 'manual';
    }
    
    // Open the modal to select allotment type
    this.modalService.open(
      AllotmentTypeComponent,
      'large',
      {
        showHeading: true,
        headingText: 'Select Allotment mode',
        closable: true,
      },
      {
        numberOfMembers: this.numberOfAllowableMembers,
        selectedPosition: this.selectedPosition
        // Removed selectedType parameter that was causing the error
      }
    );
  }

  handleSelectAllotmentType(event: AllotmentType) {
    this.selectedAllotmentType = event;
  }

  updateAllotmentTypeForPublicMgr() {
    // No need to change the UI value when public MGR status changes
    // We'll convert 'auto' to the appropriate backend value during form submission
    console.log('Public MGR status changed to:', this.isPublicMgr);
    
    // If switching to public MGR and no description yet, provide a default
    if (this.isPublicMgr && !this.publicDescription) {
      // Don't set it immediately, let the user focus on the field first
      console.log('Public MGR enabled, description will be suggested on field focus');
    }
  }

  handleSubmit() {
    this.isSubmitted = true;
    console.log('Form submitted', this.form.value);
    console.log('Form valid?', this.form.valid);
    console.log('Terms valid?', this.terms.valid);
    
    // Force validation of all form controls
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });
    
    if (this.form.invalid || !this.terms.value) {
      console.error('Form is invalid or terms not accepted', this.getFormValidationErrors());
      return;
    }
    
    // For public MGRs, also validate the public description
    if (this.isPublicMgr && !this.publicDescription) {
      console.error('Public description is required for public MGRs');
      return;
    }

    // Set loading state
    this.loading = true;

    // Get form values and ensure they're properly formatted
    const rawFormData = this.form.getRawValue();
    
    // Create a clean object with primitive values
    const formData: any = {};
    
    // Ensure name is a string
    formData.name = rawFormData.name?.toString() || '';
    
    // Copy other fields
    formData.desc = rawFormData.desc?.toString() || '';
    formData.amount = Number(rawFormData.amount) || 0;
    formData.duration = rawFormData.duration?.toString() || 'monthly';
    formData.number_of_members = Number(rawFormData.number_of_members) || 3;
    // Skip join_date_deadline for public MGRs (removed from creation flow)
    // formData.join_date_deadline = rawFormData.join_date_deadline;
    formData.contribution_start_date = rawFormData.contribution_start_date;
    formData.allocation_date = rawFormData.allocation_date;
    formData.allotment_type = rawFormData.allotment_type?.toString() || 'auto';
    formData.slot_number = rawFormData.slot_number ? Number(rawFormData.slot_number) : null;
    formData.theme_color = rawFormData.theme_color?.toString() || '';

    // Set theme color if selected
    if (this.selectedThemeIndex !== null) {
      const selectedTheme = this.themes[this.selectedThemeIndex];
      formData.theme_color = `${selectedTheme.from} ${selectedTheme.to}`;
    }

    // Handle allotment type
    if (formData.allotment_type === 'auto') {
      // For public MGRs, convert 'auto' to 'random' as required by backend validation
      // For regular MGRs, 'auto' is used for both public and private MGRs.
      
      // Ensure slot_number is null for automatic/random allotment
      formData.slot_number = null;
    } else if (formData.allotment_type === 'manual') {
      // Keep as 'manual'
      // Ensure slot_number is set for manual allotment
      if (!formData.slot_number) {
        formData.slot_number = 1; // Default to first position if not selected
      }
    }
    
    console.log('Allotment type after conversion:', formData.allotment_type);
    
    // Log the allotment type for debugging
    console.log('Selected allotment type:', this.selectedAllotmentType);
    console.log('Form allotment_type value:', formData.allotment_type);
    

    
    // Skip join_date_deadline adjustment for public MGRs (removed from UI)
    // formData.join_date_deadline = this.formatDateForBackend(this.ensureDateIsAfterToday(formData.join_date_deadline));
    
    // Ensure contribution_start_date is after today
    formData.contribution_start_date = this.formatDateForBackend(this.ensureDateIsAfterToday(formData.contribution_start_date));
    console.log('Adjusted contribution_start_date to be after today:', formData.contribution_start_date);
    
    // Ensure allocation_date is after today
    formData.allocation_date = this.formatDateForBackend(this.ensureDateIsAfterToday(formData.allocation_date));
    console.log('Adjusted allocation_date to be after today:', formData.allocation_date);
    
    // Set is_public flag based on the isPublicMgr variable
    // Send it as a boolean value instead of a number to match backend expectations
    // Create base form data
    const finalFormData: any = {
      ...formData,
      is_public: this.isPublicMgr // Send as boolean (true/false) instead of 1/0
    };
    
    // Remove join_date_deadline for public MGRs (calculated on backend)
    if (this.isPublicMgr) {
      delete finalFormData.join_date_deadline;
      finalFormData.public_description = this.publicDescription;
    }
    console.log('Creating plan with is_public:', finalFormData.is_public, 'isPublicMgr:', this.isPublicMgr);
    
    this.createNewPlan(finalFormData);
  }
  
  // Helper method to get all validation errors
  getFormValidationErrors() {
    const errors: any = {};
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  createNewPlan(data: any) {
    // Ensure all fields are the correct types
    const formattedData: any = {};
    
    // Convert all fields to their expected types
    Object.keys(data).forEach(key => {
      const value = data[key];
      
      // Special handling for allotment_type
      if (key === 'allotment_type') {
        const allotmentType = value?.toString() || 'auto';
        
        // For public MGRs, convert 'auto' to 'random' as required by backend validation
        formattedData[key] = allotmentType; // Preserve 'auto' or 'manual'
      }
      // Special handling for date fields (excluding join_date_deadline for public MGRs)
      else if (['contribution_start_date', 'allocation_date'].includes(key)) {
        formattedData[key] = this.formatDateForBackend(value);
      }
      // Ensure strings for these fields
      else if (['name', 'desc', 'public_description', 'theme_color', 'duration'].includes(key)) {
        formattedData[key] = value?.toString() || '';
      } 
      // Ensure numbers for these fields
      else if (['amount', 'number_of_members', 'slot_number'].includes(key)) {
        formattedData[key] = value !== null && value !== undefined ? Number(value) : null;
      }
      // Keep boolean as is
      else if (key === 'is_public') {
        formattedData[key] = !!value; // Ensure it's a boolean
      }
      // For any other fields, pass them as is
      else {
        formattedData[key] = value;
      }
    });
    
    // Log the formatted data being sent to the API
    console.log('Formatted data being sent to API:', JSON.stringify(formattedData, null, 2));
    
    if (this.isPublicMgr) {
      // For public MGRs, use the public MGR API endpoint
      console.log('Using public MGR API endpoint');
      this.api.createPublicMgr(formattedData).subscribe({
        next: ({ data, message, status }) => {
          this.loading = false;
          this.alert.open('success', { details: message, summary: status });
          this.form.reset();
          this.router.navigate(['/', 'mgr', data.id, 'details'], {
            queryParams: { new_plan: true },
            state: { plan: data },
          });
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          console.error('Public MGR creation error:', err);
          console.error('Error response:', err.error);
          console.error('Status:', err.status);
          console.error('Headers:', err.headers);
          
          // Check if there are validation errors in the response
          if (err.error && err.error.errors) {
            console.error('Validation errors:', err.error.errors);
            this.alert.open('danger', {
              details: `Validation errors: ${JSON.stringify(err.error.errors)}`,
              summary: `Public plan creation failed!`,
            });
          } else {
            this.alert.open('danger', {
              details: `${err.error.message || 'Unknown error'}`,
              summary: `Public plan creation failed!`,
            });
          }
        },
      });
    } else {
      // For regular MGRs, use the existing API endpoint
      console.log('Using regular MGR API endpoint');
      this.api.createMGR(formattedData).subscribe({
        next: ({ data, message, status }) => {
          this.loading = false;
          this.alert.open('success', { details: message, summary: status });
          this.form.reset();
          this.router.navigate(['/', 'mgr', data.id, 'details'], {
            queryParams: { new_plan: true },
            state: { plan: data },
          });
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          console.error('Regular MGR creation error:', err);
          console.error('Error response:', err.error);
          console.error('Status:', err.status);
          console.error('Headers:', err.headers);
          
          // Check if there are validation errors in the response
          if (err.error && err.error.errors) {
            console.error('Validation errors:', err.error.errors);
            this.alert.open('danger', {
              details: `Validation errors: ${JSON.stringify(err.error.errors)}`,
              summary: `Plan creation failed!`,
            });
          } else {
            this.alert.open('danger', {
              details: `${err.error.message || 'Unknown error'}`,
              summary: `Plan creation failed!`,
            });
          }
        },
      });
    }
  }

  // Helper method to ensure date is after today
  ensureDateIsAfterToday(date: Date | string | null): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of day
    
    if (!date) {
      // If date is null or undefined, return tomorrow
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    }
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      // If date is invalid, return tomorrow
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    }
    
    // If date is before or equal to today, ALWAYS return tomorrow
    // This is critical for backend validation which requires dates to be after:today
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Check if the date is today or earlier
    if (dateObj.getFullYear() === today.getFullYear() && 
        dateObj.getMonth() === today.getMonth() && 
        dateObj.getDate() <= today.getDate()) {
      return tomorrow;
    }
    
    return dateObj;
  }
  
  // Helper method to format date as YYYY-MM-DD
  formatDateForBackend(date: Date | string | null): string {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  ngOnDestroy() {
    // Clean up all subscriptions
    this.numberOfMembersSub?.unsubscribe();
    this.joinDateSub?.unsubscribe();
    this.startDateSub?.unsubscribe();
    this.durationSub?.unsubscribe();
  }
}
