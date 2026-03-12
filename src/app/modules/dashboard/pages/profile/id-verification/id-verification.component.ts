import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../components/alert/alert.service';
import { DashboardApiService } from '../../../../../services/api/dashboard-api.service';
import { ApiResponse } from '../../../../../interfaces/api-response';
import { UserStoreService } from '../../../../../stores+/user.store';

@Component({
  selector: 'ca-id-verification',
  templateUrl: './id-verification.component.html',
  styleUrl: './id-verification.component.css',
})
export class IdVerificationComponent implements OnInit {
  isSubmitted = false;
  loading = false;

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private userStore: UserStoreService,
    private api: DashboardApiService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    let { id_number, id_type } = this.userStore.user!;

    this.form = this.fb.group(
      {
        id_number: [
          { value: id_number, disabled: !!id_number },
          [Validators.required],
        ],
        id_type: [
          { value: id_type, disabled: !!id_type },
          [Validators.required],
        ],
      },
      { updateOn: 'submit' }
    );
  }

  get idNumber() {
    return this.form.get('id_number');
  }
  get idType() {
    return this.form.get('id_type');
  }

  handleIdTypeChange(event?: string) {
    if (!event) return;

    if (event === 'national_id') {
      this.idNumber?.setValidators([
        Validators.required,
        Validators.pattern(/^[0-9]{11}$/),
      ]);
      this.idNumber?.updateValueAndValidity();
      return;
    }

    if (event === 'driving_license') {
      this.idNumber?.setValidators([
        Validators.required,
        Validators.pattern(/^[a-zA-Z]{3}([ -]{1})?[A-Z0-9]{6,12}$/i),
      ]);
      this.idNumber?.updateValueAndValidity();
      return;
    }

    if (event === 'international_passport') {
      this.idNumber?.setValidators([
        Validators.required,
        Validators.pattern(/^[A-Z][0-9]{8}$/),
      ]);
      this.idNumber?.updateValueAndValidity();
      return;
    }
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;

    this.loading = true;

    this.api.updateIdCardDetails(this.form.value).subscribe(
      (response: ApiResponse) => {
        this.loading = false;
        this.alert.open('success', { details: response.message, summary: response.status });
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.alert.open('danger', {
          details: error.error.message,
          summary: 'Identity verification failed',
        });
      }
    );
  }
}
