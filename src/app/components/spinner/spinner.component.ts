import { Component, Input } from '@angular/core';

@Component({
  selector: 'ca-spinner',
  standalone: true,
  imports: [],
  template: `
    <span
      class="loader"
      [style.border]="'4px solid ' + colour"
      [style.borderBlockEndColor]="'transparent'"
    ></span>
  `,
  styles: `
    :host {
      display: flex;
    }
    .loader {
    width: 24px;
    height: 24px;
    /* border: 5px solid #FFF; */
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    }
  `,
})
export class SpinnerComponent {
  @Input() colour: '#171717' | '#fff' = '#171717';
}
