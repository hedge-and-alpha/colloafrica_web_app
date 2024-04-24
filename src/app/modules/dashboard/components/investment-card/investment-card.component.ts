import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { NgStyle, PercentPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ca-investment-card',
  standalone: true,
  templateUrl: './investment-card.component.html',
  styleUrl: './investment-card.component.css',
  imports: [PercentPipe, RouterLink, CardComponent],
})
export class InvestmentCardComponent {
  @Input() name = '';
  @Input() scheme = '';
  @Input() period = '';
  @Input() path = '';
  @Input({
    transform: (value: number) => {
      return value / 100;
    },
  })
  percentageReturn = 0;
}
