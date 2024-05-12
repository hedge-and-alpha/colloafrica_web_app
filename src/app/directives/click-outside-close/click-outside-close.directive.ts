import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[caClickOutsideCloseDirective]',
  standalone: true,
  host: {
    '(document:click)': 'handleClick($event)',
  },
})
export class ClickOutsideCloseDirective {
  @Input() caClickOutsideCloseDirective = '';

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  handleClick(event: Event) {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    const elem = this.elementRef.nativeElement;

    if (!elem.contains(target)) {
      this.renderer.removeClass(elem, this.caClickOutsideCloseDirective);
    }
  }
}
