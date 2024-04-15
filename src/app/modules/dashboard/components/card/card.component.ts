import { Component } from '@angular/core';

@Component({
  selector: 'ca-card',
  standalone: true,
  template: ` <ng-content /> `,
  styles: `
    :host {
      display: block;
      background-color: #fff;
      border-radius: 8px;
    }
  `,
})
export class CardComponent {}
