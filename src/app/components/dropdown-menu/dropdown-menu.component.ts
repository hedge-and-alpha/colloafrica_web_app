import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '../../modules/dashboard/components/card/card.component';

@Component({
  selector: 'ca-dropdown-menu',
  standalone: true,
  imports: [NgClass, CardComponent],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css',
})
export class DropdownMenuComponent {
  constructor() {}
}
