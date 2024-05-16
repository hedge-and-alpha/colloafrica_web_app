import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardComponent } from '../../../../components/card/card.component';
import { FormErrorComponent } from '../../../../../../components/form-error/form-error.component';
import { FormFieldComponent } from '../../../../../../components/form-field/form-field.component';
import { ButtonLoadingDirective } from '../../../../../../directives/button-loading/button-loading.directive';
import { ColsField3Component } from '../../../../../../components/cols-field-3/cols-field-3.component';
import { emptyFieldValidator } from '../../../../../../validators/emptyField.validator';

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
export class EmploymentComponent {
  isSubmitted = false;
  loading = false;

  form = this.fb.group({
    occupation: [null, [Validators.required, emptyFieldValidator]],
    employer: [null, [Validators.required, emptyFieldValidator]],
    employer_address: [null, [Validators.required, emptyFieldValidator]],
  });

  constructor(private fb: FormBuilder) {}
}
