import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../../../../services/utils/utils.service';

@Component({
  selector: 'ca-investment-details',
  templateUrl: './investment-details.component.html',
  styleUrl: './investment-details.component.css',
})
export class InvestmentDetailsComponent {
  name = '';
  id = 0;

  constructor(private route: ActivatedRoute, private util: UtilsService) {}

  ngOnInit() {
    this.name = this.util.capitalizeFirstLetterOfWord(
      this.util.createTextFromSlug(this.route.snapshot.paramMap.get('name')!)
    );
    this.id = +this.route.snapshot.paramMap.get('id')!;
  }
}
