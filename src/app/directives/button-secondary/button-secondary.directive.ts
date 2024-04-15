import { Directive } from '@angular/core';

@Directive({
  selector: '[ca-button-secondary]',
  standalone: true,
  host: {
    class: 'btn secondary',
  },
})
export class ButtonSecondaryDirective {
  constructor() {}
}
