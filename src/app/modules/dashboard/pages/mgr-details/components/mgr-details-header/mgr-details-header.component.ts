import { Component } from '@angular/core';
import { MGR } from '../../../../../../interfaces/mgr.interface';
import { Router } from '@angular/router';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { CancelPlanModalComponent } from '../cancel-plan-modal/cancel-plan-modal.component';

@Component({
  selector: 'ca-mgr-details-header',
  templateUrl: './mgr-details-header.component.html',
  styleUrl: './mgr-details-header.component.css',
})
export class MgrDetailsHeaderComponent {
  plan: MGR = history.state['plan'];

  constructor(private router: Router, private modalService: ModalService) {}

  editPlan() {
    this.router.navigate(['/', 'mgr', this.plan.id, 'edit'], {
      state: { plan: this.plan },
    });
  }

  cancelPlan() {
    this.modalService.open(
      CancelPlanModalComponent,
      'small',
      {
        closable: true,
        showHeading: true,
        headingText: 'Cancel Plan',
      },
      { planId: this.plan.id }
    );
  }
}
