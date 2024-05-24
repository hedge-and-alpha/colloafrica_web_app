import { Directive, Input } from '@angular/core';
import { AlertService } from '../../components/alert/alert.service';

@Directive({
  selector: '[caCopyText]',
  standalone: true,
  host: {
    '(click)': 'handleClick()',
  },
})
export class CopyTextDirective {
  @Input({ required: true }) caCopyText = '';

  constructor(private alert: AlertService) {}

  handleClick() {
    if (!('clipboard' in navigator)) {
      /**
       * !TODO: Show message to user
       */
      return;
    }

    navigator.clipboard.writeText(this.caCopyText).then(
      () => {
        this.alert.open('plain', { details: 'Copied to clipboard' });
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
