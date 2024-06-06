import { Component, Input, computed } from '@angular/core';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { VerifyBvnComponent } from '../../../../components/verify-bvn/verify-bvn.component';
import { UserStoreService } from '../../../../../../stores+/user.store';

@Component({
  selector: 'ca-mgr-welcome',
  templateUrl: './mgr-welcome.component.html',
  styleUrl: './mgr-welcome.component.css',
})
export class MgrWelcomeComponent {
  user = computed(() => this.userStore.user);

  @Input() isNewPlan = false;

  constructor(
    private modalService: ModalService,
    private userStore: UserStoreService
  ) {}

  verifyBvn() {
    this.modalService.update(VerifyBvnComponent, 'regular', {});
  }

  close() {
    this.modalService.close();
  }
}
