import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[caDropdownMenuTrigger]',
  standalone: true,
  host: {
    '(click)': 'toggleDropdownMenu($event)',
  },
})
export class DropdownMenuTriggerDirective {
  @Output() onClick = new EventEmitter();

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  toggleDropdownMenu(event: Event) {
    event.stopPropagation();

    const dropdown = this.elementRef.nativeElement.closest('ca-dropdown');

    if (dropdown) {
      const dropdownMenu = dropdown.querySelector('ca-dropdown-menu');
      dropdownMenu?.classList.toggle('open');
    }
  }
}
