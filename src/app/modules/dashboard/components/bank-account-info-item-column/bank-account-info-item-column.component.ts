import { Component, Input } from '@angular/core';

@Component({
  selector: 'ca-bank-account-info-item-column',
  standalone: true,
  imports: [],
  templateUrl: './bank-account-info-item-column.component.html',
  styles: `
    :host {
      display: block;
      height: 100%;
    }
  `,
})
export class BankAccountInfoItemColumnComponent {
  @Input() columnTitle = '';
}
