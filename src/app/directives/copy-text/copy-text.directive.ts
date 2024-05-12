import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[caCopyText]',
  standalone: true,
  host: {
    '(click)': 'handleClick()',
  },
})
export class CopyTextDirective {
  @Input({ required: true }) caCopyText = '';

  constructor() {}

  handleClick() {
    if (!('clipboard' in navigator)) {
      /**
       * !TODO: Show message to user
       */
      return;
    }

    navigator.clipboard.writeText(this.caCopyText).then(
      () => {
        /**
         * !TODO: Show alert
         */
        console.log('wrote to clipboard');
      },
      () => {
        /**
         * !TODO: Show error alert
         */
        console.log('clipboard error');
      }
    );
  }
}
