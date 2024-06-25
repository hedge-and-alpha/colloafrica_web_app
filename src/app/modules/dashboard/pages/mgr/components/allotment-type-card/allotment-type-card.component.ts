import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ca-allotment-type-card',
  templateUrl: './allotment-type-card.component.html',
  styleUrl: './allotment-type-card.component.css',
})
export class AllotmentTypeCardComponent {
  @Input() allotmentType: null | 'manual' | 'auto' = null;
  @Output() allotmentTypeChange = new EventEmitter();
}
