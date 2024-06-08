import { Component } from '@angular/core';
import { MGR } from '../../../../../../interfaces/mgr.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'ca-mgr-details-header',
  templateUrl: './mgr-details-header.component.html',
  styleUrl: './mgr-details-header.component.css',
})
export class MgrDetailsHeaderComponent {
  plan: MGR = history.state['plan'];

  constructor(private router: Router) {}

  editPlan() {
    this.router.navigate(['/', 'mgr', this.plan.id, 'edit'], {
      state: { plan: this.plan },
    });
  }

  cancelPlan() {}
}
