import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../../../../components/modal/modal.service';
import { ModalStatusComponent } from '../../../../components/modal-status/modal-status.component';
import { emptyFieldValidator } from '../../../../validators/emptyField.validator';
import { DashboardApiService } from '../../../../services/api/dashboard-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserStoreService } from '../../../../stores+/user.store';

@Component({
  selector: 'ca-verify-bvn',
  templateUrl: './verify-bvn.component.html',
  styleUrl: './verify-bvn.component.css',
})
export class VerifyBvnComponent {
  isSubmitted = false;
  loading = false;

  form = this.fb.group(
    {
      bvn: [
        null,
        [
          Validators.required,
          Validators.pattern(/^\d{11}$/),
          emptyFieldValidator(),
        ],
      ],
    },
    { updateOn: 'submit' }
  );

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private api: DashboardApiService,
    private userStore: UserStoreService
  ) {}

  get bvn() {
    return this.form.get('bvn');
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;

    this.loading = true;
    this.api.verifyBvn(this.form.value).subscribe({
      next: ({ data }) => {
        this.loading = false;
        this.modalService.update(
          ModalStatusComponent,
          'small',
          {},
          {
            success: true,
            status: 'verification successful',
            message: `Congratulations! Your identity has been successfully verified
               and your account is now secure. Your new account number for
               transactions is ${data.account_number}.`,
          }
        );
        this.userStore.updateBvnStatus(1);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.modalService.update(
          ModalStatusComponent,
          'small',
          {},
          {
            success: false,
            status: 'verification failed',
            message: error.error.message,
          }
        );
      },
    });
  }

  skipVerification() {
    this.modalService.close();
  }
}
