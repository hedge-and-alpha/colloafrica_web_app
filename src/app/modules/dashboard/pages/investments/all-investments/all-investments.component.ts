import { Component } from '@angular/core';
import { InvestmentCardComponent } from '../../../components/investment-card/investment-card.component';

@Component({
  selector: 'ca-all-investments',
  standalone: true,
  templateUrl: './all-investments.component.html',
  styleUrl: './all-investments.component.css',
  imports: [InvestmentCardComponent],
})
export class AllInvestmentsComponent {}
