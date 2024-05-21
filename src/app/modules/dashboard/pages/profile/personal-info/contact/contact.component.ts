import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertService } from '../../../../../../components/alert/alert.service';
import { ColsField3Component } from '../../../../../../components/cols-field-3/cols-field-3.component';
import { FormErrorComponent } from '../../../../../../components/form-error/form-error.component';
import { FormFieldComponent } from '../../../../../../components/form-field/form-field.component';
import { ButtonLoadingDirective } from '../../../../../../directives/button-loading/button-loading.directive';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { UserStoreService } from '../../../../../../stores+/user.store';
import { emptyFieldValidator } from '../../../../../../validators/emptyField.validator';
import { CardComponent } from '../../../../components/card/card.component';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'ca-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgSelectModule,
    ButtonLoadingDirective,
    CardComponent,
    ColsField3Component,
    FormErrorComponent,
    FormFieldComponent,
  ],
  templateUrl: './contact.component.html',
  styles: ``,
})
export class ContactComponent implements OnInit {
  isSubmitted = false;
  loading = false;

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private userStore: UserStoreService,
    private alert: AlertService,
    private api: DashboardApiService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    const {
      email,
      phone_number,
      address,
      nearest_landmark,
      lga,
      state,
      nationality,
      home_town,
    } = this.userStore.user!;

    this.form = this.fb.group(
      {
        email: [
          { value: email, disabled: true },
          [Validators.required, Validators.email, emptyFieldValidator()],
        ],
        phone_number: [
          { value: phone_number, disabled: true },
          [Validators.required, emptyFieldValidator()],
        ],
        address: [address, [emptyFieldValidator()]],
        nearest_landmark: [nearest_landmark, [emptyFieldValidator()]],
        lga: [lga, [emptyFieldValidator()]],
        state: [state, [emptyFieldValidator()]],
        nationality: [nationality, [emptyFieldValidator()]],
        home_town: [home_town, [emptyFieldValidator()]],
      },
      { updateOn: 'submit' }
    );
  }

  get email() {
    return this.form.get('email');
  }
  get phone() {
    return this.form.get('phone_number');
  }
  get address() {
    return this.form.get('address');
  }
  get landmark() {
    return this.form.get('nearest_landmark');
  }
  get lga() {
    return this.form.get('lga');
  }
  get state() {
    return this.form.get('state');
  }
  get nationality() {
    return this.form.get('nationality');
  }
  get homeTown() {
    return this.form.get('home_town');
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;

    this.loading = true;

    this.api.updatePersonalContactInfo(this.form.value).subscribe({
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
