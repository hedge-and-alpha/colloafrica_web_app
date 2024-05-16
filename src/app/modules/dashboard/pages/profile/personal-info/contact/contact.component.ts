import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonLoadingDirective } from '../../../../../../directives/button-loading/button-loading.directive';
import { FormErrorComponent } from '../../../../../../components/form-error/form-error.component';
import { FormFieldComponent } from '../../../../../../components/form-field/form-field.component';
import { CardComponent } from '../../../../components/card/card.component';
import { ColsField3Component } from '../../../../../../components/cols-field-3/cols-field-3.component';
import { emptyFieldValidator } from '../../../../../../validators/emptyField.validator';
import { UserStoreService } from '../../../../../../stores+/user.store';

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
export class ContactComponent implements OnInit {
  isSubmitted = false;
  loading = false;

  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private userStore: UserStoreService) {}

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
          email,
          [Validators.required, Validators.email, emptyFieldValidator()],
        ],
        phone_number: [
          phone_number,
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
    console.log(this.form.value);
  }
}
