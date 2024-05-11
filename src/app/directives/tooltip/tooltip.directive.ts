import {
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Input,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { TooltipComponent } from '../../components/tooltip/tooltip.component';

@Directive({
  selector: '[caTooltip]',
  standalone: true,
  host: {
    '(mouseover)': 'onMouseOver()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class TooltipDirective {
  componentRef: ComponentRef<TooltipComponent> | null = null;
  domElem!: HTMLElement;

  @Input() caTooltip = '';

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  onMouseOver() {
    if (!this.componentRef) {
      this.componentRef =
        this.viewContainerRef.createComponent(TooltipComponent);
      this.domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
      this.renderer.appendChild(document.body, this.domElem);
      this.setTooltipComponentProperties();
    }
  }

  onMouseLeave() {
    this.destroy();
  }

  private setTooltipComponentProperties() {
    if (this.componentRef) {
      this.componentRef.instance.message = this.caTooltip;
      const { bottom, right, left } =
        this.elementRef.nativeElement.getBoundingClientRect();
      this.componentRef.instance.left = (right - left) / 2 + left - 16;
      this.componentRef.instance.top = bottom + 8;
    }
  }

  destroy() {
    if (this.componentRef) {
      this.renderer.removeChild(document.body, this.domElem);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  onDestroy() {
    this.destroy();
  }
}
