import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ca-status-text]',
  standalone: true,
})
export class StatusTextDirective {
  colors = new Map<string, string>();

  @Input({ alias: 'ca-status-text' }) color = '';

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef<HTMLElement>
  ) {
    this.colors.set('unverified', '#D92121');
    this.colors.set('verified', '#049F0A');
    this.colors.set('pending', '#E29700');
  }

  ngOnInit() {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'color',
      this.colors.get(this.color)
    );
  }
}
