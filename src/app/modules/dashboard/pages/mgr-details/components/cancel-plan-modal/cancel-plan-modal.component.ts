import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { emptyFieldValidator } from '../../../../../../validators/emptyField.validator';

@Component({
  selector: 'ca-cancel-plan-modal',
  templateUrl: './cancel-plan-modal.component.html',
  styleUrl: './cancel-plan-modal.component.css',
})
export class CancelPlanModalComponent {
  isSubmitted = false;
  loading = false;

  form = this.fb.group(
    {
      reason: [null, [Validators.required, emptyFieldValidator()]],
    },
    { updateOn: 'submit' }
  );

  get reason() {
    return this.form.get('reason') as FormControl;
  }

  constructor(private fb: FormBuilder) {}

  handleSubmit() {
    this.isSubmitted = true;
  }
}
