import { Component } from '@angular/core';

@Component({
  selector: 'ca-h1',
  standalone: true,
  template: `
    <h1 class="text-purple-main font-medium capitalize leading-1.2">
      <ng-content />
    </h1>
  `,
  styles: `
    :host { display: block; }
    :host h1 {
      font-size: clamp(1rem, 1.3333rem + 0.7407vw, 1.5rem);
    }
  `,
})
export class H1Component {}
