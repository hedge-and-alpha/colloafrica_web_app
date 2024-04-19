import { Component } from '@angular/core';

@Component({
  selector: 'ca-bank-account-info-item',
  standalone: true,
  imports: [],
  templateUrl: './bank-account-info-item.component.html',
  styles: `
    :host {
      display: block;
    }
    :host div {
      background: #F5F5F5;
      height: 80px;
      border: 1px solid #EDEDED;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
      border-radius: 10px;
      gap: 3rem;
      overflow-x: scroll;
    }
  `,
})
export class BankAccountInfoItemComponent {}
