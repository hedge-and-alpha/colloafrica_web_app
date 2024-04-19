import { Component, Input } from '@angular/core';

@Component({
  selector: 'ca-aside-card',
  templateUrl: './aside-card.component.html',
  styleUrl: './aside-card.component.css',
})
export class AsideCardComponent {
  @Input() heading = '';
  @Input() content = '';
  @Input() url = '';
}
