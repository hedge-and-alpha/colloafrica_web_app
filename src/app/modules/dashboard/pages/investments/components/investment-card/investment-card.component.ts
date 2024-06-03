import { PercentPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UtilsService } from '../../../../../../services/utils/utils.service';
import { CardComponent } from '../../../../components/card/card.component';

@Component({
  selector: 'ca-investment-card',
  standalone: true,
  templateUrl: './investment-card.component.html',
  styleUrl: './investment-card.component.css',
  imports: [PercentPipe, RouterLink, CardComponent],
})
export class InvestmentCardComponent {
  slug = '';
  util = inject(UtilsService);

  @Input() name = '';
  @Input() id = '';
  @Input() scheme = '';
  @Input() period = '';
  @Input({ transform: transformPercentage })
  percentageReturn = 0;

  ngOnInit() {
    this.slug = this.util.createSlugFromText(this.name);
  }
}

function transformPercentage(value: number) {
  return value / 100;
}
