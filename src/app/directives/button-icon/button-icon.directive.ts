import { Directive } from '@angular/core';

@Directive({
  selector: '[ca-button-icon]',
  standalone: true,
  host: {
    class: 'btn icon',
  },
})
export class ButtonIconDirective {
  constructor() {}
}
