import { Component, Input } from '@angular/core';

@Component({
  selector: 'ca-cols-field-3',
  standalone: true,
  imports: [],
  template: `
    <div class="sm:grid lg:grid grid-cols-3 gap-4">
      <div class="mb-6 sm:mb-0 md:mb-6 lg:mb-0 {{ col1Span }}">
        <ng-content select="[col-1]" />
      </div>

      <div class="mb-6 sm:mb-0 md:mb-6 lg:mb-0 {{ col2Span }}">
        <ng-content select="[col-2]" />
      </div>

      <ng-content select="[col-3]" />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ColsField3Component {
  @Input() col1Span = '';
  @Input() col2Span = '';
}
