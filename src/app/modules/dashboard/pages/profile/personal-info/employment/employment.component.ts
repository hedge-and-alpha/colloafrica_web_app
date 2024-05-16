import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardComponent } from '../../../../components/card/card.component';
import { FormErrorComponent } from '../../../../../../components/form-error/form-error.component';
import { FormFieldComponent } from '../../../../../../components/form-field/form-field.component';
import { ButtonLoadingDirective } from '../../../../../../directives/button-loading/button-loading.directive';
import { ColsField3Component } from '../../../../../../components/cols-field-3/cols-field-3.component';
import { emptyFieldValidator } from '../../../../../../validators/emptyField.validator';
import { UserStoreService } from '../../../../../../stores+/user.store';

@Component({
  selector: 'ca-employment',
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
  templateUrl: './employment.component.html',
  styles: ``,
})
export class EmploymentComponent implements OnInit {
  isSubmitted = false;
  loading = false;

  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private userStore: UserStoreService) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    const { occupation, employer, employer_address } = this.userStore.user!;

    this.form = this.fb.group(
      {
        occupation: [occupation, [emptyFieldValidator()]],
        employer: [employer, [emptyFieldValidator()]],
        employer_address: [employer_address, [emptyFieldValidator()]],
      },
      { updateOn: 'submit' }
    );
  }

  get occupation() {
    return this.form.get('occupation');
  }
  get employer() {
    return this.form.get('employer');
  }
  get employerAddress() {
    return this.form.get('employer_address');
  }

  handleSubmit() {
    this.isSubmitted = true;
    console.log(this.form.value);
  }
}
