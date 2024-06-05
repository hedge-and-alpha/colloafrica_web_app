import { Component, Input } from '@angular/core';
import { MGR } from '../../../../../../interfaces/mgr.interface';

@Component({
  selector: 'ca-mgr-plan-card',
  templateUrl: './mgr-plan-card.component.html',
  styleUrl: './mgr-plan-card.component.css',
})
export class MgrPlanCardComponent {
  @Input() isAdmin = false;
  @Input() plan!: MGR;

  composeGradient() {}
}
