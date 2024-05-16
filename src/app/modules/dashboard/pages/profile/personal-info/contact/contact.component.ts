import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonLoadingDirective } from '../../../../../../directives/button-loading/button-loading.directive';
import { FormErrorComponent } from '../../../../../../components/form-error/form-error.component';
import { FormFieldComponent } from '../../../../../../components/form-field/form-field.component';
import { CardComponent } from '../../../../components/card/card.component';
import { ColsField3Component } from '../../../../../../components/cols-field-3/cols-field-3.component';
import { emptyFieldValidator } from '../../../../../../validators/emptyField.validator';

@Component({
  selector: 'ca-contact',
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
  templateUrl: './contact.component.html',
  styles: ``,
})
export class ContactComponent {
  isSubmitted = false;
  loading = false;

  form = this.fb.group({
    email: [null, [Validators.required, Validators.email, emptyFieldValidator]],
    phone_number: [null, [Validators.required, emptyFieldValidator]],
    address: [null, [Validators.required, emptyFieldValidator]],
    nearest_landmark: [null, [Validators.required, emptyFieldValidator]],
    lga: [null, [Validators.required, emptyFieldValidator]],
    state: [null, [Validators.required, emptyFieldValidator]],
    nationality: [null, [Validators.required, emptyFieldValidator]],
    home_town: [null, [Validators.required, emptyFieldValidator]],
  });

  constructor(private fb: FormBuilder) {}

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
}
