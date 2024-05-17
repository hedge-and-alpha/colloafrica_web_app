import { Component, OnInit } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ColsField3Component } from '../../../../../components/cols-field-3/cols-field-3.component';
import { FormFieldComponent } from '../../../../../components/form-field/form-field.component';
import { CardComponent } from '../../../components/card/card.component';
import { ProfileCardComponent } from '../personal-info/profile-card/profile-card.component';
import { FormErrorComponent } from '../../../../../components/form-error/form-error.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserStoreService } from '../../../../../stores+/user.store';
import { DashboardApiService } from '../../../../../services/api/dashboard-api.service';
import { AlertService } from '../../../../../components/alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonLoadingDirective } from '../../../../../directives/button-loading/button-loading.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ca-id-verification',
  standalone: true,
  templateUrl: './id-verification.component.html',
  styleUrl: './id-verification.component.css',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgSelectModule,
    ButtonLoadingDirective,
    CardComponent,
    ColsField3Component,
    FormErrorComponent,
    FormFieldComponent,
    ProfileCardComponent,
  ],
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
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    const { id_number, id_type } = this.userStore.user!;

    this.form = this.fb.group(
      {
        id_number: [id_number, [Validators.required]],
        id_type: [id_type, [Validators.required]],
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

    this.api.updateIdCardDetails(this.form.value).subscribe({
      next: ({ message, status }) => {
        this.loading = false;
        this.alert.open('success', { details: message, summary: status });
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.alert.open('danger', {
          details: error.error.message,
          summary: error.error.status + ' ' + error.status,
        });
      },
    });
  }
}
