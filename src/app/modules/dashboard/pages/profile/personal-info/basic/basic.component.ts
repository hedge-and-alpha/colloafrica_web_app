import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardComponent } from '../../../../components/card/card.component';
import { ColsField3Component } from '../../../../../../components/cols-field-3/cols-field-3.component';
import { FormFieldComponent } from '../../../../../../components/form-field/form-field.component';
import { FormErrorComponent } from '../../../../../../components/form-error/form-error.component';
import { emptyFieldValidator } from '../../../../../../validators/emptyField.validator';
import { NgClass } from '@angular/common';
import { ButtonLoadingDirective } from '../../../../../../directives/button-loading/button-loading.directive';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserStoreService } from '../../../../../../stores+/user.store';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { AlertService } from '../../../../../../components/alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from '../../../../../../services/utils/utils.service';

@Component({
  selector: 'ca-basic',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    BsDatepickerModule,
    ButtonLoadingDirective,
    CardComponent,
    ColsField3Component,
    FormErrorComponent,
    FormFieldComponent,
    NgSelectModule,
  ],
  templateUrl: './basic.component.html',
  styles: ``,
})
export class BasicComponent implements OnInit {
  isSubmitted = false;
  loading = false;

  initialDate = new Date();
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private userStore: UserStoreService,
    private api: DashboardApiService,
    private alert: AlertService,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    const { first_name, last_name, dob, marital_status, gender } =
      this.userStore.user!;

    this.form = this.fb.group(
      {
        first_name: [first_name, [Validators.required, emptyFieldValidator()]],
        last_name: [last_name, [Validators.required, emptyFieldValidator()]],
        dob: [dob ? new Date(dob) : new Date(), [Validators.required]],
        marital_status: [marital_status, [Validators.required]],
        gender: [gender, [Validators.required]],
      },
      { updateOn: 'submit' }
    );
  }

  get firstName() {
    return this.form.get('first_name');
  }
  get lastName() {
    return this.form.get('last_name');
  }
  get dob() {
    return this.form.get('dob');
  }
  get maritalStatus() {
    return this.form.get('marital_status');
  }
  get gender() {
    return this.form.get('gender');
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;

    this.loading = true;

    const data = {
      ...this.form.value,
      dob: this.utils.transformDate(this.form.value.dob),
    };

    this.api.updatePersonalInfo(data).subscribe({
      next: ({ message, status }) => {
        this.loading = false;
        this.alert.open('success', { details: message, summary: status });
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.alert.open('success', {
          details: error.error.message,
          summary: error.error.status + ' ' + error.status,
        });
      },
    });
  }
}
