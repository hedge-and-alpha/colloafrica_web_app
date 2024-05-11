import { Component } from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';
import { TooltipDirective } from '../directives/tooltip/tooltip.directive';

@Component({
  selector: 'ca-showcase',
  standalone: true,
  imports: [TooltipComponent, TooltipDirective],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.css',
})
export class ShowcaseComponent {}
