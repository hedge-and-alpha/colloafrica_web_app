import { Component, Input, computed } from '@angular/core';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { VerifyBvnComponent } from '../../../../components/verify-bvn/verify-bvn.component';
import { UserStoreService } from '../../../../../../stores+/user.store';
import { ActivatedRoute, Router } from '@angular/router';

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
    private userStore: UserStoreService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  verifyBvn() {
    this.modalService.update(VerifyBvnComponent, 'regular', {});
  }

  close() {
    this.modalService.close();
    this.router.navigate([], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }
}
