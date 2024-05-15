import { Component } from '@angular/core';
import { DropdownMenuItemComponent } from '../components/dropdown-menu/dropdown-menu-item/dropdown-menu-item.component';
import { DropdownMenuTriggerDirective } from '../components/dropdown-menu/dropdown-menu-trigger.directive';
import { DropdownMenuComponent } from '../components/dropdown-menu/dropdown-menu.component';
import { DropdownComponent } from '../components/dropdown/dropdown/dropdown.component';
import { ClickOutsideCloseDirective } from '../directives/click-outside-close/click-outside-close.directive';
import { ToastComponent } from '../components/toast/toast.component';
import { ToastService } from '../components/toast/toast.service';
import { AlertComponent } from '../components/alert/alert.component';
import { AlertService } from '../components/alert/alert.service';

@Component({
  selector: 'ca-showcase',
  standalone: true,
  imports: [
    ClickOutsideCloseDirective,
    DropdownComponent,
    DropdownMenuComponent,
    DropdownMenuItemComponent,
    DropdownMenuTriggerDirective,
    ToastComponent,
  ],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.css',
})
export class ShowcaseComponent {}
