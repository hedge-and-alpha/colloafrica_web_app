import {
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Directive({
  selector: 'button[loading]',
  standalone: true,
})
export class ButtonLoadingDirective implements OnChanges, OnDestroy {
  spinnerRef: ComponentRef<SpinnerComponent> | null = null;
  domElement: HTMLElement | null = null;
  elRefContent = '';

  @Input() loading = false;

  constructor(
    private vcr: ViewContainerRef,
    private elRef: ElementRef<HTMLButtonElement>,
    private renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    let current = changes['loading'].currentValue;
    let isFirstChange = changes['loading'].firstChange;

    if (isFirstChange) {
      this.spinnerRef = this.vcr.createComponent(SpinnerComponent);
      this.domElement = (this.spinnerRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
      this.elRefContent = this.elRef.nativeElement.innerHTML;
    }

    if (current) {
      this.elRef.nativeElement.type = 'button';
      this.elRef.nativeElement.innerHTML = '';
      this.renderer.appendChild(this.elRef.nativeElement, this.domElement);
    } else {
      this.renderer.removeChild(this.elRef.nativeElement, this.domElement);
      this.elRef.nativeElement.type = 'submit';
      this.elRef.nativeElement.innerHTML = this.elRefContent;
    }
  }

  ngOnDestroy() {
    this.spinnerRef?.destroy();
    this.spinnerRef = null;
    this.domElement = null;
  }
}
