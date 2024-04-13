import { Component } from '@angular/core';

@Component({
  selector: 'ca-cols-field-2',
  standalone: true,
  imports: [],
  template: `
    <div class="sm:grid lg:grid grid-cols-2 gap-4 md:block">
      <div class="mb-6 sm:mb-0 md:mb-6 lg:mb-0">
        <ng-content select="[col-1]" />
      </div>
      <ng-content select="[col-2]" />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ColsField2Component {}
