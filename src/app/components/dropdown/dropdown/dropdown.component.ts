import { Component } from '@angular/core';

@Component({
  selector: 'ca-dropdown',
  standalone: true,
  imports: [],
  template: ` <ng-content /> `,
  styles: `
    :host {
      position: relative;
      display: inline-block;
    }
  `,
})
export class DropdownComponent {}
