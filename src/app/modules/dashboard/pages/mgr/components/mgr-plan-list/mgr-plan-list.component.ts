import { Component, Input } from '@angular/core';
import { MGR } from '../../../../../../interfaces/mgr.interface';

@Component({
  selector: 'ca-mgr-plan-list',
  templateUrl: './mgr-plan-list.component.html',
  styleUrl: './mgr-plan-list.component.css',
})
export class MgrPlanListComponent {
  @Input() isAdmin = false;
  @Input() plans: MGR[] = [];
}
