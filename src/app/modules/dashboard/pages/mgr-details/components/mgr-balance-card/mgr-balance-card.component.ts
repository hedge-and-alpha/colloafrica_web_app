import { Component, Input } from '@angular/core';
import { MGR } from '../../../../../../interfaces/mgr.interface';

@Component({
  selector: 'ca-mgr-balance-card',
  templateUrl: './mgr-balance-card.component.html',
  styleUrl: './mgr-balance-card.component.css',
})
export class MgrBalanceCardComponent {
  @Input() plan!: MGR;
}
