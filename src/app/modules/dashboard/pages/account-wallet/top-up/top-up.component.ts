import { Component, computed } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../../../../../components/modal/modal.service';
import { UserStoreService } from '../../../../../stores+/user.store';

type TopUpStep = 'amount' | 'method';
type PaymentMethod = 'transfer' | 'card' | null;

@Component({
  selector: 'ca-top-up',
  templateUrl: './top-up.component.html',
  styleUrl: './top-up.component.css',
})
export class TopUpComponent {
  step: TopUpStep = 'amount';
  paymentMethod: PaymentMethod = null;
  isSubmitted = false;

  account = computed(() => this.userStore.user?.virtual_account);

  form = this.fb.group(
    {
      amount: [null, [Validators.required, Validators.min(1000)]],
    },
    { updateOn: 'submit' }
  );

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private userStore: UserStoreService
  ) {}

  get amount() {
    return this.form.get('amount');
  }

  handleSubmit() {
    console.log(this.form.value);
    this.isSubmitted = true;

    if (this.form.invalid) return;

    this.modalService.updateConfig({
      headingText: 'Choose your preferred payment method',
    });
    this.step = 'method';
  }

  selectPaymentMethod(method: PaymentMethod) {
    console.log(method);
    this.paymentMethod = method;
  }
}
