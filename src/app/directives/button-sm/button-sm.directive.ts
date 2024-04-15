import { Directive } from '@angular/core';

@Directive({
  selector: '[ca-button-sm]',
  standalone: true,
  host: {
    class: 'btn-sm',
  },
})
export class ButtonSmDirective {
  constructor() {}
}
