import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardComponent } from '../../../../components/card/card.component';
import { ColsField3Component } from '../../../../../../components/cols-field-3/cols-field-3.component';
import { FormFieldComponent } from '../../../../../../components/form-field/form-field.component';
import { FormErrorComponent } from '../../../../../../components/form-error/form-error.component';
import { emptyFieldValidator } from '../../../../../../validators/emptyField.validator';
import { NgClass } from '@angular/common';
import { ButtonLoadingDirective } from '../../../../../../directives/button-loading/button-loading.directive';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';

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
export class BasicComponent {
  isSubmitted = false;
  loading = false;

  initialDate = new Date();

  form = this.fb.group(
    {
      first_name: [null, [Validators.required, emptyFieldValidator()]],
      last_name: [null, [Validators.required, emptyFieldValidator()]],
      dob: [new Date(), [Validators.required]],
      marital_status: [null, [Validators.required]],
      gender: [null, [Validators.required]],
    },
    { updateOn: 'submit' }
  );

  constructor(private fb: FormBuilder) {}

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
    console.log(this.form.value);
  }
}
