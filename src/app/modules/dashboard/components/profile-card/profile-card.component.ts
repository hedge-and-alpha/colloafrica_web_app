import { Component } from '@angular/core';

@Component({
  selector: 'ca-profile-card',
  standalone: true,
  templateUrl: './profile-card.component.html',
  styles: `
    :host img {
      outline: 1px dashed #E3CFFC;
      outline-offset: 10px;
    }
    :host .name {
      font-size: clamp(1.5rem, 1.3333rem + 0.7407vw, 2rem);
      color: #171717;
    }
  `,
})
export class ProfileCardComponent {}
