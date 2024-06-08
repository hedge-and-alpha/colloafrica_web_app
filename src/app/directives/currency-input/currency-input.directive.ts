import { Directive } from '@angular/core';

@Directive({
  selector: 'input[caCurrencyInput]',
  standalone: true,
})
export class CurrencyInputDirective {
  constructor() {}
}
