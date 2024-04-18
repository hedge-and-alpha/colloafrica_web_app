import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ca-switch',
  standalone: true,
  imports: [],
  template: ` <label class="">
    <input
      type="checkbox"
      class="opacity-0 h-full"
      [checked]="checked"
      (change)="checkedChange.emit((checked = !checked))"
    />
  </label>`,
  styleUrl: './switch.component.css',
})
export class SwitchComponent {
  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<boolean>();
}
