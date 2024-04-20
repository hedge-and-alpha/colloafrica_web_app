import { Component } from '@angular/core';

@Component({
  selector: 'ca-card',
  standalone: true,
  template: ` <ng-content /> `,
  styles: `
    :host {
      display: block;
      background-color: #fff;
    }
  `,
})
export class CardComponent {}
