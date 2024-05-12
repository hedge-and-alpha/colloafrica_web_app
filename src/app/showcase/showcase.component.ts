import { Component } from '@angular/core';
import { DropdownMenuItemComponent } from '../components/dropdown-menu/dropdown-menu-item/dropdown-menu-item.component';
import { DropdownMenuTriggerDirective } from '../components/dropdown-menu/dropdown-menu-trigger.directive';
import { DropdownMenuComponent } from '../components/dropdown-menu/dropdown-menu.component';
import { DropdownComponent } from '../components/dropdown/dropdown/dropdown.component';
import { ClickOutsideCloseDirective } from '../directives/click-outside-close/click-outside-close.directive';

@Component({
  selector: 'ca-showcase',
  standalone: true,
  imports: [
    ClickOutsideCloseDirective,
    DropdownComponent,
    DropdownMenuComponent,
    DropdownMenuItemComponent,
    DropdownMenuTriggerDirective,
  ],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.css',
})
export class ShowcaseComponent {}
