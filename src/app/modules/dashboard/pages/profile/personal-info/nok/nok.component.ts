import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColsField3Component } from '../../../../../../components/cols-field-3/cols-field-3.component';
import { CardComponent } from '../../../../components/card/card.component';
import { FormErrorComponent } from '../../../../../../components/form-error/form-error.component';
import { FormFieldComponent } from '../../../../../../components/form-field/form-field.component';
import { ButtonLoadingDirective } from '../../../../../../directives/button-loading/button-loading.directive';
import { emptyFieldValidator } from '../../../../../../validators/emptyField.validator';

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
export class NokComponent {
  isSubmitted = false;
  loading = false;

  form = this.fb.group({
    nok_name: [null, [Validators.required, emptyFieldValidator]],
    nok_address: [null, [Validators.required, emptyFieldValidator]],
    nok_email: [
      null,
      [Validators.required, Validators.email, emptyFieldValidator],
    ],
    nok_phone_number: [null, [Validators.required, emptyFieldValidator]],
    nok_relationship: [null, [Validators.required, emptyFieldValidator]],
  });

  constructor(private fb: FormBuilder) {}
}
