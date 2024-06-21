import { Component, EventEmitter, Output } from '@angular/core';
import { MGR } from '../../../../../../interfaces/mgr.interface';
import { Router } from '@angular/router';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { CancelPlanModalComponent } from '../cancel-plan-modal/cancel-plan-modal.component';

type View = 'details' | 'contribution' | 'collection';

@Component({
  selector: 'ca-mgr-details-header',
  templateUrl: './mgr-details-header.component.html',
  styleUrl: './mgr-details-header.component.css',
})
export class MgrDetailsHeaderComponent {
  view: View = 'details';
  plan: MGR = history.state['plan'];

  @Output() viewChange = new EventEmitter<View>();

  constructor(private router: Router, private modalService: ModalService) {}

  changeView(view: View) {
    this.view = view;
    this.viewChange.emit(view);
  }

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
