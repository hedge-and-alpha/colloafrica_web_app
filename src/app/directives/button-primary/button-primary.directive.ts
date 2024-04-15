import { Directive } from '@angular/core';

@Directive({
  selector: '[ca-button-primary]',
  standalone: true,
  host: {
    class: 'btn primary',
  },
})
export class ButtonPrimaryDirective {
  constructor() {}
}
