import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ColsField3Component } from '../../../../../../components/cols-field-3/cols-field-3.component';
import { CardComponent } from '../../../../components/card/card.component';
import { FormErrorComponent } from '../../../../../../components/form-error/form-error.component';
import { FormFieldComponent } from '../../../../../../components/form-field/form-field.component';
import { ButtonLoadingDirective } from '../../../../../../directives/button-loading/button-loading.directive';
import { emptyFieldValidator } from '../../../../../../validators/emptyField.validator';
import { UserStoreService } from '../../../../../../stores+/user.store';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../../../../../components/alert/alert.service';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';

@Component({
  selector: 'ca-nok',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    ButtonLoadingDirective,
    CardComponent,
    ColsField3Component,
    FormErrorComponent,
    FormFieldComponent,
  ],
  templateUrl: './nok.component.html',
  styles: ``,
})
export class NokComponent implements OnInit {
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
    const {
      nok_address,
      nok_email,
      nok_name,
      nok_phone_number,
      nok_relationship,
    } = this.userStore.user!;

    this.form = this.fb.group(
      {
        nok_name: [nok_name, [Validators.required, emptyFieldValidator()]],
        nok_address: [nok_address, [emptyFieldValidator()]],
        nok_email: [
          nok_email,
          [
            Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
            emptyFieldValidator(),
          ],
        ],
        nok_phone_number: [
          nok_phone_number,
          [Validators.required, emptyFieldValidator()],
        ],
        nok_relationship: [
          nok_relationship,
          [Validators.required, emptyFieldValidator()],
        ],
      },
      { updateOn: 'submit' }
    );
  }

  get name() {
    return this.form.get('nok_name');
  }
  get address() {
    return this.form.get('nok_address');
  }
  get email() {
    return this.form.get('nok_email');
  }
  get phone() {
    return this.form.get('nok_phone_number');
  }
  get relationship() {
    return this.form.get('nok_relationship');
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;

    this.loading = true;

    this.api.updatePersonalNokInfo(this.form.value).subscribe({
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
