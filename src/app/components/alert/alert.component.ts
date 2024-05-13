import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

type Variant = 'warning' | 'danger';

@Component({
  selector: 'ca-alert',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  @Input() variant: Variant = 'danger';
}
