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
  slug = '';

  @Input() name = '';
  @Input() id = '';
  @Input() scheme = '';
  @Input() period = '';
  @Input({ transform: transformPercentage })
  percentageReturn = 0;

  ngOnInit() {
    this.slug = this.name.toLowerCase().split(' ').join('-');
  }
}

function transformPercentage(value: number) {
  return value / 100;
}
