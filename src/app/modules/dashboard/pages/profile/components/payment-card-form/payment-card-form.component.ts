import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { ModalStatusComponent } from '../../../../../../components/modal-status/modal-status.component';
import { NgClass } from '@angular/common';
import { FormErrorComponent } from '../../../../../../components/form-error/form-error.component';
import { FormFieldComponent } from '../../../../../../components/form-field/form-field.component';
import { ColsField2Component } from '../../../../../../components/cols-field-2/cols-field-2.component';
import { ButtonLoadingDirective } from '../../../../../../directives/button-loading/button-loading.directive';
import { ButtonPrimaryDirective } from '../../../../../../directives/button-primary/button-primary.directive';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { emptyFieldValidator } from '../../../../../../validators/emptyField.validator';
import { HttpErrorResponse } from '@angular/common/http';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { CardAndBankStoreService } from '../../../../../../stores+/card-bank.store';

@Component({
  selector: 'ca-payment-card-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    CreditCardDirectivesModule,
    ButtonLoadingDirective,
    ButtonPrimaryDirective,
    ColsField2Component,
    FormErrorComponent,
    FormFieldComponent,
  ],
  templateUrl: './payment-card-form.component.html',
  styleUrl: './payment-card-form.component.css',
})
export class PaymentCardFormComponent {
  isSubmitted = false;
  loading = false;

  form: FormType = this.fb.group(
    {
      card_number: new FormControl<string | null>(null, [
        Validators.required,
        emptyFieldValidator(),
      ]),
      cvv: new FormControl<string | null>(null, [
        Validators.required,
        emptyFieldValidator(),
      ]),
      card_expiry: new FormControl<string | null>(null, [
        Validators.required,
        emptyFieldValidator(),
      ]),
    },
    { updateOn: 'submit' }
  );

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private api: DashboardApiService,
    private cardBankStore: CardAndBankStoreService
  ) {}

  get cardNumber() {
    return this.form.get('card_number');
  }
  get cvv() {
    return this.form.get('cvv');
  }
  get cardExpiry() {
    return this.form.get('card_expiry');
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;

    this.loading = true;
    const data = {
      ...this.form.value,
      card_number: this.cardNumber!.value!.split(' ').join(''),
      card_expiry: this.cardExpiry!.value!.split(' ').join(''),
    };

    this.api.addBankCard(data).subscribe({
      next: (card) => {
        this.cardBankStore.addBankCard(card);
        this.modalService.update(
          ModalStatusComponent,
          'small',
          {
            closable: false,
            showHeading: false,
          },
          {
            message: 'Your new card has been added.',
            status: 'Success!',
            success: true,
          }
        );
      },
      error: (error: HttpErrorResponse) => {
        this.modalService.update(
          ModalStatusComponent,
          'small',
          {
            closable: false,
            showHeading: false,
          },
          {
            message: error.error.message,
            status: error.error.status + ' ' + error.status,
            success: false,
          }
        );
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}

type FormType = FormGroup<{
  card_number: FormControl<null | string>;
  cvv: FormControl<null | string>;
  card_expiry: FormControl<null | string>;
}>;
